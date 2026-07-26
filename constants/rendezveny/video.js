// A /rendezveny/video oldal tartalma.
//
// ┌──────────────────────────────────────────────────────────────────┐
// │ A `youtubeId` mezők ÜRESEK.                                      │
// │ Amint feltöltötted a videókat YouTube-ra „nem listázott"          │
// │ (unlisted) módban, csak az azonosítót kell ide beírni:            │
// │                                                                   │
// │   https://youtu.be/dQw4w9WgXcQ  →  youtubeId: "dQw4w9WgXcQ"       │
// │                                                                   │
// │ Amíg üres, az adott videóblokk NEM jelenik meg — nincs törött     │
// │ lejátszó és nincs „hamarosan" felirat az oldalon.                 │
// └──────────────────────────────────────────────────────────────────┘
//
// A `posterFrom` egy meglévő rendezvényes kép útvonala: ez lesz a
// facade poszterképe, amíg a látogató rá nem kattint.

export const SHOWREEL = {
  youtubeId: "", // TODO
  title: "Showreel",
  posterFrom: "/images/rendezveny/offroad/offroad-42a5573.webp",
};

export const VIDEO_PRODUCTS = [
  {
    key: "aftermovie",
    label: "Aftermovie",
    color: "#79489C",
    headline: "A rendezvényed 90 másodpercben",
    body: "Egy jó aftermovie többet mond a rendezvényedről, mint száz kép. Ez az az anyag, amit a következő évi meghívóhoz, a szponzoroknak és a socialra egyaránt használni fogsz.",
    includes: [
      "60–90 másodperces vágott film",
      "Helyszíni hang és zene",
      "Vízszintes és 9:16 változat",
      "Feliratozás, ha kell",
    ],
    priceFrom: "", // TODO
    youtubeId: "", // TODO
    posterFrom: "/images/rendezveny/egyetemi/dualis-tabor-42a9809.webp",
  },
  {
    key: "social",
    label: "Social csomag",
    color: "#B24870",
    headline: "Tíz reels a rendezvényről, 72 órán belül",
    body: "Nem egy nagy videó, hanem sok kicsi — pont az, amit a közösségi felületek esznek. Függőleges formátum, gyors vágás, feliratozva.",
    includes: [
      "8–12 db függőleges rövidvideó",
      "Feliratozás (hang nélkül is nézhető)",
      "Trendkövető vágás és ritmus",
      "Gyors átadás, amíg aktuális",
    ],
    priceFrom: "", // TODO
    youtubeId: "", // TODO
    posterFrom: "/images/rendezveny/maganunnep/fozes-bf-8321.webp",
  },
  {
    key: "eloadas",
    label: "Előadásrögzítés",
    color: "#3B4BB8",
    headline: "A teljes előadás, használható minőségben",
    body: "Ha az elhangzott tartalmat később is fel akarod használni — oktatóanyagnak, tagoknak, felvételnek —, akkor a teljes előadást rögzítjük, tiszta hanggal.",
    includes: [
      "Teljes előadás vágva",
      "Külön mikrofonos hang, nem kameráról",
      "Prezentáció bevágása, ha van",
      "Fejezetpontok a hosszú anyaghoz",
    ],
    priceFrom: "", // TODO
    youtubeId: "", // TODO
    posterFrom: "/images/rendezveny/konferencia/egyed-viktor-42a9415-2.webp",
  },
];

// --- VSL: külön termék, nem rendezvényhez kötött ---
export const VSL = {
  eyebrow: "VSL",
  headline: "Értékesítő videó, ami tényleg elad",
  intro:
    "A VSL (Video Sales Letter) egy célzottan értékesítésre épített videó: nem bemutatkozik, hanem végigvezet egy gondolatmeneten a problémától a döntésig. Szolgáltatóknak, oktatóknak és ügynökségeknek készítem.",
  audience: [
    "Szolgáltatók, akik magasabb árú csomagot értékesítenek",
    "Oktatók, coachok, akiknek kurzusa vagy programja van",
    "Ügynökségek, akik hideg forgalmat konvertálnak",
  ],
  process: [
    { title: "Kutatás", body: "Kire lövünk, mi a fájdalma, mi tartja vissza a döntéstől." },
    { title: "Szkript", body: "A teljes szöveg megírása — ez dönti el a videó sikerét, nem a képi világ." },
    { title: "Forgatás", body: "Stúdióban vagy helyszínen, prompterrel, hogy ne kelljen bemagolni." },
    { title: "Vágás", body: "Ritmus, b-roll, hangkeverés." },
    { title: "Motion", body: "Feliratok, kiemelések, grafikus magyarázók." },
    { title: "Változatok", body: "Több nyitókép (hook) A/B tesztre és rövid vágások hirdetéshez." },
  ],
  deliverables: [
    "1 fő videó, teljes hosszban",
    "3 különböző hook (nyitójelenet) teszteléshez",
    "5 rövid vágás hirdetéshez és socialra",
    "Feliratozás és thumbnail",
  ],
  priceFrom: "", // TODO
  youtubeId: "", // TODO
  posterFrom: "/images/rendezveny/konferencia/egyed-viktor-42a9058.webp",
};

export const VIDEO_FAQ = [
  {
    question: "Mennyi idő alatt készül el egy aftermovie?",
    answer: "", // TODO
  },
  {
    question: "Kell külön hangtechnikus az előadásrögzítéshez?",
    answer:
      "Nem. A hangot a helyszíni keverőről vagy saját mikrofonnal veszem — a kamera beépített mikrofonja soha nem elég egy használható felvételhez.",
  },
  {
    question: "Tudsz fotózni és videózni is ugyanazon a rendezvényen?",
    answer:
      "Nagyobb rendezvényen nem egyedül dolgozom: a fotó és a videó két külön feladat, mindkettőre kell ember. Kisebb eseményen egyben is megoldható, ezt az egyeztetésnél tisztázzuk.",
  },
  {
    question: "A VSL-hez kell szöveget írnom?",
    answer:
      "Nem, a szkript az én dolgom. Neked a szakmai tudásod kell — egy beszélgetésből kiszedem, amire szükség van, és abból írom meg a szöveget.",
  },
];
