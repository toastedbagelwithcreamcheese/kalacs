// Referencialista — a "sok rendezvény" háromszintű rendszerének 3. szintje
// (terv 3.2). Ez bizonyítja a volument, oldalépítés nélkül.
//
// Ide MINDEN mehet, amit fotóztál — minél hosszabb, annál meggyőzőbb.
// Egy sor felvétele ~30 másodperc.
//
// ┌──────────────────────────────────────────────────────────────────┐
// │ Jelenleg csak az szerepel, amihez képanyag is van. A `year` és a  │
// │ `location` szándékosan null ott, ahol nem tudom — ezeket a mezőket │
// │ a lista csak akkor jeleníti meg, ha ki vannak töltve. Töltsd ki,   │
// │ és vedd fel a többi rendezvényedet is.                            │
// └──────────────────────────────────────────────────────────────────┘

export const EVENT_REFERENCES = [
  {
    name: "LR Health & Beauty rendezvény",
    category: "konferencia",
    year: null,      // TODO
    location: null,  // TODO
  },
  {
    name: "Egyed Viktor Leadership Akadémia és könyvbemutató",
    category: "konferencia",
    year: null,      // TODO
    location: null,  // TODO
  },
  {
    name: "Duális tábor — Pannon Egyetem",
    category: "egyetemi",
    year: null,
    location: null,
  },
  {
    name: "Ballagás",
    category: "egyetemi",
    year: null,
    location: null,
  },
  {
    name: "G-Amboree offroad találkozó",
    category: "offroad",
    year: null,
    location: null,
  },
  {
    name: "Focibajnokság — Pannon Egyetem",
    category: "sport",
    year: null,
    location: null,
  },
  {
    name: "Táncelőadás",
    category: "kultura",
    year: null,
    location: null,
  },
  {
    name: "Főzőverseny — Pannon Egyetem",
    category: "maganunnep",
    year: null,
    location: null,
  },
  {
    name: "Kutyás élményprogram — Pannon Egyetem",
    category: "maganunnep",
    year: null,
    location: null,
  },
];

/**
 * Hány rendezvényt fotóztál összesen? Ez a szám a hub „és még N esemény"
 * sorában jelenik meg. Ha null, a sor nem jelenik meg.
 */
export const TOTAL_EVENTS_BEYOND_LIST = null; // TODO
