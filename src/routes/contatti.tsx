import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/lib/i18n";
import { CONTACT, SITE_OG_IMAGE, emailUrl, whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — Alla Nazionale" },
      {
        name: "description",
        content:
          "Contattaci su WhatsApp +39 393 1047871 o via email info@allanazionale.it. Richiedi un preventivo gratuito per il tuo evento.",
      },
      { property: "og:title", content: "Contatti — Alla Nazionale" },
      {
        property: "og:description",
        content: "Richiedi un preventivo gratuito per il tuo evento.",
      },
      { property: "og:url", content: `${CONTACT.siteUrl}/contatti` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { name: "twitter:title", content: "Contatti — Alla Nazionale" },
      { name: "twitter:description", content: "Richiedi un preventivo gratuito per il tuo evento." },
      { name: "twitter:image", content: SITE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${CONTACT.siteUrl}/contatti` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, locale } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines = [
      `Nome: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Telefono: ${data.get("phone")}`,
      `Tipo evento: ${data.get("event")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    const subject = `[Sito] Richiesta evento — ${data.get("name")}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("common.since")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="name">{t("contact.formName")}</label>
                <input id="name" name="name" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">{t("contact.formEmail")}</label>
                <input id="email" name="email" type="email" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">{t("contact.formPhone")}</label>
                <input id="phone" name="phone" type="tel" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="event">{t("contact.formEvent")}</label>
                <input id="event" name="event" placeholder={locale === "it" ? "Es. Compleanno, baby shower, catering…" : "E.g. Birthday, baby shower, catering…"} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="message">{t("contact.formMessage")}</label>
                <textarea id="message" name="message" rows={5} required className={inputClass} />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {t("contact.formSubmit")}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              {submitted
                ? locale === "it"
                  ? "Apertura email in corso… grazie!"
                  : "Opening your email client… thank you!"
                : t("contact.formNote")}
            </p>
          </form>

          {/* Direct contact */}
          <aside className="space-y-3 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t("contact.directContact")}
            </p>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-whatsapp/60"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.whatsappLabel")}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                  {CONTACT.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={emailUrl()}
              className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/60"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.emailLabel")}
                </p>
                <p className="mt-1 break-all font-display text-base font-semibold text-foreground group-hover:text-primary">
                  {CONTACT.email}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {locale === "it" ? "Località" : "Location"}
                </p>
                <p className="mt-1 font-display text-base font-semibold text-foreground">
                  {CONTACT.city}, {CONTACT.country}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
