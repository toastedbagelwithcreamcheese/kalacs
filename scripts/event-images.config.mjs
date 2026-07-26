// Melyik forrásmappából melyik rendezvény-kategóriába kerülnek a képek.
//
// A `tags` mező akkor kell, ha egy esemény több szempontból is besorolható:
// a Pannon Egyetem sport- és közösségi programjai tematikusan a Sport /
// Magánünnep kategóriába valók, de egyetemi referenciák is -- a
// /rendezveny/munkaim szűrője a tag alapján mindkét helyen megmutatja őket.
//
// Új anyag hozzáadása: vegyél fel egy sort, és futtasd újra:
//   node scripts/prep-event-images.mjs

export const SOURCE_ROOT =
  "/Volumes/Samsung 1TB SSD/07-20_Weboldalamra_Kepek/Rendezvények";

export const IMAGE_MAP = [
  { from: "LR",                   to: "konferencia", slug: "lr",           label: "LR Health & Beauty rendezvény" },
  { from: "Egyed_Viktor",         to: "konferencia", slug: "egyed-viktor", label: "Egyed Viktor Leadership Akadémia és könyvbemutató" },

  { from: "Pannon/Dualis_Tabor",  to: "egyetemi",    slug: "dualis-tabor", label: "Duális tábor, Pannon Egyetem" },
  { from: "Ballagás",             to: "egyetemi",    slug: "ballagas",     label: "Ballagás" },

  { from: "Offroad",              to: "offroad",     slug: "offroad",      label: "Offroad találkozó" },

  { from: "Pannon/Foci",          to: "sport",       slug: "foci",         label: "Focibajnokság, Pannon Egyetem", tags: ["egyetemi"] },

  { from: "Anna_Tanc",            to: "kultura",     slug: "tanc",         label: "Táncelőadás" },

  { from: "Pannon/Fozes",         to: "maganunnep",  slug: "fozes",        label: "Főzőverseny, Pannon Egyetem",   tags: ["egyetemi"] },
  { from: "Pannon/Kutyusok",      to: "maganunnep",  slug: "kutyusok",     label: "Kutyás élményprogram, Pannon Egyetem", tags: ["egyetemi"] },
];

// --- Méret- és minőségkorlátok (terv 7.1) ---
export const MAX_EDGE = 1800;        // hosszabb él, px
export const QUALITY_PRIMARY = 72;
export const QUALITY_FALLBACK = 64;  // ha az elsődleges túl nagy fájlt ad
export const RETRY_ABOVE_BYTES = 220 * 1024;

// --- Build-time őr korlátai (check-media-budget.mjs) ---
export const LIMIT_PER_IMAGE_BYTES = 250 * 1024;
export const LIMIT_IMAGES_TOTAL_BYTES = 70 * 1024 * 1024;
export const LIMIT_VIDEO_TOTAL_BYTES = 12 * 1024 * 1024;
