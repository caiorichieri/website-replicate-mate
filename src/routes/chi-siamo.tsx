import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import aboutImage from "@/assets/gallery-04-team.jpg";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi Siamo — Alla Nazionale, bar storico dal 1912" },
      {
        name: "description",
        content:
          "La storia di Alla Nazionale: oltre 110 anni di tradizione, qualità e ospitalità. Bar storico e location per eventi privati.",
      },
      { property: "og:title", content: "Chi Siamo — Alla Nazionale" },
      {
        property: "og:description",
        content: "Oltre 110 anni di storia, tradizione e ospitalità.",
      },
      { property: "og:image", content: "/og-about.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  const values = [
    { Icon: Award, key: "tradition" },
    { Icon: Sparkles, key: "quality" },
    { Icon: Heart, key: "passion" },
  ] as const;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("common.since")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("about.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("about.subtitle")}</p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <img
            src={aboutImage}
            alt="Il team di Alla Nazionale"
            className="rounded-2xl shadow-2xl"
          />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {values.map(({ Icon, key }) => (
            <div
              key={key}
              className="rounded-2xl border border-border/60 bg-card p-7 text-center transition-colors hover:border-primary/60"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
                {t(`about.values.${key}`)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`about.values.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
