// Általános GYIK a hub oldalra. A kategória-specifikus kérdések a
// categories.js `faq` mezőjében élnek.
//
// Az üres `answer` mezők SZÁNDÉKOSAN üresek: ezek üzleti tények
// (ár, biztosítás, határidő), amiket neked kell megadnod. A GYIK
// komponens az üres válaszú kérdéseket kihagyja a renderelésből,
// tehát félkész válasz nem kerül ki az oldalra.

export const EVENT_FAQ = [
  {
    question: "Mennyibe kerül egy rendezvény fotózása?",
    answer: "", // TODO
  },
  {
    question: "Mennyi idő alatt kapom meg az anyagot?",
    answer: "", // TODO
  },
  {
    question: "Országosan vállalsz munkát?",
    answer:
      "Igen. Zalaegerszegen és Budapesten dolgozom a leggyakrabban, de az ország egész területére kimegyek.",
  },
  {
    question: "Számlaképes vagy, van felelősségbiztosításod?",
    answer: "", // TODO
  },
  {
    question: "Mi történik, ha elmarad vagy elhalasztódik a rendezvény?",
    answer: "", // TODO
  },
  {
    question: "Kié a képek felhasználási joga?",
    answer: "", // TODO
  },
  {
    question: "Vállalsz több napos rendezvényt?",
    answer:
      "Igen. Több napos tábort és fesztivált is végigfotóztam már, egyben kezelve az egész eseményt.",
  },
  {
    question: "Tudsz még aznap képet adni, hogy posztolhassunk?",
    answer:
      "Igen, ez az egyik leggyakoribb kérés. A szünetekben átküldök egy válogatást, hogy még a rendezvény alatt tudjatok tartalmat kirakni.",
  },
];
