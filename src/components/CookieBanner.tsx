import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const STORAGE_KEY = "alla-nazionale-cookie-consent-v1";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: consent }));
}

export function CookieBanner() {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!getCookieConsent()) {
      const t = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, []);

  if (!visible) return null;

  const it = locale === "it";

  const accept = (a: boolean, m: boolean) => {
    saveConsent({
      necessary: true,
      analytics: a,
      marketing: m,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={it ? "Preferenze cookie" : "Cookie preferences"}
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold/30 bg-card/95 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3 p-4 sm:p-5">
          <div className="hidden shrink-0 rounded-full bg-gold/15 p-2 text-gold sm:block">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-base font-semibold text-foreground sm:text-lg">
              {it ? "Rispettiamo la tua privacy" : "We respect your privacy"}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {it
                ? "Utilizziamo cookie tecnici e, previo consenso, cookie di analisi (Google Analytics) e marketing (Google Ads, Meta Pixel) per migliorare l'esperienza e misurare le nostre campagne. Puoi accettarli, rifiutarli o personalizzare le preferenze."
                : "We use technical cookies and, with your consent, analytics (Google Analytics) and marketing cookies (Google Ads, Meta Pixel) to improve your experience and measure our campaigns. You can accept, reject or customize."}{" "}
              <Link to="/cookie-policy" className="text-primary underline underline-offset-2">
                {it ? "Cookie Policy" : "Cookie Policy"}
              </Link>
              .
            </p>

            {showDetails && (
              <div className="mt-4 space-y-3 rounded-xl border border-border/60 bg-background/60 p-3 sm:p-4">
                <label className="flex items-start justify-between gap-3 text-sm">
                  <span>
                    <span className="block font-semibold text-foreground">
                      {it ? "Tecnici (sempre attivi)" : "Necessary (always on)"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {it
                        ? "Indispensabili per il funzionamento del sito."
                        : "Required for the site to function."}
                    </span>
                  </span>
                  <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-primary" />
                </label>
                <label className="flex items-start justify-between gap-3 text-sm">
                  <span>
                    <span className="block font-semibold text-foreground">
                      {it ? "Analitici" : "Analytics"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Google Analytics — {it ? "statistiche di utilizzo aggregate." : "aggregated usage statistics."}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                </label>
                <label className="flex items-start justify-between gap-3 text-sm">
                  <span>
                    <span className="block font-semibold text-foreground">
                      Marketing
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Google Ads, Meta Pixel — {it ? "misurazione campagne e remarketing." : "campaign measurement and remarketing."}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => setShowDetails((s) => !s)}
                className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground sm:mr-auto"
              >
                {showDetails
                  ? it
                    ? "Nascondi dettagli"
                    : "Hide details"
                  : it
                    ? "Personalizza"
                    : "Customize"}
              </button>
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
              >
                {it ? "Rifiuta" : "Reject"}
              </button>
              {showDetails && (
                <button
                  type="button"
                  onClick={() => accept(analytics, marketing)}
                  className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  {it ? "Salva preferenze" : "Save preferences"}
                </button>
              )}
              <button
                type="button"
                onClick={() => accept(true, true)}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {it ? "Accetta tutti" : "Accept all"}
              </button>
            </div>
          </div>
          <button
            type="button"
            aria-label={it ? "Chiudi" : "Close"}
            onClick={() => accept(false, false)}
            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-cookie-preferences"));
  }
}
