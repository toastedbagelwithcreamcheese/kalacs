// constants/legal.js
//
// A jogi oldalak (impresszum, ÁSZF, adatvédelmi tájékoztató) közös
// adatforrása. Egy helyen kell módosítani, és mindhárom oldal követi.
//
// Forrás: Magyar Kereskedelmi és Iparkamara egyenlegközlő, KNYR/781674-1/2026
// (2026.08.18.) — gazdálkodó szervezet neve, székhelye, adószáma, kamarai
// nyilvántartási száma.
//
// A vállalkozás Kovács Szabolcs egyéni vállalkozóé; a fotókat Kovács Bálint
// készíti, és a weboldal az ő nevével mint márkanévvel működik. A jogi
// dokumentumokban ezért a szerződő fél Kovács Szabolcs e.v., a szerzői jogi
// pontokban pedig Kovács Bálint mint a művek szerzője szerepel.

export const szolgaltato = {
  nev: "Kovács Szabolcs e.v.",
  markanev: "Kovács Bálint Fotográfia",
  forma: "egyéni vállalkozó",
  szekhely: "8921 Zalaszentiván, Deák Ferenc utca 3.",
  nyilvantartasiSzam: "ZA66203276",
  nyilvantartasiSzamMegnevezes: "Kamarai nyilvántartási szám",
  adoszam: "66203276-1-40",
  afaStatusz:
    "Alanyi adómentes (AAM). A feltüntetett díjak ÁFA-t nem tartalmaznak, a számla áthárított általános forgalmi adót nem tartalmaz.",
  email: "kapcsolat@kovacsbalintfoto.hu",
  telefon: "+36 30 872 3777",
  weboldal: "kovacsbalintfoto.hu",
  weboldalUrl: "https://kovacsbalintfoto.hu",
  /** A fotókat készítő szerző (Szjt. szerinti szerző). */
  szerzo: "Kovács Bálint",
};

export const tarhelyszolgaltato = {
  nev: "Netlify, Inc.",
  szekhely: "512 2nd Street, Suite 200, San Francisco, CA 94107, Amerikai Egyesült Államok",
  weboldal: "netlify.com",
};

/**
 * A fogyasztói jogviták fóruma. FIGYELEM: a békéltető testületek 2024-től
 * regionális szervezetben működnek — Zala vármegyei lakóhelyű fogyasztók
 * ügyeiben a győri székhelyű testület jár el, de Zalaegerszegen is tart
 * meghallgatásokat.
 */
export const bekeltetoTestulet = {
  nev: "Győr-Moson-Sopron Vármegyei Békéltető Testület",
  cim: "9021 Győr, Szent István út 10/A",
  telefon: "+36 96 520 217",
  email: "bekelteto.testulet@gymsmkik.hu",
  weboldal: "bekeltetesgyor.hu",
  megjegyzes:
    "Zala, Vas és Győr-Moson-Sopron vármegye területén lakó fogyasztók ügyeiben 2024-től ez a testület jár el; személyes meghallgatást Zalaegerszegen is tart.",
};

export const naih = {
  nev: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
  cim: "1055 Budapest, Falk Miksa utca 9-11.",
  postacim: "1363 Budapest, Pf. 9.",
  telefon: "+36 1 391 1400",
  email: "ugyfelszolgalat@naih.hu",
  weboldal: "naih.hu",
};

/** A jogi dokumentumok közös hatálybalépési dátuma. */
export const hatalyosDatum = "2026. szeptember 14.";
