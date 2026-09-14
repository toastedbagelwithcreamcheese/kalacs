// A két mini-fotózás lap adatai. SZÁNDÉKOSAN külön modulban: a szerver-oldali
// layout/page innen építi a FAQPage és Offer strukturált adatot, a kliens-
// komponens pedig ugyanezt rendereli — így a kettő nem csúszhat szét.

export const HUSVET_FAQ = [
  { 
    question: "Mennyi munkával jár ez az óvónőknek?", 
    answer: "Gyakorlatilag semmivel. Mi hozzuk a dekorációt, mi kezeljük a rendeléseket és a fizetést. Az óvónőknek csak a gyerekek bekísérésében kell segíteniük, minden mást mi intézünk." 
  },
  { 
    question: "Hogyan jutnak el a képek a szülőkhöz?", 
    answer: "Minden gyermek kap egy egyedi kódot. Ezzel a szülő belép a weboldalunkra, ahol csak a saját gyermeke képeit látja. Itt tud rendelni és fizetni is." 
  },
  { 
    question: "Milyen hátteret használtok?", 
    answer: "Kerüljük a művi, digitális háttereket. Valódi, prémium minőségű tavaszi kiegészítőkkel (fa elemek, virágok, kosarak) építünk fel egy kis stúdiót a helyszínen." 
  },
  { 
    question: "Biztonságosak az adatok?", 
    answer: "Igen, rendszerünk GDPR kompatibilis. A képek zárt szerveren vannak, és csak az adott kód birtokában tekinthetők meg." 
  },
];

export const KARACSONY_CSOMAGOK = [
  {
    title: "Ünnepi Mini",
    price: "30.000 Ft",
    duration: "25-30 perc fotózás",
    features: [
      "Gondosan berendezett ünnepi díszlet",
      "10 db profi, retusált digitális fotó",
      "Online válogató galéria",
      "Maximum 2 felnőtt + 2 gyermek",
      "Gyors átadási határidő (5 munkanap)",
    ],
    popular: false,
  },
  {
    title: "Családi Karácsony",
    price: "39.000 Ft",
    duration: "50-60 perc fotózás",
    features: [
      "Több háttér/helyszín használata",
      "20 db profi, retusált digitális fotó",
      "Minden további kép: 1.790 Ft/db",
      "Online letölthető galéria",
      "Ajándék: 3 db nyomtatott kép (10x15)",
    ],
    popular: true,
  },
  {
    title: "Prémium Ünnepi Emlék",
    price: "49.000 Ft",
    duration: "90 perc fotózás",
    features: [
      "Korlátlan létszám (közeli hozzátartozók)",
      "35 db profi, retusált digitális fotó",
      "Saját, otthoni helyszín lehetősége",
      "Díszdobozos pendrive az összes képpel",
      "Prémium fotókönyv összeállítása",
    ],
    popular: false,
  },
];
