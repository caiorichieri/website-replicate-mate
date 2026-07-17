import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT, emailUrl, whatsappUrl } from "@/lib/contact";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/40 bg-card">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">Alla Nazionale</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            {t("common.since")}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{t("footer.tagline")}</p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary">{t("nav.home")}</Link></li>
            <li><Link to="/chi-siamo" className="text-muted-foreground hover:text-primary">{t("nav.about")}</Link></li>
            <li><Link to="/eventi" className="text-muted-foreground hover:text-primary">{t("nav.events")}</Link></li>
            <li><Link to="/spazi" className="text-muted-foreground hover:text-primary">{t("nav.spaces")}</Link></li>
            <li><Link to="/galleria" className="text-muted-foreground hover:text-primary">{t("nav.gallery")}</Link></li>
            <li><Link to="/contatti" className="text-muted-foreground hover:text-primary">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-muted-foreground hover:text-primary"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={emailUrl()}
                className="flex items-start gap-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.city}, {CONTACT.country}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {year} Alla Nazionale. {t("footer.rights")}</p>
          <p className="font-medium uppercase tracking-wider text-gold">Dal 1912</p>
        </div>
      </div>
    </footer>
  );
}
