import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
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
    ],
  }),
  component: GalleryPage,
});

type DbPhoto = {
  id: string;
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
  alt: { it: string; en: string };
  categories: string[];
};

function GalleryPage() {
  const { t, locale } = useI18n();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [dbPhotos, setDbPhotos] = useState<DbPhoto[]>([]);
  const [dbCats, setDbCats] = useState<DbCategory[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("gallery_photos").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("gallery_categories").select("*").order("sort_order").order("title_it"),
    ]).then(([p, c]) => {
      setDbPhotos((p.data ?? []) as DbPhoto[]);
      setDbCats((c.data ?? []) as DbCategory[]);
    });
  }, []);

  const allItems: Item[] = useMemo(() => {
    const staticItems: Item[] = GALLERY.map((g, idx) => ({
      key: `s-${idx}-${g.photoId}`,
      src: photos[g.photoId],
      alt: g.alt,
      categories: g.categories,
    }));
    const dbItems: Item[] = dbPhotos.map((p) => ({
      key: `db-${p.id}`,
      src: p.url,
      alt: { it: p.alt_it, en: p.alt_en },
      categories: p.category_slugs,
    }));
    return dbItems.length > 0 ? dbItems : staticItems;
  }, [dbPhotos]);

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
                <div key={section.id}>
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
                    <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {section.label[locale]}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.items.length} {locale === "it" ? "foto" : "photos"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {section.items.map((item, i) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveIdx(startIdx + i)}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={item.alt[locale]}
                      >
                        <img
                          src={item.src}
                          alt={item.alt[locale]}
                          loading="lazy"
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

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveIdx(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIdx(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-background/30 p-2 text-foreground hover:bg-background/60"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={active.src}
            alt={active.alt[locale]}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SiteLayout>
  );
}

