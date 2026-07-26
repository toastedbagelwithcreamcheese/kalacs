// Kiemelt esettanulmányok — a háromszintű rendszer 1. szintje (terv 3.2).
// Ezek adnak el: sztori + számok + válogatott képanyag.
//
// ┌──────────────────────────────────────────────────────────────────┐
// │ MOST CSAK A TÉNYEK VANNAK BENNE.                                  │
// │ A `brief`, `approach`, `metrics` és `quote` mezők üresek, mert     │
// │ ezeket nem lehet kitalálni — ezek a te adataid (mennyi kép ment    │
// │ ki, mennyi idő alatt, mit mondott a megrendelő).                   │
// │                                                                    │
// │ A `featured: true` esetek jelennek meg a hub „Kiemelt munkák"      │
// │ szekciójában. Egy eset akkor kerül ki, ha van legalább `brief` és  │
// │ `approach` — félkész esettanulmány nem jelenik meg.                │
// └──────────────────────────────────────────────────────────────────┘

export const EVENT_CASES = [
  {
    slug: "egyed-viktor-leadership",
    title: "Leadership Akadémia és könyvbemutató",
    category: "konferencia",
    event: "egyed-viktor", // a manifest `event` mezőjéhez illeszkedik
    featured: true,
    client: "Egyed Viktor",
    date: null,       // TODO
    location: null,   // TODO
    attendees: null,  // TODO
    services: ["foto"],
    brief: "",        // TODO — 2-3 mondat: mi volt a feladat
    approach: "",     // TODO — 3-4 mondat: hogyan oldottad meg
    metrics: [],      // TODO — pl. { label: "Átadott kép", value: "430" }
    quote: null,      // TODO
    video: null,
  },
  {
    slug: "lr-rendezveny",
    title: "LR Health & Beauty rendezvény",
    category: "konferencia",
    event: "lr",
    featured: true,
    client: "LR Health & Beauty",
    date: null,
    location: null,
    attendees: null,
    services: ["foto"],
    brief: "",
    approach: "",
    metrics: [],
    quote: null,
    video: null,
  },
  {
    slug: "g-amboree-offroad",
    title: "G-Amboree offroad találkozó",
    category: "offroad",
    event: "offroad",
    featured: true,
    client: null,
    date: null,
    location: null,
    attendees: null,
    services: ["foto"],
    brief: "",
    approach: "",
    metrics: [],
    quote: null,
    video: null,
  },
];

/**
 * Esettanulmány-OLDAL minden esethez épül: a galéria már önmagában
 * értékes, akkor is, ha a sztori még hiányzik.
 */
export const ALL_CASES = EVENT_CASES;

/**
 * KÁRTYA viszont csak akkor jelenik meg a hubon és a kategóriaoldalakon,
 * ha van érdemi tartalom -- így nem kerül félkész blokk a kirakatba.
 */
export const READY_CASES = EVENT_CASES.filter(
  (c) => c.brief?.trim() && c.approach?.trim()
);

export const FEATURED_CASES = READY_CASES.filter((c) => c.featured);

export const CASE_SLUGS = EVENT_CASES.map((c) => c.slug);

export function getCase(slug) {
  return EVENT_CASES.find((c) => c.slug === slug) ?? null;
}
