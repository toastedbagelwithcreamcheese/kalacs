// A hat rendezvény-kategória. Ez az adatforrás a nav dropdownhoz, a hub
// kategória-rácsához, a [kategoria] oldalakhoz és a sitemaphoz.
//
// A színek a terv 4.2 pontjából valók -- mindegyik Bálint saját fotóiból
// mintázva. A `soft` csak nagy, nyugodt felületen; a `deep` csak apró
// jelzésen (badge, vonal, ikon), mert csak az éri el a 4,5:1 kontrasztot.
//
// ┌──────────────────────────────────────────────────────────────────┐
// │ FIGYELEM — ÁTNÉZENDŐ                                             │
// │ A `deliverables` darabszámai és határidői, valamint a             │
// │ `priceFrom` értékek JAVASLATOK, nem tények. Ezek üzleti           │
// │ döntések: nézd át, és írd át a sajátjaidra, mielőtt élesedik.     │
// └──────────────────────────────────────────────────────────────────┘
//
// A slug soha nem ütközhet statikus szegmenssel
// (video, csomagok, munkaim, rolam, ajanlatkeres, koszonjuk).

export const EVENT_CATEGORIES = {
  konferencia: {
    slug: "konferencia",
    order: 1,
    title: "Konferencia és céges rendezvény",
    navTitle: "Konferencia & céges",
    tagline: "Előadás, gála, díjátadó, könyvbemutató",
    soft: "#C6CEF7",
    deep: "#3B4BB8",
    galleryDir: "konferencia",
    heroPoster: "/images/rendezveny/hero/konferencia-poster.webp",

    problem:
      "A legtöbb konferenciáról több száz kép marad, amiből egyet sem lehet kirakni: sötét terem, félig lehunyt szemek, üres széksorok a háttérben.",
    solution:
      "Végigdolgozom a napot, de nem mindenből csinálok képet — hanem abból, amit utána tényleg használni fogsz. Előadó a színpadon, a közönség reakciója, a szponzorfal, a kávészünet kötetlen pillanatai, és a csapatod munka közben.",

    deliverables: [
      "Válogatott, retusált képek vízszintes és 9:16 vágásban is",
      "Sajtókész gyorscsomag még a rendezvény napján",
      "Előadókról portré és színpadkép, szponzorfelületekkel",
      "Korlátlan felhasználási jog saját marketingcélra",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Diszkréten tudsz mozogni előadás közben?",
        answer:
          "Igen. Csendes zárral dolgozom, és a terem szélén maradok — a nézők többsége észre sem veszi, hogy ott vagyok.",
      },
      {
        question: "Tudsz még a helyszínen képet adni social médiára?",
        answer:
          "Igen, ez a leggyakoribb kérés. A szünetekben átküldöm a nap legjobb néhány képét, hogy még aznap posztolhassátok.",
      },
      {
        question: "Számlaképes vagy?",
        answer: "", // TODO
      },
    ],
    seo: {
      title: "Konferencia fotós | Céges rendezvény fotózás",
      description:
        "Konferencia, gála, díjátadó és céges rendezvény fotózása. Sajtókész képek még a rendezvény napján, országosan.",
      keywords: [
        "konferencia fotós",
        "céges rendezvény fotózás",
        "gála fotózás",
        "díjátadó fotós",
        "vállalati rendezvény fotós Budapest",
      ],
    },
  },

  egyetemi: {
    slug: "egyetemi",
    order: 2,
    title: "Egyetemi és campus események",
    navTitle: "Egyetemi & campus",
    tagline: "Gólyatábor, duális tábor, ballagás, diplomaosztó",
    soft: "#C2E4D3",
    deep: "#2C7A5B",
    galleryDir: "egyetemi",
    heroPoster: "/images/rendezveny/hero/egyetemi-poster.webp",

    problem:
      "Egyetemi rendezvényen sok ember, kevés idő és szűk keret van — a képeknek pedig másnap kellenek, amikor még él az élmény.",
    solution:
      "Gyorsan és sokat dolgozom: csoportképek, hangulat, a pillanatok, amikre évek múlva is emlékezni fognak. Az anyagot úgy adom át, hogy a résztvevők egyszerűen le tudják tölteni.",

    deliverables: [
      "Bőséges képanyag — az egyetemi eseményeknél a mennyiség is számít",
      "Csoportképek és tablóhoz használható portrék",
      "Résztvevőknek is megosztható, letölthető galéria",
      "Gyors átadás, amíg él az élmény",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Hogyan kapja meg a sok résztvevő a képeket?",
        answer:
          "Online galériát kapsz, amit egy linkkel meg tudsz osztani. Nem kell pendrive-ot és letöltési határidőt szervezni.",
      },
      {
        question: "Van diákbarát ár?",
        answer: "", // TODO
      },
      {
        question: "Több napos táborra is jössz?",
        answer:
          "Igen, gólyatábort és duális tábort is fotóztam már végig, több napon át.",
      },
    ],
    seo: {
      title: "Gólyabál és ballagás fotós | Egyetemi rendezvények",
      description:
        "Gólyatábor, duális tábor, gólyabál, ballagás és diplomaosztó fotózása. Sok kép, gyors átadás, megosztható galéria.",
      keywords: [
        "gólyabál fotós",
        "ballagás fotózás",
        "gólyatábor fotós",
        "diplomaosztó fotós",
        "egyetemi rendezvény fotózás",
      ],
    },
  },

  offroad: {
    slug: "offroad",
    order: 3,
    title: "Offroad és motorsport",
    navTitle: "Offroad & motorsport",
    tagline: "Terepverseny, találkozó, szponzoranyag",
    soft: "#F0DCB6",
    deep: "#96681C",
    galleryDir: "offroad",
    heroPoster: "/images/rendezveny/hero/offroad-poster.webp",

    problem:
      "Terepen az számít, hogy a fotós ott van-e, ahol történik valami. A pályaszél biztonságos, de onnan minden kép ugyanolyan.",
    solution:
      "Kimegyek a nehéz szakaszokra, és onnan fotózok, ahonnan látszik a terep és a gép munkája. A képek úgy készülnek, hogy a szponzor is szívesen kirakja őket.",

    deliverables: [
      "Akciófotók a pálya nehéz szakaszairól",
      "Gépek és csapatok portréi a depóban",
      "Szponzorfelületek tudatosan a képben",
      "Social médiára vágott függőleges változatok",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Hogyan jutsz ki a pálya nehezebb pontjaira?",
        answer: "", // TODO
      },
      {
        question: "Vállalsz szponzori igényeket?",
        answer:
          "Igen. Ha megkapom előre, hogy melyik logónak és melyik gépnek kell hangsúlyt kapnia, arra külön figyelek.",
      },
      {
        question: "Mi van, ha rossz idő van?",
        answer:
          "Terepen az eső általában javítja a képeket. A felszerelésem bírja, én is ott maradok.",
      },
    ],
    seo: {
      title: "Offroad fotós | Terepverseny és motorsport fotózás",
      description:
        "Offroad találkozó, terepverseny és motorsport fotózása. Akciófotók a nehéz szakaszokról, szponzoranyagnak is használható minőségben.",
      keywords: [
        "offroad fotós",
        "terepverseny fotózás",
        "motorsport fotós",
        "autós rendezvény fotózás",
      ],
    },
  },

  sport: {
    slug: "sport",
    order: 4,
    title: "Sportesemények",
    navTitle: "Sport",
    tagline: "Bajnokság, kupa, verseny, csapatfotó",
    soft: "#C2DEF0",
    deep: "#236D95",
    galleryDir: "sport",
    heroPoster: "/images/rendezveny/hero/sport-poster.webp",

    problem:
      "A sportfotó vagy elkapja a pillanatot, vagy nem — utólag nem lehet megjavítani. A legtöbb esemény képanyaga életlen mozdulatokból és üres lelátóból áll.",
    solution:
      "Ismerem a játék ritmusát, ezért ott vagyok, mielőtt megtörténik. A meccs mellett a lelátót, a kispadot és az eredményhirdetést is végigfotózom — abból lesz a sztori.",

    deliverables: [
      "Akciófotók a mérkőzésről vagy versenyről",
      "Csapatfotó és egyéni portrék",
      "Eredményhirdetés, díjátadás",
      "Social médiára vágott függőleges változatok",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Beltéri, gyengén világított csarnokban is vállalod?",
        answer:
          "Igen, erre való a fényerős objektív. Csarnokban is tiszta, zajmentes képet adok.",
      },
      {
        question: "Egész napos tornát is végigfotózol?",
        answer: "Igen, több csoportos, egész napos eseményt is.",
      },
    ],
    seo: {
      title: "Sportfotós | Bajnokság és verseny fotózás",
      description:
        "Sportesemény, bajnokság, kupa és verseny fotózása. Akciófotók, csapatfotó és eredményhirdetés.",
      keywords: [
        "sportfotós",
        "sportesemény fotózás",
        "bajnokság fotós",
        "csapatfotó",
      ],
    },
  },

  kultura: {
    slug: "kultura",
    order: 5,
    title: "Kultúra, koncert, színpad",
    navTitle: "Kultúra & koncert",
    tagline: "Koncert, tánc, előadás, fesztivál",
    soft: "#DFC8EE",
    deep: "#79489C",
    galleryDir: "kultura",
    heroPoster: "/images/rendezveny/hero/kultura-poster.webp",

    problem:
      "A színpadi fény gyorsan és kiszámíthatatlanul változik. Aki nem erre készül, annak a képei vagy sötétek lesznek, vagy kiégnek.",
    solution:
      "A színpadfényhez igazodom, nem küzdök vele: a mozdulat csúcspontját keresem, és azt a pillanatot, amiben benne van az egész előadás hangulata. Vaku nélkül dolgozom, hogy ne zavarjam a fellépőket és a közönséget.",

    deliverables: [
      "Színpadi képek az előadás egészéről",
      "Portrék a fellépőkről",
      "Közönség és hangulat",
      "Plakáthoz és sajtóanyaghoz használható válogatás",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Használsz vakut előadás közben?",
        answer:
          "Nem. Vaku nélkül dolgozom, hogy se a fellépőket, se a nézőket ne zavarjam.",
      },
      {
        question: "Próbán is jelen tudsz lenni?",
        answer:
          "Igen, és sokszor érdemes is — a próbán szabadabban tudok mozogni, így olyan szögekből is készül kép, ami előadás közben nem lehetséges.",
      },
    ],
    seo: {
      title: "Koncert és színpadi fotós | Kulturális események",
      description:
        "Koncert, táncelőadás, színpadi és kulturális esemény fotózása. Vaku nélkül, a színpadfényhez igazodva.",
      keywords: [
        "koncert fotós",
        "táncfotózás",
        "színpadi fotós",
        "fesztivál fotós",
        "előadás fotózás",
      ],
    },
  },

  maganunnep: {
    slug: "maganunnep",
    order: 6,
    title: "Magánünnep és közösségi program",
    navTitle: "Magánünnep",
    tagline: "Szülinap, évforduló, csapatépítő, élményprogram",
    soft: "#F5CDD9",
    deep: "#B24870",
    galleryDir: "maganunnep",
    heroPoster: "/images/rendezveny/hero/maganunnep-poster.webp",

    problem:
      "Egy jó ünnepen senki nem akar pózolni. Ha a fotós jelenléte feszélyez, pont az veszik el, amiért az egészet csináltátok.",
    solution:
      "Csendben dolgozom és hagyom, hogy történjen az esemény. A képek nagy része észrevétlenül készül — utána azon lepődtök meg, mennyi mindent nem is vettetek észre közben.",

    deliverables: [
      "Riportfotók az esemény egészéről",
      "Csoportkép, ha kell",
      "A helyszín és a dekoráció, még érintetlenül",
      "Online galéria, amit a vendégekkel is megoszthatsz",
    ],
    priceFrom: "", // TODO
    faq: [
      {
        question: "Kell-e vaku, zavarni fog?",
        answer:
          "Amíg van elég fény, vaku nélkül dolgozom. Ha muszáj, halkan és visszafogottan használom, nem villogtatok bele az arcokba.",
      },
      {
        question: "Meddig maradsz?",
        answer: "", // TODO
      },
      {
        question: "Csapatépítőre, céges családi napra is jössz?",
        answer:
          "Igen. Ezek jellemzően kötetlenebbek, és pont ezért születnek rajtuk a legjobb képek.",
      },
    ],
    seo: {
      title: "Szülinapi és családi rendezvény fotózás",
      description:
        "Szülinap, évforduló, csapatépítő és közösségi program fotózása. Feszengés nélkül, riportstílusban.",
      keywords: [
        "szülinapi fotózás",
        "évforduló fotós",
        "családi rendezvény fotózás",
        "csapatépítő fotós",
      ],
    },
  },
};

/** Sorrendbe rendezett tömb -- nav, rács, sitemap ezt használja. */
export const EVENT_CATEGORY_LIST = Object.values(EVENT_CATEGORIES).sort(
  (a, b) => a.order - b.order
);

export const EVENT_CATEGORY_SLUGS = EVENT_CATEGORY_LIST.map((c) => c.slug);
