import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import buffetImage from "@/assets/gallery-05-buffet-tavole.jpg";

const STORAGE_KEY = "alla-nazionale-popup-dismissed";
const SHOW_DELAY_MS = 8000;

export function EventPopup() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  if (!open) return null;

  const waMessage = locale === "it"
    ? "Ciao! Ho visto il vostro sito e vorrei informazioni per organizzare un evento."
    : "Hi! I saw your website and I'd like info about hosting an event.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popup-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-background/70 p-1.5 text-foreground/80 transition-colors hover:bg-background hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-40 overflow-hidden sm:h-48">
          <img
            src={buffetImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>

        <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {t("common.since")}
          </p>
          <h3 id="event-popup-title" className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {t("popup.title")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("popup.text")}
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={whatsappUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              {t("popup.cta")}
            </a>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {t("popup.dismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
