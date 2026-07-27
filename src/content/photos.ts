/**
 * PHOTO REGISTRY
 * --------------
 * Cada foto está no CDN via .asset.json. Para adicionar uma nova foto:
 *   1. Rode `lovable-assets create --file <path> --filename <nome>.jpg > src/assets/photos/<nome>.jpg.asset.json`
 *   2. Importe abaixo e adicione ao objeto `photos`.
 *   3. Use o id em `src/content/site.ts` (galleria, spazi, eventi, hero).
 */
import p_terrazza1 from "@/assets/photos/wa-2024-01-27-at-10.04.42-5.jpeg.asset.json";
import p_terrazza2 from "@/assets/photos/wa-2024-01-27-at-10.04.43-4.jpeg.asset.json";
import p_pergolato1 from "@/assets/photos/img-20240510-152047.jpg.asset.json";
import p_pergolato2 from "@/assets/photos/img-20250609-wa0100.jpg.asset.json";
import p_giardinoFesta from "@/assets/photos/img-20250518-172030.jpg.asset.json";
import p_lauraSala from "@/assets/photos/img-20250327-194759.jpg.asset.json";
import p_lauraOrso from "@/assets/photos/img-20250703-wa0041.jpg.asset.json";
import p_lauraCesto from "@/assets/photos/img-20250703-wa0042.jpg.asset.json";
import p_lauraTovagliolo from "@/assets/photos/img-20250703-wa0043.jpg.asset.json";
import p_evento1 from "@/assets/photos/img-20250712-wa0039.jpg.asset.json";
import p_evento2 from "@/assets/photos/img-20250716-wa0025.jpg.asset.json";
import p_evento3 from "@/assets/photos/img-20250716-wa0032.jpg.asset.json";
import p_evento4 from "@/assets/photos/img-20250913-wa0010.jpg.asset.json";
import p_evento5 from "@/assets/photos/img-20250913-wa0015.jpg.asset.json";
import p_evento6 from "@/assets/photos/img-20250928-wa0032.jpg.asset.json";
import p_evento7 from "@/assets/photos/img-20251020-wa0056.jpg.asset.json";
import p_evento8 from "@/assets/photos/img-20251020-wa0060.jpg.asset.json";
import p_evento9 from "@/assets/photos/img-20251020-wa0094.jpg.asset.json";
import p_evento10 from "@/assets/photos/img-20251020-wa0119.jpg.asset.json";
import p_salaInternaNuova from "@/assets/photos/sala-interna-nuova.jpg.asset.json";

// Fotos legadas (assets do bundler antigo) — ainda úteis para variedade
import g01 from "@/assets/gallery-01-buffet-18anni.jpg";
import g02 from "@/assets/gallery-02-pneu-prosecco.jpg";
import g03 from "@/assets/gallery-03-fingerfood.jpg";
import g04 from "@/assets/gallery-04-team.jpg";
import g05 from "@/assets/gallery-05-buffet-tavole.jpg";
import g06 from "@/assets/gallery-06-sala-interna.jpg";
import g07 from "@/assets/gallery-07-area-esterna.jpg";
import g08 from "@/assets/gallery-08-giardino.jpg";
import g09 from "@/assets/gallery-09-djset.jpg";
import g10 from "@/assets/gallery-10-aperitivo.jpg";

const asUrl = (a: { url: string }) => a.url;

export const photos = {
  // Sala interna
  salaInternaNuova: asUrl(p_salaInternaNuova),

  // Terrazza / rooftop
  terrazza1: asUrl(p_terrazza1),
  terrazza2: asUrl(p_terrazza2),

  // Pergolato / area esterna coperta
  pergolato1: asUrl(p_pergolato1),
  pergolato2: asUrl(p_pergolato2),

  // Giardino
  giardinoFesta: asUrl(p_giardinoFesta),

  // Laurea
  lauraSala: asUrl(p_lauraSala),
  lauraOrso: asUrl(p_lauraOrso),
  lauraCesto: asUrl(p_lauraCesto),
  lauraTovagliolo: asUrl(p_lauraTovagliolo),

  // Eventi vari (WhatsApp)
  evento1: asUrl(p_evento1),
  evento2: asUrl(p_evento2),
  evento3: asUrl(p_evento3),
  evento4: asUrl(p_evento4),
  evento5: asUrl(p_evento5),
  evento6: asUrl(p_evento6),
  evento7: asUrl(p_evento7),
  evento8: asUrl(p_evento8),
  evento9: asUrl(p_evento9),
  evento10: asUrl(p_evento10),

  // Legacy
  buffet18: g01,
  pneuProsecco: g02,
  fingerfood: g03,
  team: g04,
  buffetTavole: g05,
  salaInterna: g06,
  areaEsterna: g07,
  giardinoRustico: g08,
  djset: g09,
  aperitivo: g10,
} as const;

export type PhotoId = keyof typeof photos;
