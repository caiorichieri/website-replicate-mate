/**
 * SITE CONTENT
 * ------------
 * Único lugar para editar categorias, espaços e galeria do site.
 *
 * COMO ADICIONAR UMA FOTO NOVA:
 *   1. Suba o arquivo com `lovable-assets` (ver `photos.ts`).
 *   2. Adicione o import em `photos.ts` com um id curto (ex: "novoEvento").
 *   3. Adicione uma entrada em `GALLERY` com { id: "novoEvento", categories: [...] }.
 *
 * COMO ADICIONAR UMA NOVA CATEGORIA / TIPO DE EVENTO:
 *   1. Adicione uma entrada em `EVENT_CATEGORIES`.
 *   2. As fotos podem referenciar essa categoria em `categories: [...]`.
 *
 * COMO ADICIONAR UM NOVO ESPAÇO:
 *   1. Adicione em `SPACES` (id, coverPhotoId, títulos e descrições it/en).
 *
 * Todos os textos (títulos + descrições) suportam IT e EN.
 */
import {
  Calendar,
  Cake,
  Baby,
  GraduationCap,
  Heart,
  Building2,
  Utensils,
  Music,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { PhotoId } from "./photos";

export type Locale = "it" | "en";
export type L10n = Record<Locale, string>;

// ─────────────────────────────────────────────────────────────
// EVENT CATEGORIES  (também usadas como filtro da galleria)
// ─────────────────────────────────────────────────────────────
export type EventCategory = {
  id: string;
  Icon: LucideIcon;
  title: L10n;
  desc: L10n;
};

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "compleanni",
    Icon: Calendar,
    title: { it: "Compleanni", en: "Birthdays" },
    desc: {
      it: "Dai 18 ai 50 anni e oltre. Festeggia il tuo compleanno in un'atmosfera unica con buffet, musica e decorazioni su misura.",
      en: "From 18 to 50 and beyond. Celebrate your birthday in a unique atmosphere with custom buffet, music and decorations.",
    },
  },
  {
    id: "primo",
    Icon: Cake,
    title: { it: "Primo Compleanno", en: "First Birthday" },
    desc: {
      it: "Il primo grande traguardo merita una celebrazione speciale. Allestimenti dedicati, smash cake e atmosfera magica per i più piccoli.",
      en: "The first big milestone deserves a special celebration. Dedicated set-ups, smash cake and a magical atmosphere for the little ones.",
    },
  },
  {
    id: "babyshower",
    Icon: Baby,
    title: { it: "Baby Shower & Gender Reveal", en: "Baby Shower & Gender Reveal" },
    desc: {
      it: "Celebra l'arrivo del nuovo bebè con amiche e famiglia. Decorazioni a tema, dolci personalizzati e momenti emozionanti.",
      en: "Celebrate the arrival of the new baby with friends and family. Themed decorations, custom sweets and emotional moments.",
    },
  },
  {
    id: "lauree",
    Icon: GraduationCap,
    title: { it: "Lauree", en: "Graduations" },
    desc: {
      it: "Festeggia il tuo traguardo accademico con stile. Brindisi, buffet e un'atmosfera perfetta per ricordare questo momento.",
      en: "Celebrate your academic milestone in style. Toasts, buffet and the perfect atmosphere to remember this moment.",
    },
  },
  {
    id: "anniversari",
    Icon: Heart,
    title: { it: "Anniversari", en: "Anniversaries" },
    desc: {
      it: "Anniversari di matrimonio, fidanzamento o qualsiasi ricorrenza speciale. Un ambiente romantico ed elegante.",
      en: "Wedding anniversaries, engagements or any special occasion in a romantic and elegant setting.",
    },
  },
  {
    id: "aziendali",
    Icon: Building2,
    title: { it: "Eventi Aziendali", en: "Corporate Events" },
    desc: {
      it: "Cene di lavoro, presentazioni, team building e festività aziendali. Servizio professionale e riservato.",
      en: "Business dinners, presentations, team building and company celebrations. Professional and discreet service.",
    },
  },
  {
    id: "catering",
    Icon: Utensils,
    title: { it: "Catering", en: "Catering" },
    desc: {
      it: "Portiamo la nostra cucina ovunque tu voglia. Servizio catering completo per eventi privati e aziendali.",
      en: "We bring our cuisine wherever you want. Full catering service for private and corporate events.",
    },
  },
  {
    id: "djset",
    Icon: Music,
    title: { it: "Feste con DJ Set", en: "Parties with DJ Set" },
    desc: {
      it: "Musica dal vivo e DJ set per far ballare i tuoi ospiti fino a tarda notte. L'atmosfera giusta per ogni festa.",
      en: "Live music and DJ sets to keep your guests dancing until late. The right atmosphere for any party.",
    },
  },
  {
    id: "pensionamento",
    Icon: Sparkles,
    title: { it: "Pensionamento & Traguardi", en: "Retirement & Milestones" },
    desc: {
      it: "Festeggia la fine di un capitolo importante con chi ti vuole bene. Atmosfera curata, buffet e brindisi.",
      en: "Celebrate the end of an important chapter with the people you love. Curated atmosphere, buffet and toasts.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// SPACES
// ─────────────────────────────────────────────────────────────
export type Space = {
  id: string;
  coverPhotoId: PhotoId;
  title: L10n;
  desc: L10n;
};

export const SPACES: Space[] = [
  {
    id: "interna",
    coverPhotoId: "salaInternaNuova",
    title: { it: "Sala interna", en: "Indoor hall" },
    desc: {
      it: "Sala accogliente ed elegante, perfetta per cene private, compleanni e celebrazioni in qualsiasi stagione. Atmosfera calda e riservata.",
      en: "A welcoming and elegant hall, perfect for private dinners, birthdays and celebrations in any season. Warm and intimate atmosphere.",
    },
  },
  {
    id: "esterna",
    coverPhotoId: "pergolato1",
    title: { it: "Pergolato & area coperta", en: "Pergola & covered area" },
    desc: {
      it: "Ampio pergolato in legno, ideale per aperitivi, buffet e ricevimenti all'aperto anche in caso di sole intenso o pioggia leggera.",
      en: "A large wooden pergola, ideal for aperitifs, buffets and outdoor receptions even under strong sun or light rain.",
    },
  },
  {
    id: "terrazza",
    coverPhotoId: "terrazza1",
    title: { it: "Terrazza panoramica", en: "Rooftop terrace" },
    desc: {
      it: "Terrazza al piano superiore, perfetta per aperitivi al tramonto e cene private con vista aperta. Arredi bianchi e ombrelloni.",
      en: "Upper-floor terrace, perfect for sunset aperitifs and private dinners with an open view. White furniture and umbrellas.",
    },
  },
  {
    id: "giardino",
    coverPhotoId: "giardinoFesta",
    title: { it: "Giardino", en: "Garden" },
    desc: {
      it: "Ampio giardino curato con angoli suggestivi, ulivo secolare e prato. Lo spazio perfetto per cerimonie all'aperto e feste estive.",
      en: "A spacious, well-kept garden with charming corners, a centuries-old olive tree and lawn. The perfect setting for outdoor ceremonies and summer parties.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// GALLERY  (uma foto pode aparecer em várias categorias)
// ─────────────────────────────────────────────────────────────
export type GalleryItem = {
  photoId: PhotoId;
  alt: L10n;
  /** ids de EVENT_CATEGORIES + ids de SPACES para filtro */
  categories: string[];
  featured?: boolean;
};

export const GALLERY: GalleryItem[] = [
  // Terrazza
  { photoId: "terrazza1", alt: { it: "Terrazza panoramica al tramonto", en: "Rooftop terrace at sunset" }, categories: ["terrazza"], featured: true },
  { photoId: "terrazza2", alt: { it: "Tavoli allestiti sulla terrazza", en: "Set tables on the terrace" }, categories: ["terrazza", "anniversari"] },

  // Pergolato / esterno
  { photoId: "pergolato1", alt: { it: "Pergolato in legno con tavoli", en: "Wooden pergola with tables" }, categories: ["esterna"], featured: true },
  { photoId: "pergolato2", alt: { it: "Lounge sotto il pergolato", en: "Lounge under the pergola" }, categories: ["esterna", "aziendali"] },

  // Giardino
  { photoId: "giardinoFesta", alt: { it: "Festa nel giardino con ospiti", en: "Party in the garden with guests" }, categories: ["giardino", "compleanni"], featured: true },
  { photoId: "giardinoRustico", alt: { it: "Angoli rustici in giardino", en: "Rustic corners in the garden" }, categories: ["giardino"] },

  // Laurea
  { photoId: "lauraSala", alt: { it: "Sala allestita per una laurea con palloncini rossi", en: "Hall set up for a graduation with red balloons" }, categories: ["lauree", "interna"], featured: true },
  { photoId: "lauraOrso", alt: { it: "Allestimento laurea con orso e palloncini", en: "Graduation set-up with bear and balloons" }, categories: ["lauree"] },
  { photoId: "lauraCesto", alt: { it: "Cesto di bomboniere per laurea", en: "Basket of graduation favors" }, categories: ["lauree"] },
  { photoId: "lauraTovagliolo", alt: { it: "Tovagliolo tema laurea", en: "Graduation-themed napkin" }, categories: ["lauree"] },

  // Eventi vari
  { photoId: "evento1", alt: { it: "Momento di festa", en: "Party moment" }, categories: ["compleanni"] },
  { photoId: "evento2", alt: { it: "Allestimento evento", en: "Event set-up" }, categories: ["compleanni"] },
  { photoId: "evento3", alt: { it: "Dettagli evento", en: "Event details" }, categories: ["compleanni"] },
  { photoId: "evento4", alt: { it: "Momento di festa", en: "Party moment" }, categories: ["anniversari"] },
  { photoId: "evento5", alt: { it: "Ospiti e brindisi", en: "Guests and toasts" }, categories: ["anniversari"] },
  { photoId: "evento6", alt: { it: "Allestimento evento", en: "Event set-up" }, categories: ["babyshower"] },
  { photoId: "evento7", alt: { it: "Festa privata", en: "Private party" }, categories: ["djset"] },
  { photoId: "evento8", alt: { it: "DJ set e ballo", en: "DJ set and dancing" }, categories: ["djset"] },
  { photoId: "evento9", alt: { it: "Buffet e ospiti", en: "Buffet and guests" }, categories: ["catering"] },
  { photoId: "evento10", alt: { it: "Momento della serata", en: "Moment of the evening" }, categories: ["djset"] },

  // Legacy
  { photoId: "buffetTavole", alt: { it: "Buffet con tavole di legno", en: "Buffet on wooden boards" }, categories: ["catering"], featured: true },
  { photoId: "buffet18", alt: { it: "Festa di 18 anni con arco di palloncini", en: "18th birthday with balloon arch" }, categories: ["compleanni"] },
  { photoId: "pneuProsecco", alt: { it: "Pneumatico come secchiello con prosecco", en: "Tyre as prosecco bucket" }, categories: ["catering", "aziendali"] },
  { photoId: "fingerfood", alt: { it: "Finger food con fiori freschi", en: "Finger food with fresh flowers" }, categories: ["catering"] },
  { photoId: "team", alt: { it: "Team Alla Nazionale", en: "Alla Nazionale team" }, categories: ["aziendali"] },
  { photoId: "salaInterna", alt: { it: "Sala interna allestita", en: "Indoor hall set up" }, categories: ["interna"] },
  { photoId: "areaEsterna", alt: { it: "Area esterna coperta", en: "Covered outdoor area" }, categories: ["esterna"] },
  { photoId: "djset", alt: { it: "DJ set durante una festa", en: "DJ set during a party" }, categories: ["djset"] },
  { photoId: "aperitivo", alt: { it: "Buffet di aperitivo", en: "Aperitif buffet" }, categories: ["catering"] },
];

// ─────────────────────────────────────────────────────────────
// FILTROS DE GALLERIA  (o que aparece como "chip" na página)
// ─────────────────────────────────────────────────────────────
export const GALLERY_FILTERS: { id: string; label: L10n }[] = [
  { id: "all", label: { it: "Tutte", en: "All" } },
  { id: "compleanni", label: { it: "Compleanni", en: "Birthdays" } },
  { id: "lauree", label: { it: "Lauree", en: "Graduations" } },
  { id: "babyshower", label: { it: "Baby Shower", en: "Baby Shower" } },
  { id: "anniversari", label: { it: "Anniversari", en: "Anniversaries" } },
  { id: "aziendali", label: { it: "Aziendali", en: "Corporate" } },
  { id: "catering", label: { it: "Catering", en: "Catering" } },
  { id: "djset", label: { it: "DJ Set", en: "DJ Set" } },
  { id: "terrazza", label: { it: "Terrazza", en: "Rooftop" } },
  { id: "esterna", label: { it: "Pergolato", en: "Pergola" } },
  { id: "giardino", label: { it: "Giardino", en: "Garden" } },
  { id: "interna", label: { it: "Sala interna", en: "Indoor" } },
];

// ─────────────────────────────────────────────────────────────
// HERO / HOME  (fotos "chave" que aparecem na home)
// ─────────────────────────────────────────────────────────────
export const HOME_PHOTOS: {
  hero: PhotoId;
  intro: PhotoId;
  spaces: PhotoId;
} = {
  hero: "terrazza1",
  intro: "giardinoFesta",
  spaces: "pergolato2",
};
