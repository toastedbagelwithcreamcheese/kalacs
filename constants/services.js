// constants/services.js

export const SERVICES_DATA = {
  
  // --- Az esküvőt a saját egyedi oldala kezeli, ide csak a globális adatok kellenek ---
  "eskuvo": {
    title: "Esküvői Fotózás",
    slug: "eskuvo",
    heroSubtitle: "Az igenektől az utolsó táncig",
    description: "Életetek nagy napja megérdemli a professzionális figyelmet. Stílusom az elegancia és a természetesség ötvözete, célom pedig az, hogy a képeket nézve újraélhessétek minden pillanatát.",
    heroImage: "/images/_BF_2915.webp", 
    gridClass: "col-span-1 md:col-span-12 lg:col-span-7 row-span-1",
    tags: ["Egész napos", "Jegyesfotózás", "Fine-art retus"],
    gallery: [] // Nem használjuk a dinamikus oldalhoz
  },

  "portre": {
    title: "Portré Fotózás",
    slug: "portre",
    heroSubtitle: "Portrék, amik Rólad szólnak",
    description: "Természetes, stílusos és őszinte képek. Fedezd fel a benned rejlő karaktert. Legyen szó egy gyors, lényegretörő üzleti portréról, vagy egy kreatív, elmélyült sorozatról – a célom, hogy feszengés nélkül megmutassuk a legjobb arcodat.",
    heroImage: "/images/_BF_0185_hero.webp",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Stúdió / Szabadtér", "Üzleti portré", "Kreatív"],
    gallery: [
      // Adriai nyaralás - Tengerparti portrék
      { src: "/images/portre/_42A1096.webp", alt: "Nyaralós portré a tengerparti sziklákon" },
      { src: "/images/portre/_42A2167.webp", alt: "Naplementés hintázós portré a tengerparti strandon" },
      { src: "/images/portre/_42A2591.webp", alt: "Fekete-fehér portré a sziklákon, hosszú expozíciós tengerrel" },
      { src: "/images/portre/_42A2900.webp", alt: "Naplementés parti fotó a tengerparti sziklákon" },
      { src: "/images/portre/_42A3880.webp", alt: "Fehér ruhás portré a tengerre néző pavilon boltíve alatt" },

      // Éjszakai városi sorozat
      { src: "/images/portre/_42A5667.webp", alt: "Esti utcai portré fehér szettben" },
      { src: "/images/portre/_42A5704.webp", alt: "Kreatív esti portré meleg fényekkel és mozgáselmosódással" },
      { src: "/images/portre/_42A5787.webp", alt: "Szimmetrikus, minimalista portré a fehér lépcsősor perspektívájában" },
      { src: "/images/portre/_42A5832.webp", alt: "Éjszakai portré teliholddal a háttérben" },
      { src: "/images/portre/_42A5880.webp", alt: "Esti séta a kivilágított sétányon" },
      { src: "/images/portre/_42A5908-2.webp", alt: "Fekete-fehér portré a város éjszakai fényei felett" },
      { src: "/images/portre/_42A5910.webp", alt: "Vidám portré a város esti fényeinek panorámájával" },
      { src: "/images/portre/_42A5934.webp", alt: "Fekete-fehér éjszakai portré a korlátnál" },
      { src: "/images/portre/_42A5952-2.webp", alt: "Éjszakai portré a hold és a városi fények alatt" },
      { src: "/images/portre/_42A6811.webp", alt: "Elegáns esti portré bordó ruhában" },
      { src: "/images/portre/_42A6948.webp", alt: "Kreatív portré egy utcai domború tükör tükröződésében" },
      { src: "/images/portre/_42A7071-2.webp", alt: "Éjszakai utcai portré elmosódott lámpafényekkel" },
      { src: "/images/portre/_42A7077-3.webp", alt: "Fekete-fehér portré az út közepén, lámpasor perspektívájával" },
      { src: "/images/portre/_42A7077.webp", alt: "Éjszakai portré az út közepén, a városi lámpák fényében" },
      { src: "/images/portre/_42A7095.webp", alt: "Laza fekete-fehér utcai portré napszemüvegben" },

      // Stúdiós, minimál enteriőrös sorozat
      { src: "/images/portre/_42A8195.webp", alt: "Portré világos, minimál stúdiós enteriőrben" },
      { src: "/images/portre/_42A8253.webp", alt: "Stúdiós divatportré növényes díszlettel" },
      { src: "/images/portre/_42A8458.webp", alt: "Természetes fényű portré világos stúdióháttér előtt" },
      { src: "/images/portre/_42A8494.webp", alt: "Minimalista egészalakos portré fehér téglafal előtt" },
      { src: "/images/portre/_42A8687.webp", alt: "Portré a nagy ablak természetes fényében" },

      // Városi lifestyle sorozat
      { src: "/images/portre/_BF_0142.webp", alt: "Városi divatportré árnyékos utcarészleten" },
      { src: "/images/portre/_BF_0318.webp", alt: "Elegáns városi portré csipke felsőben" },
      { src: "/images/portre/_BF_0408.webp", alt: "Ellenfényes portré egy városi átjáróban" },
      { src: "/images/portre/_BF_0441.webp", alt: "Napsütötte lifestyle portré a sétálóutcán" },
      { src: "/images/portre/_BF_0529.webp", alt: "Mozgás közben készült portré a belvárosi téren" },
      { src: "/images/portre/_BF_0530.webp", alt: "Városi séta közben elkapott portré" },
      { src: "/images/portre/_BF_0635-ret.webp", alt: "Kávézós portré, játékos napszemüveges pillanat" },
      { src: "/images/portre/_BF_0655.webp", alt: "Hangulatos portré a kávézó kirakata előtt" },
      { src: "/images/portre/_BF_0674.webp", alt: "Városi portré itallal a kezében, esti fényben" },
      { src: "/images/portre/_BF_0899.webp", alt: "Életkép a vidámparkban, mozgalmas háttérrel" },
      { src: "/images/portre/_BF_0994-2.webp", alt: "Lifestyle portré a vidámpark színes forgatagában" },
      { src: "/images/portre/_BF_1249.webp", alt: "Laza, utcai stílusú portré a vidámparkban" },
      { src: "/images/portre/_BF_1310.webp", alt: "Páros portré stúdiós, klubhangulatú díszletben" },

      // Tavaszi, természetes fényű portrék
      { src: "/images/portre/_BF_8904.webp", alt: "Tavaszi portré napfényes lombok között" },
      { src: "/images/portre/_BF_8931.webp", alt: "Természetes fényű tavaszi portré farmerdzsekiben" },
      { src: "/images/portre/_BF_8946.webp", alt: "Közeli tavaszi portré lágy, természetes fényben" },
      { src: "/images/portre/_BF_9108.webp", alt: "Portré a park fái között, tavaszi hangulatban" },
      { src: "/images/portre/_BF_9126.webp", alt: "Egészalakos portré a napsütötte parkban" },

      // Keszthelyi móló - Esti képek (.JPEG)
      { src: "/images/_BF_0299.webp", alt: "Művészi esti portré a keszthelyi móló kivilágított korlátjánál" },
      { src: "/images/_BF_0300.webp", alt: "Hangulatos éjszakai fotó a Balaton-parton, sejtelmes fényekkel" },
      { src: "/images/_BF_0306.webp", alt: "Közeli portré fotó esti fényben a móló végénél" },
      { src: "/images/anna_varosliget/_47A7016.webp", alt: "Kreatív portré" },
      { src: "/images/_BF_7627.webp", alt: "Természetes fényekkel készült fotó a virágzó mezőn" },
      { src: "/images/anna_varosliget/_47A7180.webp", alt: "Kreatív portré" },
      // Tulipánmező - Tavaszi portrék (.JPEG)
      { src: "/images/_BF_9914.webp", alt: "Tavaszi portré fotózás színes tulipánmező közepén" },
      { src: "/images/_BF_9914-2.webp", alt: "Művészi távlati kép a virágzó tulipánok között" },
      { src: "/images/_BF_0167.webp", alt: "Életkép a tulipánszüret idején készült tavaszi fotózásról" },
      { src: "/images/_BF_0167-2.webp", alt: "Vidám női portré a végtelen tulipánsorok között" },
      { src: "/images/_BF_0180.webp", alt: "Természetes fényekkel készült fotó a virágzó mezőn" },
      { src: "/images/_BF_7636.webp", alt: "Természetes fényekkel készült fotó a virágzó mezőn" },
      { src: "/images/_BF_0180-2.webp", alt: "Romantikus hangulatú közeli portré a tulipánok ölelésében" },
      { src: "/images/_BF_0185.webp", alt: "Napsütötte tavaszi portré a színes virágoskertben" },
      { src: "/images/_BF_7632.webp", alt: "Természetes fényekkel készült fotó a virágzó mezőn" },
      { src: "/images/_BF_0185-2.webp", alt: "Kreatív kompozíció a tulipánmezőn készült fotósorozatból" },
      { src: "/images/_BF_0190.webp", alt: "Profi kültéri portré a tavaszi virágzás idején" },
      { src: "/images/_BF_0195.webp", alt: "Érzelmes pillanat a tulipánok között, lágy tónusokkal" },
      { src: "/images/_MG_4270festettV5.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8992.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_7542.webp", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/6.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8932.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_4462.webp", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/1_1.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_4486.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8634.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/11.webp", alt: "Felnőtt portré" },
      { src: "/images/Virag_BP/_MG_2433.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_8620.webp", alt: "Gyermek portré" },
      { src: "/images/_MG_7266.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_9381.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/3.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_0047.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_9410.webp", alt: "Gyermek portré" },
      { src: "/images/Virag_BP/7.webp", alt: "Felnőtt portré" },
      { src: "/images/_MG_0315-2.webp", alt: "Felnőtt portré" }
    ],
    startingPrice: "30.000 Ft",
    baseFeatures: [
      "1 óra rendelkezésre állás (Zala megye vagy Budapest)",
      "Előzetes konzultáció, koncepciótervezés",
      "15 db finoman retusált, nagy felbontású digitális kép",
      "Online, jelszavas válogató galéria",
      "Többszöri átöltözési lehetőség"
    ],
    extras: [
      { name: "Extra retusált kép", price: "1.500 Ft / db" },
      { name: "Műterem / Stúdió bérlése", price: "Stúdiófüggő (kb. 6-10.000 Ft/óra)" },
      { name: "Gyorsított átadás (3 napon belül)", price: "10.000 Ft" },
      { name: "Professzionális Sminkes / Fodrász", price: "Kérésre egyeztetve" }
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
    heroImage: "/images/kata_kismama/_47A9158-2.webp",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Kismama ruhák", "Meghitt", "Páros képek"],
    gallery: [
      // Babavárás bejelentő fotózás
      { src: "/images/baba_reveal/_BF_2013.webp", alt: "Babavárás bejelentés: babacipő és ultrahangkép a leendő apuka vállán" },
      { src: "/images/baba_reveal/_BF_2053.webp", alt: "DAD és MOM feliratú sapkák az ultrahangképpel a leendő szülők kezében" },
      { src: "/images/baba_reveal/_BF_2096.webp", alt: "Babavárás bejelentés kellékei: sapkák, babacipő és ultrahangkép" },
      { src: "/images/baba_reveal/_BF_2122.webp", alt: "Leendő apuka DAD feliratú sapkában, babacipővel a vállán" },

      { src: "/images/kata_kismama/_47A7843-2.webp", alt: "Kismama portré a természetben" },
      { src: "/images/kata_kismama/_47A7885-2.webp", alt: "Pocak lakója" },
      { src: "/images/kata_kismama/_47A7897-2.webp", alt: "Boldog várakozás" },
      { src: "/images/kata_kismama/_47A8142-2.webp", alt: "Anya és a természet" },
      { src: "/images/kata_kismama/_47A8160-2.webp", alt: "Meghitt pillanatok" },
      { src: "/images/kata_kismama/_47A8248-2.webp", alt: "Naplemente fényei" },
      { src: "/images/kata_kismama/_47A8279-2.webp", alt: "Részletfotó" },
      { src: "/images/kata_kismama/_47A8484-2.webp", alt: "Családi kismama fotózás" },
      { src: "/images/kata_kismama/_47A8666-2.webp", alt: "Mosoly és boldogság" },
      { src: "/images/kata_kismama/_47A8673-2.webp", alt: "Természetes beállítás" },
      { src: "/images/kata_kismama/_47A8966-2.webp", alt: "Elegáns kismama ruha" },
      { src: "/images/kata_kismama/_47A9009-2.webp", alt: "Várakozás" },
      { src: "/images/kata_kismama/_47A9056-2.webp", alt: "Fekete-fehér hangulat" },
      { src: "/images/kata_kismama/_47A9104-2.webp", alt: "Közeli portré" },
      { src: "/images/kata_kismama/_47A9146-2.webp", alt: "Anya szemei" },
      { src: "/images/kata_kismama/_47A9158-2.webp", alt: "Harmónia" },
      { src: "/images/kata_kismama/_47A9191-2.webp", alt: "Apával közösen" },
      { src: "/images/kata_kismama/_47A9221-2.webp", alt: "Boldog szülők" }
    ],
    startingPrice: "30.000 Ft",
    baseFeatures: [
      "kb. 1-1.5 óra fotózás szabadtéren vagy az otthonotokban",
      "Páros, családi és egyéni kismama fotók vegyesen",
      "25 db finoman retusált, nagy felbontású digitális kép",
      "Kényelmes, feszengésmentes légkör",
      "Online, jelszavas galéria a válogatáshoz"
    ],
    extras: [
      { name: "Extra retusált kép", price: "1.500 Ft / db" },
      { name: "Bérelt napfény-stúdió (pl. tejesfürdős fotózáshoz)", price: "Kérésre egyeztetve" },
      { name: "Prémium Kismama ruha bérlése", price: "5.000 Ft-tól" },
      { name: "Prémium Papírképek (10x15)", price: "400 Ft / db" }
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
    heroImage: "/images/_BF_8065.webp",
    gridClass: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    tags: ["Játékos", "Gyerekbarát", "Szabadtéri"],
    gallery: [
      { src: "/images/_BF_8173.webp", alt: "Nagycsaládi csoportkép a keszthelyi Festetics-kastély parkjában" },
      { src: "/images/_BF_8479.webp", alt: "Meghitt pillanat a szülők között a kastélykert fái alatt" },
      { src: "/images/_BF_8065.webp", alt: "Vidám gyermekportré a kastélypark zöld gyepén" },
      { src: "/images/_BF_8791.webp", alt: "Kisgyermek önfeledt játéka a Festetics-kastély udvarán" },
      { src: "/images/_BF_9706.webp", alt: "Érzelmes ölelés és családi szeretet a fotózás közben" },
      { src: "/images/_BF_9604.webp", alt: "Az egész család a Festetics-kastély impozáns épülete előtt" },
      { src: "/images/_BF_8606.webp", alt: "Séta a napsütötte réten a nagyszülőkkel és az unokákkal" },
      { src: "/images/_BF_9511.webp", alt: "A nagymama és unokája közötti különleges, szeretteljes pillanat" },
      { src: "/images/_BF_9139.webp", alt: "Bohókás gyermekkép a kastélykert színes virágai között" },
      { src: "/images/_BF_8266.webp", alt: "Profi családi fotózás Keszthelyen a történelmi parkban" },
      { src: "/images/_MG_8762.webp", alt: "Családi pillanat a réten" },
      { src: "/images/karacsony_patriek/_47A2262.webp", alt: "Karácsonyi hangulat" },
      { src: "/images/_MG_8653.webp", alt: "Anya és gyermeke" },
      { src: "/images/_MG_0017-2.webp", alt: "Gyerekek játéka" },
      { src: "/images/_MG_4795.webp", alt: "Boldog család" },
      { src: "/images/_MG_1136.webp", alt: "Közös nevetés" },
      { src: "/images/_MG_4805.webp", alt: "Családi portré" },
      { src: "/images/_MG_0097-2.webp", alt: "Őszinte pillanat" },
      { src: "/images/karacsony_patriek/_47A2095.webp", alt: "Karácsonyi családi pillanat" },
      { src: "/images/karacsony_patriek/_47A2157.webp", alt: "Meghitt ünnepi hangulat" },
      { src: "/images/karacsony_patriek/_47A2250.webp", alt: "Családi ölelés a fa alatt" },
      { src: "/images/karacsony_patriek/_47A2262.webp", alt: "Boldog karácsonyi mosolyok" },
      { src: "/images/karacsony_patriek/_47A2289.webp", alt: "Ünnepi csillogás és nevetés" },
      { src: "/images/karacsony_patriek/_47A2319.webp", alt: "Közös karácsonyi emlék" },
      { src: "/images/karacsony_patriek/_47A2351.webp", alt: "Varázslatos ünnepi pillanat" },
      { src: "/images/karacsony_patriek/_47A2421.webp", alt: "Karácsonyi portré" },
      { src: "/images/karacsony_patriek/_47A2438.webp", alt: "Családi fotó a fenyőfa mellett" },
      { src: "/images/karacsony_patriek/_47A2860.webp", alt: "Meghitt ünnepi ölelés" },
      { src: "/images/karacsony_patriek/_47A2964.webp", alt: "Játékos karácsonyi pillanat" },
      { src: "/images/karacsony_patriek/_47A3036.webp", alt: "Szeretetteljes ünnepi hangulat" }
    ],
    startingPrice: "30.000 Ft",
    baseFeatures: [
      "Kb. 1-1.5 óra kötetlen, játékos fotózás szabadtéren",
      "Közös képek, gyerekek külön, és a szülők kettesben is",
      "25 db profi, művészi retusálású digitális fotó",
      "Átöltözési lehetőség",
      "Online, jelszóval védett válogató galéria"
    ],
    extras: [
      { name: "Extra retusált kép", price: "1.500 Ft / db" },
      { name: "Nagycsaládos fotózás (Nagyszülőkkel / 6 fő felett)", price: "+10.000 Ft alapdíjhoz" },
      { name: "Polaroid gép (Instax) bérlése a fotózásra + 10 film", price: "8.000 Ft" },
      { name: "Prémium Papírképek (10x15)", price: "400 Ft / db" }
    ],
    faq: [
      { question: "Mit vegyünk fel a fotózásra?", answer: "A legfontosabb a kényelem! Válasszatok egymással harmonizáló, de nem teljesen egyforma ruhákat. A pasztell és földszínek (bézs, barna, fehér, mustár) mindig jól működnek a képeimen. Kerüljük a nagy feliratokat." },
      { question: "Mi történik, ha a gyerekek nyűgösek?", answer: "Semmi gond! A fotózás nálam játék. Tapasztalatból tudom, hogyan tereljük el a figyelmüket. A hiszti utáni nevetésekből születnek sokszor a legjobb képek." },
      { question: "Hol legyen a fotózás?", answer: "Zalaegerszeg környékén a természetben (erdő, mező), ahol a gyerekek szabadon szaladgálhatnak. De szívesen megyek a saját kertetekbe is." },
      { question: "Hozhatjuk a kutyánkat is?", answer: "Természetesen! A háziállatok a család teljes jogú tagjai, imádom, ha ők is rajta vannak a képeken." }
    ]
  },

  "autok": {
    title: "Autó, motoros Fotózás",
    slug: "autok",
    heroSubtitle: "Design, erő és szenvedély négy keréken",
    description: "Minden autó egyedi karakter, egy saját történet. Benzinvérűként pontosan tudom, milyen szögek és fények kellenek ahhoz, hogy a végeredmény egy prospektusba illő mestermű legyen. Legyen szó eladásról, a hobbidról, vagy egy különleges projekt autóról.",
    heroImage: "/images/_BF_0535.webp",
    gridClass: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    tags: ["Rolling shots", "Részletfotók", "Night shots"],
    gallery: [
      // Aranyóra sorozat - Izomautó és limuzin a nyári mezőn
      { src: "/images/autok/_BF_0069.webp", alt: "Fekete Dodge Challenger a nyári mezőn, oldalnézetben" },
      { src: "/images/autok/_BF_0084.webp", alt: "Izomautó a dombos táj és a szénabálák előtt" },
      { src: "/images/autok/_BF_0143.webp", alt: "Audi limuzin a naplementében, aranyló tarlón" },
      { src: "/images/autok/_BF_0177.webp", alt: "Autó sziluettje a lemenő nap fényében" },
      { src: "/images/autok/_BF_0180.webp", alt: "Aranyóra hangulatú autós fotó a nyári mezőn" },
      { src: "/images/autok/_42A0238.webp", alt: "Fekete izomautó részletfotó a lemenő nap fényében" },
      { src: "/images/autok/_42A0246.webp", alt: "Autó belső tér: kormány és váltó részletfotó" },
      { src: "/images/autok/_42A0253.webp", alt: "Krómozott tanksapka közeli részletfotó" },
      { src: "/images/autok/_42A0273.webp", alt: "Autó utastere naplementében, ellenfényes hangulatban" },
      { src: "/images/autok/_42A0281.webp", alt: "Hátsó szárny sziluettje a naplemente színei előtt" },

      { src: "/images/_BF_6906.webp", alt: "Kreatív Autó fotó" },
      { src: "/images/_BF_6913.webp", alt: "Kreatív Autó fotó" },
      { src: "/images/_BF_6916.webp", alt: "Autó fotó" },
      { src: "/images/_BF_0772.webp", alt: "Vagány motoros portré a MOL Campus modern üvegfalai előtt" },
      { src: "/images/_BF_0678.webp", alt: "Városi motorozás életérzés a Kopaszi-gát épületei között" },
      { src: "/images/_BF_0640.webp", alt: "Stílusos motorkerékpár parkol Budapest legmagasabb irodaházánál" },
      { src: "/images/_BF_0718.webp", alt: "Lifestyle motoros fotózás a Duna-parti modern negyedben" },
      { src: "/images/_BF_0796-2.webp", alt: "Részletgazdag közeli fotó a motorosról és a gépről" },
      { src: "/images/_BF_0795-2.webp", alt: "Dinamikus motoros kompozíció a Kopaszi-gát sétányának közelében" },
      { src: "/images/_BF_0795.webp", alt: "Profi motoros portré fotózás Budapest modern építészeti környezetében" },
      { src: "/images/_BF_0796.webp", alt: "Fekete ruhás motoros pózol a futurisztikus MOL Campus tövében" },
      { src: "/images/_BF_0656.webp", alt: "Motoros pihenő a budapesti felhőkarcoló árnyékában" },
      { src: "/images/_BF_0852.webp", alt: "Egyedi épített motor és a modern városi táj találkozása" },

      // JPG képek - Kopaszi-gát és MOL Campus környéke
      { src: "/images/_BF_0573.webp", alt: "Városi motoros kaland a 11. kerület új városközpontjában" },
      { src: "/images/_BF_0560.webp", alt: "Brutális motorkerékpár a Kopaszi-gát minimalista hátterével" },
      { src: "/images/_BF_0547.webp", alt: "Esti fények és króm: motoros fotózás a MOL székháznál" },
      { src: "/images/_BF_0535.webp", alt: "Szabadság két keréken a Duna-parthoz közeli modern utcákon" },
      { src: "/images/_BF_0511.webp", alt: "Művészi motoros életkép Budapest legújabb negyedéből" },
      { src: "/images/_BF_0488.webp", alt: "Portré fotó a motorossal a Kopaszi-gát üvegépületei előtt" },
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
      { src: "/images/Rendszamnelkul-7580.webp", alt: "Rendszám nélküli esztétika" },
      { src: "/images/_MG_6531.webp", alt: "Természetközeli autós fotó" },
      { src: "/images/_MG_6330_2.webp", alt: "Naplemente" },
      { src: "/images/_MG_0003.webp", alt: "Front nézet" },
      { src: "/images/audi_tel--5.webp", alt: "Téli táj" },
      { src: "/images/_MG_6525.webp", alt: "Oldalnézet" }
    ],
    startingPrice: "30.000 Ft",
    baseFeatures: [
      "1 órás fotózás egy egyeztetett, az autóhoz illő helyszínen",
      "Külső vonalak, belső tér és apró részletek megörökítése",
      "15 db magazin minőségű, profin retusált digitális kép",
      "Kreatív beállítások, akár a tulajdonossal közös képek is",
      "Tökéletes választás social mediához vagy hirdetéshez"
    ],
    extras: [
      { name: "Extra retusált kép", price: "1.500 Ft / db" },
      { name: "Gurulós képek (Rolling shots) - Kísérő autóval", price: "+10.000 Ft" },
      { name: "Második helyszín bevonása", price: "+8.000 Ft" },
      { name: "Night shots / Speciális fényfestés", price: "Egyedi ajánlat alapján" }
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
    ],
    startingPrice: "30.000 Ft",
    baseFeatures: [
      "Kb. 1 órás kötetlen séta és játék egy választott szabadtéri helyszínen",
      "Akciófotók futás közben, nyugodt portrék és gazdival közös képek",
      "15 db profin retusált, színelt digitális kép",
      "Sok-sok türelem (nem baj, ha a kutya nem marad egy helyben!)",
      "Online, jelszóval védett válogató galéria"
    ],
    extras: [
      { name: "Extra retusált kép", price: "1.500 Ft / db" },
      { name: "További kutyus bevonása (1 gazditól)", price: "+5.000 Ft / kutya" },
      { name: "Polaroid gép (Instax) bérlése a fotózásra + 10 film", price: "8.000 Ft" }
    ],
    faq: [
      { question: "Hogyan készüljünk fel a fotózásra?", answer: "Érdemes a kutyust előtte megsétáltatni, hogy energikus, de ne 'túlpörgött' legyen. Hozz jutalomfalatot, vizet és a kedvenc játékát! Az alap vezényszavak (ül, marad) segítenek, de türelemmel mindent megoldunk nélkülük is." },
      { question: "A kutyám nagyon energikus vagy épp túl félénk...", answer: "Imádom a kihívásokat! Minden kutyus egyedi. Ha energikus, brutál jó akciófotókat készítünk róla, ahogy szalad; ha félénk, türelmesen, távolabbról kezdjük. A lényeg, hogy számára is egy pozitív játék legyen az egész." },
      { question: "Hozhatok több kutyát is?", answer: "Természetesen! Ha több kutyussal érkeznél, kérlek jelezd előre." },
      { question: "Milyen helyszíneken fotózunk?", answer: "Zalaegerszeg és környéke tele van csodás helyekkel: erdő, mező, tópart, vagy akár a saját kertetek. A legfontosabb szempont, hogy a kutyus biztonságban érezze magát." }
    ]
  },
};