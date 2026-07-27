import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { CONTACT, SITE_OG_IMAGE } from "@/lib/contact";
import { GALLERY, GALLERY_FILTERS } from "@/content/site";
import { photos } from "@/content/photos";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/galleria")({
  head: () => ({
    meta: [
      { title: "Galleria — Alla Nazionale" },
      {
        name: "description",
        content:
          "Sfoglia le foto dei nostri eventi: compleanni, baby shower, lauree, feste private, buffet, allestimenti e spazi. Filtra per categoria.",
      },
      { property: "og:title", content: "Galleria — Alla Nazionale" },
      { property: "og:description", content: "Le foto dei nostri eventi e dei nostri spazi." },
      { property: "og:url", content: `${CONTACT.siteUrl}/galleria` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { name: "twitter:title", content: "Galleria — Alla Nazionale" },
      { name: "twitter:description", content: "Le foto dei nostri eventi e dei nostri spazi." },
      { name: "twitter:image", content: SITE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${CONTACT.siteUrl}/galleria` }],
  }),
  component: GalleryPage,
});

type DbPhoto = {
  id: string;
  storage_path: string;
  url: string;
  alt_it: string;
  alt_en: string;
  category_slugs: string[];
  sort_order: number;
};

type DbCategory = { slug: string; title_it: string; title_en: string; sort_order: number };

type Item = {
  key: string;
  src: string;
  thumb: string;
  alt: { it: string; en: string };
  categories: string[];
};

const THUMB_EXPIRES = 60 * 60 * 24 * 7; // 7 giorni

function GalleryPage() {
  const { t, locale } = useI18n();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [dbPhotos, setDbPhotos] = useState<DbPhoto[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [dbCats, setDbCats] = useState<DbCategory[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("gallery_photos").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("gallery_categories").select("*").order("sort_order").order("title_it"),
    ]).then(([p, c]) => {
      const photos = (p.data ?? []) as DbPhoto[];
      setDbPhotos(photos);
      setDbCats((c.data ?? []) as DbCategory[]);
      // Genera in parallelo URL firmati ridimensionati per la griglia
      Promise.all(
        photos.map((ph) =>
          supabase.storage
            .from("gallery")
            .createSignedUrl(ph.storage_path, THUMB_EXPIRES, {
              transform: { width: 600, quality: 65, resize: "cover" },
            })
            .then((r) => [ph.id, r.data?.signedUrl ?? ph.url] as const),
        ),
      ).then((pairs) => setThumbs(Object.fromEntries(pairs)));
    });
  }, []);

  const allItems: Item[] = useMemo(() => {
    const staticItems: Item[] = GALLERY.map((g, idx) => ({
      key: `s-${idx}-${g.photoId}`,
      src: photos[g.photoId],
      thumb: photos[g.photoId],
      alt: g.alt,
      categories: g.categories,
    }));
    const dbItems: Item[] = dbPhotos.map((p) => ({
      key: `db-${p.id}`,
      src: p.url,
      thumb: thumbs[p.id] ?? p.url,
      alt: { it: p.alt_it, en: p.alt_en },
      categories: p.category_slugs,
    }));
    return dbItems.length > 0 ? dbItems : staticItems;
  }, [dbPhotos, thumbs]);


  const categories = useMemo(() => {
    if (dbCats.length > 0) {
      return dbCats.map((c) => ({ id: c.slug, label: { it: c.title_it, en: c.title_en } }));
    }
    return GALLERY_FILTERS.filter((f) => f.id !== "all");
  }, [dbCats]);

  const sections = useMemo(() => {
    const result = categories
      .map((cat) => ({
        id: cat.id,
        label: cat.label,
        items: allItems.filter((it) => it.categories.includes(cat.id)),
      }))
      .filter((s) => s.items.length > 0);
    const categorized = new Set(result.flatMap((s) => s.items.map((i) => i.key)));
    const uncategorized = allItems.filter((it) => !categorized.has(it.key));
    if (uncategorized.length > 0) {
      result.push({
        id: "other",
        label: { it: "Altre foto", en: "Other photos" },
        items: uncategorized,
      });
    }
    return result;
  }, [categories, allItems]);

  const flatItems = useMemo(() => sections.flatMap((s) => s.items), [sections]);
  const active = activeIdx !== null ? flatItems[activeIdx] : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sections.length === 0) return;

    let cancelled = false;
    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      // riposiziona più volte: le immagini lazy possono spostare il layout
      let tries = 0;
      const tick = () => {
        if (cancelled) return;
        const target = document.getElementById(hash);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: tries === 0 ? "smooth" : "auto" });
        }
        tries += 1;
        if (tries < 8) window.setTimeout(tick, 250);
      };
      tick();
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [sections]);

function Lightbox({
  items,
  activeIdx,
  locale,
  onClose,
  onChange,
}: {
  items: Item[];
  activeIdx: number;
  locale: "it" | "en";
  onClose: () => void;
  onChange: (idx: number) => void;
}) {
  const active = items[activeIdx];
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(activeIdx - 1);
  }, [hasPrev, activeIdx, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(activeIdx + 1);
  }, [hasNext, activeIdx, onChange]);

  // Tastiera
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  // Swipe touch
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.changedTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    setTouchStart(null);
  };

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galleria"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 sm:right-4 sm:top-4"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        disabled={!hasPrev}
        aria-label="Foto precedente"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white disabled:opacity-30 hover:bg-black/60 sm:left-4"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        disabled={!hasNext}
        aria-label="Foto successiva"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white disabled:opacity-30 hover:bg-black/60 sm:right-4"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="flex max-h-[90vh] max-w-[95vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={active.src}
          alt={active.alt[locale]}
          className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        />
        <p className="mt-3 text-sm font-medium text-white/90">
          {activeIdx + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}


  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("common.since")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("gallery.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("gallery.subtitle")}</p>
        </div>

        {sections.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            {locale === "it" ? "Nessuna foto disponibile." : "No photos available."}
          </p>
        ) : (
          <div className="mt-14 space-y-16">
            {sections.map((section) => {
              const startIdx = flatItems.findIndex((it) => it.key === section.items[0].key);
              return (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {section.label[locale]}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.items.length} {locale === "it" ? "foto" : "photos"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {section.items.map((item, i) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveIdx(startIdx + i)}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={item.alt[locale]}
                      >
                        <img
                          src={item.thumb}
                          alt={item.alt[locale]}
                          loading="lazy"
                          decoding="async"
                          width={600}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {active && activeIdx !== null && (
        <Lightbox
          items={flatItems}
          activeIdx={activeIdx}
          locale={locale}
          onClose={() => setActiveIdx(null)}
          onChange={setActiveIdx}
        />
      )}
    </SiteLayout>
  );
}

