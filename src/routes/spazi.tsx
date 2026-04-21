import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import internaImage from "@/assets/gallery-06-sala-interna.jpg";
import esternaImage from "@/assets/gallery-07-area-esterna.jpg";
import giardinoImage from "@/assets/gallery-08-giardino.jpg";

export const Route = createFileRoute("/spazi")({
  head: () => ({
    meta: [
      { title: "I nostri spazi — Alla Nazionale" },
      {
        name: "description",
        content:
          "Sala interna elegante, area esterna coperta e ampio giardino. Ambienti versatili per eventi privati di ogni tipo.",
      },
      { property: "og:title", content: "I nostri spazi — Alla Nazionale" },
      {
        property: "og:description",
        content: "Sala interna, area esterna coperta e giardino per i tuoi eventi.",
      },
      { property: "og:image", content: "/og-spaces.jpg" },
    ],
  }),
  component: SpacesPage,
});

const SPACES = [
  { key: "interna", img: internaImage },
  { key: "esterna", img: esternaImage },
  { key: "giardino", img: giardinoImage },
] as const;

function SpacesPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("common.since")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("spaces.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("spaces.subtitle")}</p>
        </div>

        <div className="mt-16 space-y-16 md:space-y-24">
          {SPACES.map(({ key, img }, idx) => (
            <article
              key={key}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <img
                  src={img}
                  alt={t(`spaces.${key}.title`)}
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  0{idx + 1}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {t(`spaces.${key}.title`)}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {t(`spaces.${key}.desc`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
