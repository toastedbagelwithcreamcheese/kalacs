"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Példa képek (cseréld ki sajátjaidra)
const allImages = [
  { src: "/images/audi_tel-1198.webp", alt: "" },
  { src: "/images/_MG_6310.webp", alt: "" },
  { src: "/images/_MG_6506.webp", alt: "" },
  { src: "/images/_MG_6508.webp", alt: "" },
  { src: "/images/_MG_7633.webp", alt: "" },
  { src: "/images/_MG_6519.webp", alt: "" },
  { src: "/images/Rendszamnelkul-7580.jpg", alt: "" },
  { src: "/images/_MG_6531.webp", alt: "" },
  { src: "/images/_MG_6330_2.webp", alt: "" },
  { src: "/images/audi_tel--5.webp", alt: "" },
  { src: "/images/_MG_6525.webp", alt: "" },
];

const packages = [
  {
    title: "Alap Autófotó Csomag", // Semlegesebb név
    price: "14.900 Ft",
    priceSuffix: "(alapdíj fotókra)",
    duration: "kb. 45 perc fotózás",
    features: [
      "Online konzultáció a helyszínről és a kívánt stílusról",
      "Az alapdíj 10-15 db profi, nagy felbontású, retusált digitális képet tartalmaz",
      "Minden további választott és retusált kép: 1.790 Ft/db",
      "1 egyeztetett, az autó karakteréhez illő helyszín",
      "Fókuszban az autó külső vonalai és legjellegzetesebb részletei",
      "Online, jelszóval védett képgaléria a válogatáshoz",
    ],
    videoOption: {
      available: true,
      description: "Rövid, 'TikTok' szerkesztett videó (kb. 15-20mp).",
      price: "+ 6.990 Ft", // Ide írd a kedvezményes árat
      icon: "🎬", // Opcionális ikon
    },
    category: "photo_package",
  },
  {
    title: "Bővített Autófotó Csomag", // Semlegesebb név
    price: "24.900 Ft",
    priceSuffix: "(alapdíj fotókra)",
    duration: "kb. 75-90 perc fotózás",
    features: [
      "Részletes személyes vagy online konzultáció, egyedi koncepció kialakítása",
      "Az alapdíj 15-20 db profi, nagy felbontású, retusált digitális képet tartalmaz",
      "Minden további választott és retusált kép: 1.590 Ft/db (kedvezőbb ár)",
      "Akár 2 különböző, gondosan kiválasztott helyszín a maximális változatosságért",
      "Online, jelszóval védett képgaléria a válogatáshoz és a kész képek letöltéséhez",
      "Kreatív beállítások az autóval és a tulajdonossal",
    ],
    videoOption: {
      available: true,
      description:
        "Az alap, rövid, 'TikTok' féle szerkesztett videót (kb. 15-20mp) tartalmazza az ár.",
      price: "", // Ide írd a kedvezményes árat
      icon: "🎬✨", // Opcionális ikon
    },
    category: "photo_package",
  },
  {
    title: "Autó Videóklip Csomag",
    price: "9.990 - 19.990 Ft", // Ide írd a videó csomag árát
    priceSuffix: "(alapdíj videóra)",
    duration: "kb. 50-60 perc forgatás",
    features: [
      "Konzultáció a videó koncepciójáról, helyszín(ek)ről és stílusról",
      "Elképzeléstől függően 10-30mp videó",
      "Minőségi 4k felbontás",
      "1-2 rövidebb verzió közösségi média platformokra (pl. Instagram Reel)",
    ],
    videoOption: {
      // Ennél a csomagnál nincs 'plusz' videó opció, mert ez maga a videó csomag
      available: false,
    },
    category: "video_package",
  },
];

// Ezt a tömböt a komponensedben (pl. az Autófotózás oldal komponensében) kell definiálnod.
// A 'type' mező jelzi, hogy YouTube vagy Vimeo videóról van-e szó.
const videoPortfolio = [
  {
    id: "S1Jk89NK27c",
    type: "youtube",
    title: "Dinamikus Sportautó Klip (Példa)",
    format: '9/16',
  }, // Cseréld le valós ID-kra!
  {
    id: "S1Jk89NK27cc",
    type: "vimeo",
    title: "Elegáns Limuzin Bemutató (Példa)",
  }, // Cseréld le valós ID-kra!
];

