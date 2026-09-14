// A Google Cégprofil nyilvános értékelései, szó szerint.
//
// MIÉRT KÉZI PILLANATKÉP ÉS NEM ÉLŐ LEKÉRÉS:
// a Google a véleményeket csak a Places API-n át adja ki, ahhoz pedig saját
// Cloud-projekt kell bekapcsolt számlázással. Amíg az nincs, ez a modul a
// forrás. A szerkezete SZÁNDÉKOSAN olyan, amilyet az API is ad, hogy a
// komponensek átírása nélkül lehessen élő lekérésre cserélni.
//
// FRISSÍTÉS: ha új értékelés érkezik, ide kell felvenni, és az OSSZEGZES
// számait is át kell írni. A profil:
// https://maps.google.com/?cid=2686351091748372696
//
// A szövegeket NEM szerkesztjük át — az értékelő szavai maradnak, csak a
// Google felületének záró „…" jelét hagytuk el a végükről.

export const GOOGLE_PROFIL_URL = "https://maps.google.com/?cid=2686351091748372696";

/** A pillanatkép készítésének napja — ebből látszik, mennyire friss. */
export const OSSZEGZES = {
  atlag: 5.0,
  darab: 4,
  rogzitve: "2026-09-14",
};

export const GOOGLE_VELEMENYEK = [
  {
    nev: "Annamaria",
    ertekeles: 5,
    szoveg:
      "Közös munka nagyon rugalmasan sikerült. Percíz és türelmes. Tökéletes képek születtek és mellé jól éreztem magamat. Csak ajánlani tudom, de tényleg!",
  },
  {
    nev: "Flóra Molnár",
    ertekeles: 5,
    szoveg:
      "Rendkívül profi és kreatív fotós. Figyel a részletekre, jó hangulatot teremt, és pontosan érti, mit szeretne az ügyfél . A képek, videók minősége kiváló! Csak ajánlani tudom🫶",
  },
  {
    nev: "biborka orsos",
    ertekeles: 5,
    szoveg:
      "Rendes, aranyos és nagyon türelmes. Segít a pózolásban és még a képek is szuperek lettek! Csak ajánlani tudom.",
  },
  // A negyedik értékelés csillagot adott, szöveget nem — ezért nincs kártyája,
  // de az összegzés négyet számol.
];
