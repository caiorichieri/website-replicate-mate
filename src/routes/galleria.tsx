import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { GALLERY, GALLERY_FILTERS } from "@/content/site";
import { photos } from "@/content/photos";

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
      {
        property: "og:description",
        content: "Le foto dei nostri eventi e dei nostri spazi.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return GALLERY;
    return GALLERY.filter((g) => g.categories.includes(filter));
  }, [filter]);

  const active = activeIdx !== null ? filtered[activeIdx] : null;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("common.since")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("gallery.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("gallery.subtitle")}</p>
        </div>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {GALLERY_FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setActiveIdx(null);
                }}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow"
                    : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {f.label[locale]}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filtered.map((item, idx) => (
            <button
              key={`${item.photoId}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={item.alt[locale]}
            >
              <img
                src={photos[item.photoId]}
                alt={item.alt[locale]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            {locale === "it" ? "Nessuna foto in questa categoria." : "No photos in this category."}
          </p>
        )}
      </section>

      {/* Lightbox */}
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
            src={photos[active.photoId]}
            alt={active.alt[locale]}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SiteLayout>
  );
}