const faqData = [
  {
    question: "Milyen típusú autókat lehet fotózni?",
    answer:
      "Bármilyen autót szívesen fotózok, legyen az sportautó, veterán, tuningolt vagy akár hétköznapi napihasználós autó.",
  },
  {
    question: "Hol történik az autófotózás?",
    answer:
      "Az autófotózás történhet kültéren, vagy akár egy előre egyeztetett, különleges helyszínen is, amely illik az autó karakteréhez.",
  },
  {
    question: "Mennyi ideig tart egy fotózás?",
    answer:
      "Az autófotózás időtartama a csomagtól és a helyszíntől függ, általában 1-2 órát vesz igénybe.",
  },
  {
    question: "Milyen időjárási körülmények ideálisak a fotózáshoz?",
    answer:
      "A legjobb fényviszonyokat naplementekor vagy felhős időben lehet elérni. Esős időben is lehet különleges hangulatú képeket készíteni.",
  },
  {
    question: "Lehet-e éjszakai vagy mozgás közbeni fotókat is készíteni?",
    answer:
      "Természetesen lehetséges, de ez esetben több előzetes egyeztetésre van szükséges, például ha utcán szeretnél mozgás közbeni képeket, akkor szükség lesz egy kísérő autóra is.",
  },
  {
    question: "Mikor kapom meg a kész képeket?",
    answer:
      "A képek kidolgozása és retusálása általában 1 hetet vesz igénybe. Ha sürgős, természetesen megpróbálok alkalmazkodni.",
  },
  {
    question: "Van lehetőség több autó fotózására is egy időpontban?",
    answer:
      "Természetesen! Ha több autóról szeretnél képeket, előre egyeztetjük a részleteket és a csomagot ennek megfelelően alakítjuk ki.",
  },
];

