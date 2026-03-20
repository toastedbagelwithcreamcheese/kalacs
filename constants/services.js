// constants/services.js

export const SERVICES_DATA = {
  "eskuvo": {
    title: "Esküvői Fotózás",
    slug: "eskuvo",
    heroSubtitle: "Az igenektől az utolsó táncig",
    description: "Életetek nagy napja megérdemli a professzionális figyelmet. Stílusom az elegancia és a természetesség ötvözete, célom pedig az, hogy a képeket nézve újraélhessétek minden pillanatát.",
    heroImage: "/images/_BF_2915.webp", // Placeholder, cseréld le a kedvenc esküvői képedre
    gridClass: "col-span-1 md:col-span-12 lg:col-span-7 row-span-1",
    tags: ["Egész napos", "Jegyesfotózás", "Fine-art retus"],
    gallery: [
      { src: "/images/Eskuvo2026.webp", alt: "Esküvői pillanat" },
      // Ide jöhetnek majd az esküvői galéria képei
    ],
    packages: [
      {
        title: "Standard Esküvő",
        price: "150.000 Ft",
        duration: "8 óra rendelkezésre állás",
        features: ["Készülődés, szertartás, kreatív fotózás", "300+ retusált kép", "Online galéria 6 hónapig", "Ajándék jegyesfotózás"],
        popular: true
      },
      {
        title: "Prémium Esküvő",
        price: "220.000 Ft",
        duration: "Egész napos (12-14 óra)",
        features: ["A teljes nap megörökítése", "500+ retusált kép", "Prémium fotókönyv", "Online galéria 1 évig"],
        popular: false
      }
    ],
    faq: [
      { question: "Mikor kapjuk meg a képeket?", answer: "A válogató galériát 1 héten belül küldöm, a kész, retusált sorozatot pedig 4-6 héten belül adjuk át." },
      { question: "Vállalsz vidékre is kiszállást?", answer: "Természetesen, az ország egész területén, sőt külföldön is szívesen fotózom az esküvőket." }
    ]
  },

  "portre": {
    title: "Portré Fotózás",
    slug: "portre",
    heroSubtitle: "Portrék, amik Rólad szólnak",
    description: "Természetes, stílusos és őszinte képek. Fedezd fel a benned rejlő karaktert. Legyen szó egy gyors, lényegretörő üzleti portréról, vagy egy kreatív, elmélyült sorozatról – a célom, hogy feszengés nélkül megmutassuk a legjobb arcodat.",
    heroImage: "/images/_MG_0315-2.webp",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Stúdió / Szabadtér", "Üzleti portré", "Kreatív"],
    gallery: [
      { src: "/images/_MG_4270festettV5.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8992.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_7542.webp", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/6.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8932.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_4462.webp", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/1_1.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_4486.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8634.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/11.jpeg", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/_MG_2433.jpg", alt: "Felnőtt portré" },
      { src: "/images/_MG_8620.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_7503.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_7266.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_9381.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/3.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_0047.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_9410.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/7.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_0315-2.webp", alt: "Felnőtt portré" }
    ],
    packages: [
      {
        title: "Mini Portré",
        price: "14.900 Ft",
        duration: "30-45 perc",
        features: [
          "10 db retusált kép",
          "Zala megye vagy Budapest", 
          "Online átadás 3 napon belül"
        ],
        popular: false
      },
      {
        title: "Alap Portré",
        price: "19.900 Ft",
        duration: "60 perc",
        features: [
          "15 db retusált kép",
          "Zala megye vagy Budapest", 
          "Online válogató galéria",
        ],
        popular: true
      },
      {
        title: "Prémium Portré",
        price: "24.900 Ft",
        duration: "90-120 perc",
        features: [
          "30 db retusált kép",
          "Több helyszín (Zalaegerszeg + környéke vagy Budapest)", 
          "Elsőbbségi retusálás (3 nap)"
        ],
        popular: false
      }
    ],
    faq: [
      { question: "Milyen ruhákat hozzak?", answer: "Amiben magabiztos vagy! Kerüld az apró mintákat. Hozz 2-3 szettet, szívesen segítek választani a helyszínen." },
      { question: "Szükséges sminkes vagy fodrász?", answer: "Nem kötelező, de sokat dob a képeken. Tudok ajánlani profi szakembert, ha szeretnéd." },
      { question: "Hol fotózunk?", answer: "Szabadtéren (park, város), kávézóban vagy nálad. Teljesen rugalmas vagyok!" },
      { question: "Mikor kapom meg a képeket?", answer: "A nyers válogató galériát 1-2 napon belül küldöm. A retusált képeket a kiválasztástól számított 7-10 napon belül adom át." }
    ]
  },

  "kismama": {
    title: "Kismama Fotózás",
    slug: "kismama",
    heroSubtitle: "Az Anyaság Varázsa",
    description: "Örökítsük meg a várakozás legszebb pillanatait finom, természetes és időtálló fotókon. Feszültségmentes, nyugodt környezetben alkotunk, ahol Te vagy a középpontban, de természetesen a párod és a nagyobb tesók is részesei lehetnek az élménynek.",
    heroImage: "/images/kata_kismama/_47A9158-2.jpg",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Kismama ruhák", "Meghitt", "Páros képek"],
    gallery: [
      { src: "/images/kata_kismama/_47A7843-2.jpeg", alt: "Kismama portré a természetben" },
      { src: "/images/kata_kismama/_47A7885-2.jpg", alt: "Pocak lakója" },
      { src: "/images/kata_kismama/_47A7897-2.jpg", alt: "Boldog várakozás" },
      { src: "/images/kata_kismama/_47A8142-2.jpg", alt: "Anya és a természet" },
      { src: "/images/kata_kismama/_47A8160-2.jpg", alt: "Meghitt pillanatok" },
      { src: "/images/kata_kismama/_47A8248-2.jpg", alt: "Naplemente fényei" },
      { src: "/images/kata_kismama/_47A8279-2.jpg", alt: "Részletfotó" },
      { src: "/images/kata_kismama/_47A8484-2.jpg", alt: "Családi kismama fotózás" },
      { src: "/images/kata_kismama/_47A8666-2.jpg", alt: "Mosoly és boldogság" },
      { src: "/images/kata_kismama/_47A8673-2.jpg", alt: "Természetes beállítás" },
      { src: "/images/kata_kismama/_47A8966-2.jpg", alt: "Elegáns kismama ruha" },
      { src: "/images/kata_kismama/_47A9009-2.jpg", alt: "Várakozás" },
      { src: "/images/kata_kismama/_47A9056-2.jpeg", alt: "Fekete-fehér hangulat" },
      { src: "/images/kata_kismama/_47A9104-2.jpg", alt: "Közeli portré" },
      { src: "/images/kata_kismama/_47A9146-2.jpg", alt: "Anya szemei" },
      { src: "/images/kata_kismama/_47A9158-2.jpg", alt: "Harmónia" },
      { src: "/images/kata_kismama/_47A9191-2.jpg", alt: "Apával közösen" },
      { src: "/images/kata_kismama/_47A9221-2.jpg", alt: "Boldog szülők" }
    ],
    packages: [
      {
        title: "Pocak Varázs",
        price: "19.900 Ft",
        duration: "45-60 perc",
        features: [
          "Előzetes konzultáció a stílusról",
          "15-20 db profi, retusált digitális fotó",
          "Minden további retusált kép: 1.990 Ft",
          "1 választott helyszín (szabadtér/otthon)",
          "Online, jelszóval védett galéria"
        ],
        popular: false
      },
      {
        title: "Családi Álmodozás",
        price: "24.900 Ft",
        duration: "60-90 perc",
        features: [
          "Részletes konzultáció, koncepció",
          "25-30 db profi, retusált digitális fotó",
          "Minden további retusált kép: 1.490 Ft",
          "Akár 2 helyszín a változatosságért",
          "Online galéria válogatáshoz"
        ],
        popular: true
      },
      {
        title: "Örökké Emlék",
        price: "34.900 Ft",
        duration: "90-120 perc",
        features: [
          "35+ db profi minőségű retusált fotó",
          "Rugalmas helyszínválasztás",
          "Ajándék 10 db 10x15-ös papírkép",
          "Prémium online galéria"
        ],
        popular: false
      }
    ],
    faq: [
      { question: "Mikor érdemes a fotózást időzíteni?", answer: "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, látványos, de még nem okoz túl nagy kényelmetlenséget a mozgásban." },
      { question: "Milyen ruhát hozzak?", answer: "Ajánlott világos, pasztell színű (bézs, fehér, földszínek), testhezálló vagy lágy esésű ruhákat választani. Kerüld a nagy feliratokat. Szívesen segítek a ruhák kiválasztásában is!" },
      { question: "Jöhet a párom és a tesó is?", answer: "Természetesen! Sőt, bátorítalak is rá, hiszen ez egy közös családi várakozás. Az 'apás' és közös képek mindig a legmeghatóbbak." },
      { question: "Hogyan kapom meg a képeket?", answer: "A fotózás után 1-2 napon belül küldöm a nyers válogató galériát. A kiválasztott, retusált képeket digitálisan adom át, nagy felbontásban." }
    ]
  },

  "family-sessions": {
    title: "Családi Fotózás",
    slug: "family-sessions",
    heroSubtitle: "Őszinte pillanatok és közös nevetések",
    description: "Felejtsétek el a feszengést és a kötelező mosolygást. Nálam a fotózás közös játék, séta és nevetés. Örökítsük meg a valódi öleléseket és a gyerekek huncut mosolyát egy kötetlen szabadtéri program keretében.",
    heroImage: "/images/_MG_8762.webp",
    gridClass: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    tags: ["Játékos", "Gyerekbarát", "Szabadtéri"],
    gallery: [
      { src: "/images/_MG_8762.webp", alt: "Családi pillanat a réten" },
      { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "Karácsonyi hangulat" },
      { src: "/images/_MG_8653.webp", alt: "Anya és gyermeke" },
      { src: "/images/_MG_0017-2.webp", alt: "Gyerekek játéka" },
      { src: "/images/_MG_4795.webp", alt: "Boldog család" },
      { src: "/images/_MG_1136.webp", alt: "Közös nevetés" },
      { src: "/images/_MG_4805.jpg", alt: "Családi portré" },
      { src: "/images/_MG_0097-2.webp", alt: "Őszinte pillanat" },
      { src: "/images/karacsony_patriek/_47A2095.jpeg", alt: "Karácsonyi családi pillanat" },
      { src: "/images/karacsony_patriek/_47A2157.jpeg", alt: "Meghitt ünnepi hangulat" },
      { src: "/images/karacsony_patriek/_47A2250.jpeg", alt: "Családi ölelés a fa alatt" },
      { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "Boldog karácsonyi mosolyok" },
      { src: "/images/karacsony_patriek/_47A2289.jpeg", alt: "Ünnepi csillogás és nevetés" },
      { src: "/images/karacsony_patriek/_47A2319.jpeg", alt: "Közös karácsonyi emlék" },
      { src: "/images/karacsony_patriek/_47A2351.jpeg", alt: "Varázslatos ünnepi pillanat" },
      { src: "/images/karacsony_patriek/_47A2421.jpeg", alt: "Karácsonyi portré" },
      { src: "/images/karacsony_patriek/_47A2438.jpeg", alt: "Családi fotó a fenyőfa mellett" },
      { src: "/images/karacsony_patriek/_47A2860.jpeg", alt: "Meghitt ünnepi ölelés" },
      { src: "/images/karacsony_patriek/_47A2964.jpeg", alt: "Játékos karácsonyi pillanat" },
      { src: "/images/karacsony_patriek/_47A3036.jpeg", alt: "Szeretetteljes ünnepi hangulat" }
    ],
    packages: [
      {
        title: "Mini Családi Kaland",
        price: "19.900 Ft",
        duration: "kb. 1 óra",
        features: [
          "Ideális kisebb családoknak",
          "20-25 db profi, retusált digitális fotó",
          "1 választott szabadtéri helyszín",
          "Játékos, spontán pillanatok megörökítése",
          "Online, jelszóval védett válogató galéria"
        ],
        popular: false
      },
      {
        title: "Nagy Családi Élmény",
        price: "24.900 Ft",
        duration: "kb. 90 perc",
        features: [
          "Előzetes konzultáció, közös ötletelés",
          "30-35 db profi, művészi retusálású fotó",
          "Akár 2 helyszín a változatosságért",
          "Online, jelszóval védett válogató galéria"
        ],
        popular: true
      },
      {
        title: "Prémium Generációk",
        price: "34.900 Ft",
        duration: "kb. 120 perc",
        features: [
          "Tökéletes választás nagyszülőkkel is",
          "Kb 50 db prémium minőségű retusált fotó",
          "Kényelmes, ráérős tempó, mindenkire figyelve",
          "Ajándék 10x15-ös prémium fotónyomat (10 db)",
          "Prémium online galéria"
        ],
        popular: false
      }
    ],
    faq: [
      { question: "Mit vegyünk fel a fotózásra?", answer: "A legfontosabb a kényelem! Válasszatok egymással harmonizáló, de nem teljesen egyforma ruhákat. A pasztell és földszínek (bézs, barna, fehér, mustár) mindig jól működnek a képeimen. Kerüljük a nagy feliratokat." },
      { question: "Mi történik, ha a gyerekek nyűgösek?", answer: "Semmi gond! A fotózás nálam játék. Tapasztalatból tudom, hogyan tereljük el a figyelmüket. A hiszti utáni nevetésekből születnek sokszor a legjobb képek." },
      { question: "Hol legyen a fotózás?", answer: "Zalaegerszeg környékén a természetben (erdő, mező), ahol a gyerekek szabadon szaladgálhatnak. De szívesen megyek a saját kertetekbe is." },
      { question: "Hozhatjuk a kutyánkat is?", answer: "Természetesen! A háziállatok a család teljes jogú tagjai, imádom, ha ők is rajta vannak a képeken." }
    ]
  },

  "autok": {
    title: "Autó Fotózás",
    slug: "autok",
    heroSubtitle: "Design, erő és szenvedély négy keréken",
    description: "Minden autó egyedi karakter, egy saját történet. Benzinvérűként pontosan tudom, milyen szögek és fények kellenek ahhoz, hogy a végeredmény egy prospektusba illő mestermű legyen. Legyen szó eladásról, a hobbidról, vagy egy különleges projekt autóról.",
    heroImage: "/images/audi_tel-1198.webp",
    gridClass: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    tags: ["Rolling shots", "Részletfotók", "Night shots"],
    gallery: [
      { src: "/images/audi_tel-1198.webp", alt: "Audi téli hangulat" },
      { src: "/images/_MG_0045.webp", alt: "Autó részletfotó" },
      { src: "/images/_MG_6310.webp", alt: "Dinamikus autós kép" },
      { src: "/images/_MG_0094.webp", alt: "Autó belső tér" },
      { src: "/images/_MG_6506.webp", alt: "Kreatív beállítás" },
      { src: "/images/_MG_0031.webp", alt: "Motorháztető részlet" },
      { src: "/images/_MG_6508.webp", alt: "Hangulatos autós portré" },
      { src: "/images/_MG_7633.webp", alt: "Esti fények" },
      { src: "/images/_MG_0019.webp", alt: "Sportos megjelenés" },
      { src: "/images/_MG_6519.webp", alt: "Klasszikus vonalak" },
      { src: "/images/Rendszamnelkul-7580.jpg", alt: "Rendszám nélküli esztétika" },
      { src: "/images/_MG_6531.webp", alt: "Természetközeli autós fotó" },
      { src: "/images/_MG_6330_2.webp", alt: "Naplemente" },
      { src: "/images/_MG_0003.webp", alt: "Front nézet" },
      { src: "/images/audi_tel--5.webp", alt: "Téli táj" },
      { src: "/images/_MG_6525.webp", alt: "Oldalnézet" }
    ],
    packages: [
      {
        title: "Egyedi Képvásárlás",
        price: "1.990 Ft",
        duration: "Képalkuvó",
        features: [
          "Ideális, ha csak pár tökéletes kép hiányzik",
          "Ár / retusált digitális kép",
          "A fotózás időtartama a mennyiséghez igazodik",
          "Akár eladáshoz, akár social médiába",
          "Kérj egyedi ajánlatot a részletekért"
        ],
        popular: false
      },
      {
        title: "Alap Autófotó",
        price: "14.900 Ft",
        duration: "kb. 45 perc",
        features: [
          "10-15 db profi, retusált digitális kép",
          "Minden további választott kép: 1.790 Ft/db",
          "1 egyeztetett, az autó karakteréhez illő helyszín",
          "Fókuszban az autó külső vonalai és részletei",
          "Online, jelszóval védett válogató galéria"
        ],
        popular: true
      },
      {
        title: "Bővített Autófotó",
        price: "24.900 Ft",
        duration: "75-90 perc",
        features: [
          "15-20 db profi, retusált digitális kép",
          "Minden további választott kép: 1.590 Ft/db (kedvezményes)",
          "Akár 2 helyszín a maximális változatosságért",
          "Kreatív beállítások az autóval és a tulajdonossal",
          "Részletes koncepció kialakítása"
        ],
        popular: false
      }
    ],
    faq: [
      { question: "Milyen típusú autókat fotózol?", answer: "Bármilyen autót szívesen fotózok, legyen az sportautó, veterán, tuningolt építés, vagy akár egy hétköznapi, de számodra kedves autó." },
      { question: "Lehet-e éjszakai vagy mozgás közbeni (rolling) fotókat kérni?", answer: "Természetesen lehetséges! Ez viszont több előzetes egyeztetést igényel (pl. utcai mozgóképeknél szükség lesz egy kísérő autóra, amit te biztosítasz vagy külön egyeztetünk)." },
      { question: "Milyen időjárási körülmények ideálisak?", answer: "A legjobb fényviszonyokat naplementekor (golden hour) vagy felhős, borús időben lehet elérni. Esős időben is brutálisan jó, drámai hangulatú képeket lehet készíteni!" },
      { question: "Hol történik a fotózás?", answer: "Kültéren, vagy akár egy előre egyeztetett, különleges ipari/városi helyszínen, amely tökéletesen illik az autó stílusához." }
    ]
  },

  "kutyusok": {
    title: "Kutyafotózás",
    slug: "kutyusok",
    heroSubtitle: "Négylábú kedvencek, őszinte pillanatok",
    description: "Örökítsd meg kutyusod legboldogabb, legőszintébb pillanatait! A természetes fények és a szabadtéri környezet adják a legjobb hátteret az önfeledt játékhoz. Nem sietünk: hagyjuk, hogy a kutyus felfedezzen, játsszon, és közben készülnek a legszebb portrék, akciófotók és persze a közös képek a gazdival.",
    heroImage: "/images/_MG_5347.webp",
    gridClass: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    tags: ["Természetes", "Akciófotók", "Gazdival közös"],
    gallery: [
      { src: "/images/_MG_5347.webp", alt: "Játék a parkban" },
      { src: "/images/_MG_5324.webp", alt: "Kutyus portré" },
      { src: "/images/_MG_5351.webp", alt: "Gazdival közösen" }
      // Ide jöhetnek majd az új kutyás képeid!
    ],
    packages: [
      {
        title: "Pajkos Portrék",
        price: "9.900 Ft",
        duration: "kb. 30 perc",
        features: [
          "Személyes konzultáció",
          "10-15 db profi, retusált digitális fotó",
          "Minden további retusált kép: 1.990 Ft",
          "1 választott helyszín (pl. park)",
          "Kutyus és gazdi közös képei is"
        ],
        popular: false
      },
      {
        title: "Kalandra Fel!",
        price: "19.900 Ft",
        duration: "60-90 perc",
        features: [
          "25 db profi, retusált digitális fotó",
          "Minden további retusált kép: 1.790 Ft",
          "Akár 2 helyszín a változatosságért",
          "Akciófotók, portrék, közös képek"
        ],
        popular: true
      }
    ],
    faq: [
      { question: "Hogyan készüljünk fel a fotózásra?", answer: "Érdemes a kutyust előtte megsétáltatni, hogy energikus, de ne 'túlpörgött' legyen. Hozz jutalomfalatot, vizet és a kedvenc játékát! Az alap vezényszavak (ül, marad) segítenek, de türelemmel mindent megoldunk nélkülük is." },
      { question: "A kutyám nagyon energikus vagy épp túl félénk...", answer: "Imádom a kihívásokat! Minden kutyus egyedi. Ha energikus, brutál jó akciófotókat készítünk róla, ahogy szalad; ha félénk, türelmesen, távolabbról kezdjük. A lényeg, hogy számára is egy pozitív játék legyen az egész." },
      { question: "Hozhatok több kutyát is?", answer: "Természetesen! Ha több kutyussal érkeznél, kérlek jelezd előre. Több négylábú esetén a hosszabb, 'Kalandra Fel!' csomagot javaslom, hogy mindenkire kellő idő jusson." },
      { question: "Milyen helyszíneken fotózunk?", answer: "Zalaegerszeg és környéke tele van csodás helyekkel: erdő, mező, tópart, vagy akár a saját kertetek. A legfontosabb szempont, hogy a kutyus biztonságban érezze magát." }
    ]
  },
};