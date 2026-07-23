import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";

export function WhatsAppFloat() {
  const { t, locale } = useI18n();
  const message = locale === "it"
    ? "Ciao! Vorrei informazioni per organizzare un evento al Bar Alla Nazionale."
    : "Hi! I'd like more info about hosting an event at Bar Alla Nazionale.";

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("common.whatsapp")}
        className="group relative flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-white shadow-2xl shadow-black/40 transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-whatsapp opacity-60 blur-md transition-opacity group-hover:opacity-90"
        />
      </a>
    </div>
  );
}

