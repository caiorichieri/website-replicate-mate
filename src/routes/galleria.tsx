import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import img01 from "@/assets/gallery-01-buffet-18anni.jpg";
import img02 from "@/assets/gallery-02-pneu-prosecco.jpg";
import img03 from "@/assets/gallery-03-fingerfood.jpg";
import img04 from "@/assets/gallery-04-team.jpg";
import img05 from "@/assets/gallery-05-buffet-tavole.jpg";
import img06 from "@/assets/gallery-06-sala-interna.jpg";
import img07 from "@/assets/gallery-07-area-esterna.jpg";
import img08 from "@/assets/gallery-08-giardino.jpg";
import img09 from "@/assets/gallery-09-djset.jpg";
import img10 from "@/assets/gallery-10-aperitivo.jpg";

export const Route = createFileRoute("/galleria")({
  head: () => ({
    meta: [
      { title: "Galleria — Alla Nazionale" },
      {
        name: "description",
        content:
          "Sfoglia le foto dei nostri eventi: compleanni, baby shower, feste private, buffet, allestimenti e spazi.",
      },
      { property: "og:title", content: "Galleria — Alla Nazionale" },
      {
        property: "og:description",
        content: "Le foto dei nostri eventi e dei nostri spazi.",
      },
      { property: "og:image", content: "/og-gallery.jpg" },
    ],
  }),
  component: GalleryPage,
});

const IMAGES = [
  { src: img05, alt: "Buffet con tavole di legno" },
  { src: img02, alt: "Pneumatico Goodyear come secchiello con prosecco" },
  { src: img01, alt: "Festa di 18 anni con arco di palloncini" },
  { src: img03, alt: "Finger food con fiori freschi" },
  { src: img06, alt: "Sala interna allestita per evento" },
  { src: img07, alt: "Area esterna coperta" },
  { src: img04, alt: "Team Alla Nazionale" },
  { src: img09, alt: "DJ set durante una festa" },
  { src: img08, alt: "Giardino con dettagli rustici" },
  { src: img10, alt: "Buffet di aperitivo" },
];

function GalleryPage() {
  const { t } = useI18n();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? IMAGES[activeIdx] : null;

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

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {IMAGES.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Open image ${idx + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          ))}
        </div>
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
            src={active.src}
            alt={active.alt}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SiteLayout>
  );
}
