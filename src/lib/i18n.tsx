import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "it" | "en";

type Dict = Record<string, string>;
type Translations = Record<Locale, Dict>;

const translations: Translations = {
  it: {
    // Nav
    "nav.home": "Home",
    "nav.about": "Chi Siamo",
    "nav.events": "Eventi",
    "nav.spaces": "Spazi",
    "nav.gallery": "Galleria",
    "nav.contact": "Contatti",
    "nav.cta": "Richiedi preventivo",

    // Common
    "common.since": "Dal 1912",
    "common.tagline": "Bar storico · Eventi · Catering",
    "common.whatsapp": "Scrivici su WhatsApp",
    "common.email": "Inviaci una email",
    "common.discover": "Scopri di più",
    "common.bookEvent": "Prenota il tuo evento",

    // Home
    "home.heroTitle": "Trasformiamo i tuoi momenti in ricordi indimenticabili",
    "home.heroSubtitle": "Bar storico dal 1912. Organizziamo eventi privati, feste, catering e cerimonie con eleganza e tradizione.",
    "home.heroCta": "Richiedi un preventivo gratuito",
    "home.heroSecondary": "Scopri i nostri spazi",

    "home.introEyebrow": "La nostra storia",
    "home.introTitle": "Oltre un secolo di accoglienza",
    "home.introText": "Dal 1912 Alla Nazionale è il punto di riferimento per chi cerca un luogo autentico dove celebrare i momenti più importanti della vita. Tradizione, qualità e ospitalità in un'unica location.",

    "home.eventsEyebrow": "Cosa organizziamo",
    "home.eventsTitle": "Eventi su misura per te",
    "home.eventsSubtitle": "Ogni occasione merita di essere celebrata con cura. Dai compleanni alle feste aziendali, ci occupiamo di tutto.",

    "home.spacesEyebrow": "I nostri spazi",
    "home.spacesTitle": "Ambienti raffinati per ogni occasione",
    "home.spacesText": "Sala interna elegante, area esterna coperta e ampio giardino. Spazi versatili che si adattano a feste intime o grandi celebrazioni.",

    "home.ctaTitle": "Pronto a organizzare il tuo evento?",
    "home.ctaText": "Contattaci subito per un preventivo personalizzato. Ti risponderemo entro poche ore.",

    // Eventi
    "events.title": "Eventi & Cerimonie",
    "events.subtitle": "Ogni momento della vita merita una festa indimenticabile",
    "events.compleanni.title": "Compleanni",
    "events.compleanni.desc": "Dai 18 ai 50 anni e oltre. Festeggia il tuo compleanno in un'atmosfera unica con buffet, musica e decorazioni su misura.",
    "events.primo.title": "Primo Compleanno",
    "events.primo.desc": "Il primo grande traguardo merita una celebrazione speciale. Allestimenti dedicati, smash cake e atmosfera magica per i più piccoli.",
    "events.babyshower.title": "Baby Shower",
    "events.babyshower.desc": "Celebra l'arrivo del nuovo bebè con amiche e famiglia. Decorazioni a tema, dolci personalizzati e momenti emozionanti.",
    "events.lauree.title": "Lauree",
    "events.lauree.desc": "Festeggia il tuo traguardo accademico con stile. Brindisi, buffet e un'atmosfera perfetta per ricordare questo momento.",
    "events.anniversari.title": "Anniversari",
    "events.anniversari.desc": "Anniversari di matrimonio, fidanzamento o qualsiasi ricorrenza speciale. Un ambiente romantico ed elegante.",
    "events.aziendali.title": "Eventi Aziendali",
    "events.aziendali.desc": "Cene di lavoro, presentazioni, team building e festività aziendali. Servizio professionale e riservato.",
    "events.catering.title": "Catering",
    "events.catering.desc": "Portiamo la nostra cucina ovunque tu voglia. Servizio catering completo per eventi privati e aziendali.",
    "events.djset.title": "Feste con DJ Set",
    "events.djset.desc": "Musica dal vivo e DJ set per far ballare i tuoi ospiti fino a tarda notte. L'atmosfera giusta per ogni festa.",

    // Chi siamo
    "about.title": "La nostra storia",
    "about.subtitle": "Dal 1912 al cuore della comunità",
    "about.p1": "Alla Nazionale nasce nel 1912 come punto di ritrovo della comunità locale. Per oltre un secolo abbiamo accompagnato generazioni di clienti nei loro momenti più importanti: dalle colazioni quotidiane ai grandi eventi della vita.",
    "about.p2": "Oggi continuiamo questa tradizione con la stessa passione di sempre, unendo l'autenticità del bar storico all'eleganza di una location ideale per eventi privati, catering e celebrazioni di ogni tipo.",
    "about.p3": "Il nostro segreto? Ascoltare ogni cliente, curare ogni dettaglio e trasformare ogni occasione in un ricordo che dura nel tempo.",
    "about.values.tradition": "Tradizione",
    "about.values.traditionDesc": "Oltre 110 anni di storia e accoglienza",
    "about.values.quality": "Qualità",
    "about.values.qualityDesc": "Materie prime selezionate e cura artigianale",
    "about.values.passion": "Passione",
    "about.values.passionDesc": "Ogni evento curato come fosse il primo",

    // Spazi
    "spaces.title": "I nostri spazi",
    "spaces.subtitle": "Ambienti versatili per ogni tipo di evento",
    "spaces.interna.title": "Sala interna",
    "spaces.interna.desc": "Sala accogliente ed elegante, perfetta per cene private, compleanni e celebrazioni in qualsiasi stagione. Atmosfera calda e riservata.",
    "spaces.esterna.title": "Area esterna coperta",
    "spaces.esterna.desc": "Spazio all'aperto coperto, ideale per aperitivi, buffet e ricevimenti. Perfetto per godersi le belle giornate al riparo.",
    "spaces.giardino.title": "Giardino",
    "spaces.giardino.desc": "Ampio giardino con dettagli rustici e angoli suggestivi. Lo spazio perfetto per cerimonie all'aperto e feste estive.",

    // Galleria
    "gallery.title": "Galleria",
    "gallery.subtitle": "Uno sguardo ai nostri eventi e ai nostri spazi",

    // Contatti
    "contact.title": "Contattaci",
    "contact.subtitle": "Siamo qui per organizzare il tuo prossimo evento",
    "contact.whatsappLabel": "WhatsApp",
    "contact.emailLabel": "Email",
    "contact.formName": "Nome",
    "contact.formEmail": "Email",
    "contact.formPhone": "Telefono",
    "contact.formEvent": "Tipo di evento",
    "contact.formMessage": "Messaggio",
    "contact.formSubmit": "Invia richiesta",
    "contact.formNote": "Ti risponderemo entro 24 ore",
    "contact.directContact": "Oppure contattaci direttamente",

    // Popup
    "popup.title": "Stai organizzando un evento?",
    "popup.text": "Compleanni, baby shower, lauree, anniversari, feste aziendali e catering. Contattaci subito per un preventivo gratuito su misura per te.",
    "popup.cta": "Scrivici su WhatsApp",
    "popup.dismiss": "Forse più tardi",

    // Footer
    "footer.tagline": "Bar storico · Eventi · Catering",
    "footer.followUs": "Seguici",
    "footer.quickLinks": "Link rapidi",
    "footer.contact": "Contatti",
    "footer.rights": "Tutti i diritti riservati.",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.events": "Events",
    "nav.spaces": "Spaces",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.cta": "Get a quote",

    // Common
    "common.since": "Since 1912",
    "common.tagline": "Historic bar · Events · Catering",
    "common.whatsapp": "Message us on WhatsApp",
    "common.email": "Send us an email",
    "common.discover": "Discover more",
    "common.bookEvent": "Book your event",

    // Home
    "home.heroTitle": "Turning your moments into unforgettable memories",
    "home.heroSubtitle": "Historic bar since 1912. We host private events, parties, catering and celebrations with elegance and tradition.",
    "home.heroCta": "Request a free quote",
    "home.heroSecondary": "Discover our spaces",

    "home.introEyebrow": "Our story",
    "home.introTitle": "Over a century of hospitality",
    "home.introText": "Since 1912 Alla Nazionale has been the place to celebrate life's most important moments. Tradition, quality and warm hospitality in one unique venue.",

    "home.eventsEyebrow": "What we host",
    "home.eventsTitle": "Tailor-made events for you",
    "home.eventsSubtitle": "Every occasion deserves to be celebrated with care. From birthdays to corporate parties, we take care of everything.",

    "home.spacesEyebrow": "Our spaces",
    "home.spacesTitle": "Refined settings for any occasion",
    "home.spacesText": "Elegant indoor hall, covered outdoor area and a large garden. Versatile spaces that adapt to intimate parties or grand celebrations.",

    "home.ctaTitle": "Ready to plan your event?",
    "home.ctaText": "Get in touch for a personalised quote. We'll reply within hours.",

    // Eventi
    "events.title": "Events & Celebrations",
    "events.subtitle": "Every life moment deserves an unforgettable party",
    "events.compleanni.title": "Birthdays",
    "events.compleanni.desc": "From 18 to 50 and beyond. Celebrate your birthday in a unique atmosphere with custom buffet, music and decorations.",
    "events.primo.title": "First Birthday",
    "events.primo.desc": "The first big milestone deserves a special celebration. Dedicated set-ups, smash cake and a magical atmosphere for the little ones.",
    "events.babyshower.title": "Baby Shower",
    "events.babyshower.desc": "Celebrate the arrival of the new baby with friends and family. Themed decorations, custom sweets and emotional moments.",
    "events.lauree.title": "Graduations",
    "events.lauree.desc": "Celebrate your academic milestone in style. Toasts, buffet and the perfect atmosphere to remember this moment.",
    "events.anniversari.title": "Anniversaries",
    "events.anniversari.desc": "Wedding anniversaries, engagements or any special occasion in a romantic and elegant setting.",
    "events.aziendali.title": "Corporate Events",
    "events.aziendali.desc": "Business dinners, presentations, team building and company celebrations. Professional and discreet service.",
    "events.catering.title": "Catering",
    "events.catering.desc": "We bring our cuisine wherever you want. Full catering service for private and corporate events.",
    "events.djset.title": "Parties with DJ Set",
    "events.djset.desc": "Live music and DJ sets to keep your guests dancing until late. The right atmosphere for any party.",

    // About
    "about.title": "Our story",
    "about.subtitle": "Since 1912, at the heart of the community",
    "about.p1": "Alla Nazionale was born in 1912 as a meeting point for the local community. For over a century we have accompanied generations of guests through their most important moments: from daily breakfasts to life's grand events.",
    "about.p2": "Today we continue this tradition with the same passion, blending the authenticity of a historic bar with the elegance of an ideal venue for private events, catering and celebrations of every kind.",
    "about.p3": "Our secret? Listening to every client, caring for every detail, and turning every occasion into a memory that lasts.",
    "about.values.tradition": "Tradition",
    "about.values.traditionDesc": "Over 110 years of warm hospitality",
    "about.values.quality": "Quality",
    "about.values.qualityDesc": "Selected ingredients and artisan care",
    "about.values.passion": "Passion",
    "about.values.passionDesc": "Every event treated as if it were our first",

    // Spaces
    "spaces.title": "Our spaces",
    "spaces.subtitle": "Versatile settings for any kind of event",
    "spaces.interna.title": "Indoor hall",
    "spaces.interna.desc": "A welcoming and elegant hall, perfect for private dinners, birthdays and celebrations in any season. Warm and intimate atmosphere.",
    "spaces.esterna.title": "Covered outdoor area",
    "spaces.esterna.desc": "An outdoor covered space, ideal for aperitifs, buffets and receptions. Perfect to enjoy beautiful days under cover.",
    "spaces.giardino.title": "Garden",
    "spaces.giardino.desc": "A large garden with rustic touches and charming corners. The perfect setting for outdoor ceremonies and summer parties.",

    // Gallery
    "gallery.title": "Gallery",
    "gallery.subtitle": "A glimpse into our events and spaces",

    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "We're here to plan your next event",
    "contact.whatsappLabel": "WhatsApp",
    "contact.emailLabel": "Email",
    "contact.formName": "Name",
    "contact.formEmail": "Email",
    "contact.formPhone": "Phone",
    "contact.formEvent": "Type of event",
    "contact.formMessage": "Message",
    "contact.formSubmit": "Send request",
    "contact.formNote": "We'll reply within 24 hours",
    "contact.directContact": "Or contact us directly",

    // Popup
    "popup.title": "Planning an event?",
    "popup.text": "Birthdays, baby showers, graduations, anniversaries, corporate parties and catering. Get in touch for a free, tailor-made quote.",
    "popup.cta": "Message us on WhatsApp",
    "popup.dismiss": "Maybe later",

    // Footer
    "footer.tagline": "Historic bar · Events · Catering",
    "footer.followUs": "Follow us",
    "footer.quickLinks": "Quick links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "alla-nazionale-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "it" || saved === "en") {
      setLocaleState(saved);
    } else {
      const browser = window.navigator.language.toLowerCase();
      if (browser.startsWith("en")) setLocaleState("en");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const t = (key: string) => translations[locale][key] ?? key;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