export default function AutoPhotographySection() {
  const [showMore, setShowMore] = useState(false);
  const [visibleImages, setVisibleImages] = useState(3); // Kezdetben 3 kép jelenik meg
  const [openIndex, setOpenIndex] = useState(null);

  const loadMoreImages = () => {
    setVisibleImages((prev) => prev + 3); // Minden kattintásra 3 újabb kép jelenik meg
  };
  return (
    <motion.section
      className="bg-[#F5EDE6] py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* HERO SZEKCIÓ */}
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#C79984]">
          Autófotózás – Örökítsd meg az autód/motorod legszebb pillanatait!
        </h1>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
          Profi autófotózás bármilyen autóról motorról. Egyedi, részletgazdag képek, amelyek kiemelik a
          karakterét.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-4 px-6 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105"
        >
          Vedd fel velem a kapcsolatot!
        </Link>
      </div>

      {/* MIÉRT ÉPPEN ÉN? & A FOTÓZÁS MENETE */}
      <div className="container mx-auto my-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Több mint kattintás: Együtt alkotunk emléket
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Minden autó egyedi karakter, egy történet. Célom, hogy ezt a
            történetet a leglenyűgözőbb vizuális formában örökítsük meg.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Bal oszlop: Miért én? */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold text-[#C79C8D] mb-5">
              Miért engem válassz, ha autód a szenvedélyed?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
                <div>
                  <strong className="font-medium">Személyes Kapcsolat:</strong>{" "}
                  Nálam nem futószalagon készülnek a képek. Időt szánok Rád és
                  az autódra, hogy megértsem az elképzeléseidet és közösen
                  hozzuk ki a maximumot.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
                <div>
                  <strong className="font-medium">
                    Kreatív Szemlélet, Profi Eszközök:
                  </strong>{" "}
                  A legmodernebb technikát ötvözöm az egyedi látásmóddal, hogy
                  autód ne csak egy jármű, hanem egy műalkotás legyen a fotókon.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
                <div>
                  <strong className="font-medium">
                    Egyedi Helyszínek, Közös Ötletelés:
                  </strong>{" "}
                  Legyen az egy eldugott ipari környezet, egy festői naplemente
                  vagy a város lüktetése – együtt megtaláljuk a tökéletes
                  hátteret.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
                <div>
                  <strong className="font-medium">
                    Rugalmasság és Minőség:
                  </strong>{" "}
                  A Te elégedettséged a legfontosabb. Rugalmasan alkalmazkodom
                  az igényeidhez, és garantálom a kifogástalan minőséget minden
                  egyes képen.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Jobb oszlop: Kulisszák mögött */}
          <motion.div
            className="bg-gray-800 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-[#C79C8D] mb-5">
              Így készülnek a Te fotóid: A folyamat
            </h3>
            <p className="mt-4 text-gray-300 mb-5">
              Egy autófotózás sokkal több, mint egyszerűen a gomb lenyomása.
              Együttműködésünk minden lépése gondos tervezést és precíz
              kivitelezést igényel:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start p-3 bg-gray-700 rounded-md">
                <span className="text-[#C79C8D] mr-3 text-2xl">📍</span>
                <div>
                  <strong className="font-medium block text-gray-100">
                    1. Ötletelés és Helyszínválasztás:
                  </strong>
                  <span className="text-gray-300 text-sm">
                    Megbeszéljük az elképzeléseidet, és közösen felkutatjuk
                    azokat a helyszíneket, amelyek a legjobban kiemelik autód
                    egyediségét.
                  </span>
                </div>
              </li>
              <li className="flex items-start p-3 bg-gray-700 rounded-md">
                <span className="text-[#C79C8D] mr-3 text-2xl">📷</span>
                <div>
                  <strong className="font-medium block text-gray-100">
                    2. A Fotózás Napja:
                  </strong>
                  <span className="text-gray-300 text-sm">
                    A helyszínen a fényekkel, szögekkel és kompozícióval játszva
                    hozom ki a maximumot minden beállításból, miközben Te is
                    részese lehetsz az alkotói folyamatnak.
                  </span>
                </div>
              </li>
              <li className="flex items-start p-3 bg-gray-700 rounded-md">
                <span className="text-[#C79C8D] mr-3 text-2xl">✨</span>
                <div>
                  <strong className="font-medium block text-gray-100">
                    3. Professzionális Utómunka:
                  </strong>
                  <span className="text-gray-300 text-sm">
                    A gondosan kiválogatott nyers képek digitális
                    "sötétkamrámban" nyerik el végső, lenyűgöző formájukat, hogy
                    minden részlet tökéletes legyen.
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      {/* EGYEDI KÉPVÁSÁRLÁS SZEKCIÓ */}
      <div className="my-16 py-10 bg-gradient-to-r from-[#646C5E] to-[#52584e] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Csak néhány tökéletes kép hiányzik?
          </h2>
          <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Ha konkrét elképzeléseid vannak, vagy nem szeretnél teljes csomagot
            választani, itt a rugalmas megoldás Neked! Ideális választás social
            media tartalmakhoz, eladáshoz vagy csak néhány kedvenc
            megörökítéséhez.
          </p>
          <div className="inline-block bg-white text-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl sm:text-5xl font-extrabold text-[#C79C8D]">
              1.990 Ft
            </p>
            <p className="text-lg font-medium text-gray-700">
              / profin retusált digitális kép
            </p>
            <p className="text-xs text-gray-500 mt-3 mb-5">
              (A fotózás időtartama és a lehetséges helyszínek száma a kért
              képek mennyiségéhez igazodik. Kérj egyedi, személyre szabott
              ajánlatot!)
            </p>
            <Link
              href="/contact?subject=Egyedi_keprendeles_autofotozas" // Módosítsd a linket, hogy az üzenet tárgya előre kitöltődjön
              className="inline-block px-10 py-3 border-2 border-[#C79C8D] text-[#C79C8D] font-semibold rounded-full transition duration-300 hover:bg-[#C79C8D] hover:text-white"
            >
              Ajánlatot kérek erre
            </Link>
          </div>
        </div>
      </div>
      <motion.section
        className="bg-[#F5EDE6] py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C79984]">
            Autófotózás Csomagajánlatok
          </h1>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Válaszd ki a számodra tökéletes csomagot!
          </p>
          <p className="text-[#8b614e] font-bold mt-1 max-w-3xl mx-auto text-xl">
            Minden csomag teljesen testreszabható a Te igyéneid szerint! Egyedi
            ajánlatokkal keress nyugodtan emailen vagy telefonon!
          </p>
        </div>

        <div className="container mx-auto mt-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Megjegyzés a grid-cols-hoz: 
    - Ha általában 2 csomagod van: md:grid-cols-2 lg:grid-cols-2
    - Ha 3 csomagod van (mint most): md:grid-cols-2 lg:grid-cols-3 (így egymás mellett lesznek nagyobb képernyőn)
    - Ha 4 csomagod lenne: md:grid-cols-2 lg:grid-cols-2 (2x2 elrendezés) vagy lg:grid-cols-4
    Az alábbi példa 3 csomagra van optimalizálva (lg:grid-cols-3).
    Ha kevesebb, mint 3 csomagod van, és nem szeretnéd, hogy az utolsó középre igazodjon,
    akkor maradhatsz a `lg:grid-cols-2`-nél, és az utolsó elem új sort kezd, vagy használhatsz flexboxot bonyolultabb igazításhoz.
    Itt most az egyszerűség kedvéért a grid-cols-3-at használom, feltételezve, hogy általában lesz 3 ajánlatod.
  */}
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl text-center flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // once: true - animáció csak egyszer fusson le
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#C79C8D] min-h-[3em] flex items-center justify-center">
                  {" "}
                  {/* min-h a cím magasságának egységesítésére */}
                  {pkg.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {pkg.price}
                  {pkg.priceSuffix && (
                    <span className="text-lg font-normal text-gray-600 ml-1">
                      {pkg.priceSuffix}
                    </span>
                  )}
                </p>
                <p className="text-gray-600 mt-2 text-sm">{pkg.duration}</p>

                <ul className="mt-5 text-gray-700 space-y-2 text-left text-sm sm:text-base">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Videó Opció megjelenítése, ha van */}
                {pkg.videoOption && pkg.videoOption.available && (
                  <div className="mt-5 pt-4 border-t border-dashed border-gray-200">
                    <h4 className="text-md font-semibold text-[#8b614e] flex items-center justify-center">
                      {pkg.videoOption.icon || "🎬"} Videó Kiegészítés
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 px-2">
                      {pkg.videoOption.description}
                    </p>
                    <p className="text-xl font-bold text-gray-700 mt-2">
                      {pkg.videoOption.price}
                    </p>
                  </div>
                )}
              </div>

              <Link
                href="/contact" // Módosítsd a linket, ha pl. a csomag neve alapján más oldalra kellene ugrania
                className="inline-block mt-8 px-8 py-3 bg-[#646C5E] text-white rounded-lg font-semibold hover:bg-[#52584e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C79C8D] transition-all duration-300 transform hover:scale-105"
              >
                Érdekel!
              </Link>
            </motion.div>
          ))}
        </div>
        {/* Piros csillagos magyarázatok */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4 p-4 border-t border-gray-300 text-center mx-auto max-w-md text-sm"
        >
          <p className="text-gray-700">
            <span className="font-bold">
              Helyszín<span className="text-red-500">*</span>:
            </span>
            Természetesen ez is bármikor testreszabható, nem feltétlen kell egy
            helyszínen fotózni ha belefér az időbe.
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-bold">
              Időtartam<span className="text-red-500">*</span>:
            </span>{" "}
            A fotózás hossza rugalmasan módosítható az igényeid szerint.
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-bold">
              Ár<span className="text-red-500">*</span>:
            </span>
            Az ügyfeleim elégedettsége számomra a legfontosabb, ezért ha az ár
            magasnak tűnik, bátran jelezd, és igyekszünk megtalálni a megfelelő
            megoldást!
          </p>
        </motion.div>
      </motion.section>

      {/* Képgaléria */}
      <div className="container mx-auto mt-12 px-6">
        <h3 className="text-3xl text-center font-semibold text-[#C79984] mb-6">
          Galéria
        </h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {allImages.slice(0, visibleImages).map((img, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* MUTASS TÖBBET GOMB */}
      {visibleImages < allImages.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreImages}
            className="px-6 py-2 bg-[#C79984] text-white rounded-lg font-semibold hover:bg-[#b18877] transition-all duration-200"
          >
            Mutass többet
          </button>
        </div>
      )}
      {/* VIDEÓGALÉRIA SZEKCIÓ 
      <section className="my-16 py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Videós Munkáim
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Egy jól elkészített videó új dimenzióba helyezi az autó élményét.
              Nézd meg ízelítőként néhány korábbi projektemet, és képzeld el,
              mit hozhatnánk ki a Te autódból!
            </p>
          </div>
          {videoPortfolio.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {videoPortfolio.map((video) => (
                <motion.div
                  key={video.id}
                  className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-video">
                    {" "}
                    <iframe
                      className="w-full h-full"
                      src={
                        video.type === "youtube"
                          ? `https://www.youtube.com/embed/${video.id}?rel=0&showinfo=0&modestbranding=1`
                          : `https://player.vimeo.com/video/${video.id}?title=0&byline=0&portrait=0`
                      }
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  {video.title && (
                    <p className="p-3 bg-white text-center text-sm font-medium text-gray-700">
                      {video.title}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Jelenleg nincsenek feltöltött videók. Nézz vissza később!
            </p>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/contact?subject=Autos_videokeszites_ajanlat"
              className="inline-block px-10 py-4 bg-[#C79C8D] text-white font-semibold rounded-full text-lg transition duration-300 hover:bg-[#b88d7e] transform hover:scale-105"
            >
              Kérj ajánlatot autó videóra!
            </Link>
          </div>
        </div>
      </section>
      */}
      
      {/* GYIK */}
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Gyakran Ismétlődő Kérdések
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center py-2 hover:text-[#c79c8d] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600 pl-2"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
