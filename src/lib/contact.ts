/**
 * Configurazione di contatto centralizzata.
 * In futuro questi valori saranno gestiti dal pannello admin via Lovable Cloud.
 */
export const CONTACT = {
  phoneRaw: "393931047871",
  phoneDisplay: "+39 393 1047871",
  email: "info@allanazionale.it",
  siteName: "Alla Nazionale",
  siteUrl: "https://allanazionale.it",
  since: 1912,
  city: "Codroipo",
  country: "Italia",
};

/** Immagine social assoluta condivisa da tutte le pagine. */
export const SITE_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/273c6d33-a36a-4241-bebe-e4ef50aaaac2";

export function whatsappUrl(message?: string) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${CONTACT.phoneRaw}${text}`;
}

export function emailUrl(subject?: string) {
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT.email}${s}`;
}
