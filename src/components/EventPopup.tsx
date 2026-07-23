import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { supabase } from "@/integrations/supabase/client";
import buffetImage from "@/assets/gallery-05-buffet-tavole.jpg";

const STORAGE_KEY = "alla-nazionale-popup-dismissed";

type PopupData = {
  enabled: boolean;
  title_it: string;
  title_en: string;
  text_it: string;
  text_en: string;
  cta_it: string;
  cta_en: string;
  dismiss_it: string;
  dismiss_en: string;
  image_url: string | null;
  link_type: "whatsapp" | "url";
  link_value: string;
  delay_ms: number;
};

export function EventPopup() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PopupData | null>(null);

  useEffect(() => {
    supabase
      .from("popup_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setData(data as PopupData | null));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!data || !data.enabled) return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), data.delay_ms ?? 8000);
    return () => window.clearTimeout(timer);
  }, [data]);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  if (!open || !data) return null;

  const title = locale === "it" ? data.title_it : data.title_en;
  const text = locale === "it" ? data.text_it : data.text_en;
  const cta = locale === "it" ? data.cta_it : data.cta_en;
  const dismiss = locale === "it" ? data.dismiss_it : data.dismiss_en;

  const href =
    data.link_type === "url" && data.link_value
      ? data.link_value
      : whatsappUrl(
          data.link_value ||
            (locale === "it"
              ? "Ciao! Ho visto il vostro sito e vorrei informazioni per organizzare un evento al Bar Alla Nazionale."
              : "Hi! I saw your website and I'd like info about hosting an event at Bar Alla Nazionale."),
        );

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
          <img src={data.image_url || buffetImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>

        <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t("common.since")}</p>
          <h3 id="event-popup-title" className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              {cta}
            </a>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
