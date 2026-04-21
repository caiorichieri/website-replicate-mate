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
  city: "Verona",
  country: "Italia",
};

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
