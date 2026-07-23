import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { CONTACT, SITE_OG_IMAGE, whatsappUrl } from "@/lib/contact";
import { EVENT_CATEGORIES } from "@/content/site";

export const Route = createFileRoute("/eventi")({
  head: () => ({
    meta: [
      { title: "Eventi & Cerimonie — Alla Nazionale" },
      {
        name: "description",
        content:
          "Compleanni, primo compleanno, baby shower, lauree, anniversari, eventi aziendali, feste con DJ set e catering ad Alla Nazionale.",
      },
      { property: "og:title", content: "Eventi & Cerimonie — Alla Nazionale" },
      {
        property: "og:description",
        content:
          "Organizziamo eventi privati di ogni tipo: compleanni, baby shower, lauree, anniversari, feste aziendali e catering.",
      },
      { property: "og:url", content: `${CONTACT.siteUrl}/eventi` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { name: "twitter:title", content: "Eventi & Cerimonie — Alla Nazionale" },
      { name: "twitter:description", content: "Organizziamo eventi privati di ogni tipo: compleanni, baby shower, lauree, anniversari, feste aziendali e catering." },
      { name: "twitter:image", content: SITE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${CONTACT.siteUrl}/eventi` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Organizzazione eventi privati e catering",
          provider: { "@id": `${CONTACT.siteUrl}/#organization` },
          areaServed: {
            "@type": "Place",
            name: CONTACT.city,
            address: {
              "@type": "PostalAddress",
              addressLocality: CONTACT.city,
              addressRegion: "UD",
              addressCountry: CONTACT.country,
            },
          },
          serviceType: "Eventi privati, catering, feste aziendali",
          description:
            "Organizziamo eventi privati di ogni tipo: compleanni, primo compleanno, baby shower, lauree, anniversari, feste aziendali e catering.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Tipologie di eventi",
            itemListElement: EVENT_CATEGORIES.map((category) => ({
              "@type": "Offer",
              name: category.title.it,
              description: category.desc.it,
              itemOffered: {
                "@type": "Service",
                name: category.title.it,
              },
            })),
          },
        }),
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t, locale } = useI18n();

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("common.since")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("events.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("events.subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_CATEGORIES.map(({ id, Icon, title, desc }) => (
            <article
              key={id}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
                {title[locale]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {desc[locale]}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-gold/30 bg-card px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("home.ctaText")}</p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            {t("common.whatsapp")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
