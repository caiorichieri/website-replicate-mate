import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Cake, Baby, GraduationCap, Heart, Building2, Utensils, Music } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import heroImage from "@/assets/gallery-05-buffet-tavole.jpg";
import introImage from "@/assets/gallery-02-pneu-prosecco.jpg";
import spacesImage from "@/assets/gallery-07-area-esterna.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alla Nazionale — Bar storico, eventi e catering dal 1912" },
      {
        name: "description",
        content:
          "Bar storico dal 1912. Organizziamo eventi privati, compleanni, baby shower, lauree, anniversari, feste aziendali e servizio catering.",
      },
      { property: "og:title", content: "Alla Nazionale — Eventi & Catering dal 1912" },
      {
        property: "og:description",
        content: "Trasformiamo i tuoi momenti in ricordi indimenticabili. Bar storico, eventi privati e catering.",
      },
      { property: "og:image", content: "/og-home.jpg" },
      { property: "og:url", content: "https://allanazionale.it/" },
      { name: "twitter:title", content: "Alla Nazionale — Eventi & Catering dal 1912" },
      {
        name: "twitter:description",
        content: "Bar storico dal 1912. Eventi privati, feste e catering.",
      },
      { name: "twitter:image", content: "/og-home.jpg" },
    ],
  }),
  component: HomePage,
});

const EVENT_HIGHLIGHTS = [
  { key: "compleanni", Icon: Calendar },
  { key: "primo", Icon: Cake },
  { key: "babyshower", Icon: Baby },
  { key: "lauree", Icon: GraduationCap },
  { key: "anniversari", Icon: Heart },
  { key: "aziendali", Icon: Building2 },
  { key: "catering", Icon: Utensils },
  { key: "djset", Icon: Music },
] as const;

function HomePage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Alla Nazionale — la nostra location per eventi"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* Overlay crema traslucida sopra la foto */}
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />

        <div className="container mx-auto px-4 py-20 md:px-6">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t("common.tagline")} · {t("common.since")}
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
              >
                {t("home.heroCta")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/spazi"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/40 bg-background/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                {t("home.heroSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO / STORIA — full-bleed cinematográfico */}
      <section className="relative w-full">
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden md:h-[90vh]">
          <img
            src={introImage}
            alt="La famiglia Cinelli — Alla Nazionale"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-side-overlay-left" />

          <div className="container relative mx-auto flex h-full items-center px-4 md:px-6">
            <div className="max-w-xl animate-fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("home.introEyebrow")}</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                {t("home.introTitle")}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-foreground/85 md:text-base">{t("home.introText")}</p>
              <Link
                to="/chi-siamo"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-background/60 px-6 py-3 text-sm font-semibold text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-gold-foreground"
              >
                {t("common.discover")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTI */}
      <section className="bg-card py-20 md:py-28">
        <div className="container mx-auto px-8 md:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("home.eventsEyebrow")}</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {t("home.eventsTitle")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">{t("home.eventsSubtitle")}</p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {EVENT_HIGHLIGHTS.map(({ key, Icon }) => (
              <div
                key={key}
                className="group rounded-2xl border border-border bg-background p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10 md:p-7"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-gold transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground md:text-lg">
                  {t(`events.${key}.title`)}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/eventi"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {t("common.discover")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPAZI / PERSONALIZZAZIONE — full-bleed, texto à direita */}
      <section className="relative w-full">
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden md:h-[90vh]">
          <img
            src={spacesImage}
            alt="Personalizziamo ogni evento nei minimi dettagli"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-side-overlay-right" />

          <div className="container relative mx-auto flex h-full items-center justify-end px-4 md:px-6">
            <div className="max-w-xl animate-fade-up text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("home.spacesEyebrow")}</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                {t("home.spacesTitle")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">{t("home.spacesText")}</p>
              <Link
                to="/spazi"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-background/60 px-6 py-3 text-sm font-semibold text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-gold-foreground"
              >
                {t("common.discover")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-secondary via-card to-background px-6 py-14 text-center md:px-12 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("common.bookEvent")}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{t("home.ctaText")}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {t("common.whatsapp")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
