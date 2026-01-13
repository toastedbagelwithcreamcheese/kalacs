"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react"; // Ha nincs lucide-react, használhatsz sima "X" szöveget is

// --- ADATOK ---

const allImages = [
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
  { src: "/images/_MG_6525.webp", alt: "Oldalnézet" },
];

const packages = [
  {
    title: "Alap Autófotó Csomag",
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
  },
  {
    title: "Bővített Autófotó Csomag",
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
  },
];

const faqData = [
  {
    question: "Milyen típusú autókat lehet fotózni?",
    answer: "Bármilyen autót szívesen fotózok, legyen az sportautó, veterán, tuningolt vagy akár hétköznapi napihasználós autó.",
  },
  {
    question: "Hol történik az autófotózás?",
    answer: "Az autófotózás történhet kültéren, vagy akár egy előre egyeztetett, különleges helyszínen is, amely illik az autó karakteréhez.",
  },
  {
    question: "Mennyi ideig tart egy fotózás?",
    answer: "Az autófotózás időtartama a csomagtól és a helyszíntől függ, általában 1-2 órát vesz igénybe.",
  },
  {
    question: "Milyen időjárási körülmények ideálisak a fotózáshoz?",
    answer: "A legjobb fényviszonyokat naplementekor vagy felhős időben lehet elérni. Esős időben is lehet különleges hangulatú képeket készíteni.",
  },
  {
    question: "Lehet-e éjszakai vagy mozgás közbeni fotókat is készíteni?",
    answer: "Természetesen lehetséges, de ez esetben több előzetes egyeztetésre van szükséges, például ha utcán szeretnél mozgás közbeni képeket, akkor szükség lesz egy kísérő autóra is.",
  },
  {
    question: "Mikor kapom meg a kész képeket?",
    answer: "A képek kidolgozása és retusálása általában 1 hetet vesz igénybe. Ha sürgős, természetesen megpróbálok alkalmazkodni.",
  },
  {
    question: "Van lehetőség több autó fotózására is egy időpontban?",
    answer: "Természetesen! Ha több autóról szeretnél képeket, előre egyeztetjük a részleteket és a csomagot ennek megfelelően alakítjuk ki.",
  },
];

// --- KOMPONENS ---

export default function AutoPhotographySection() {
  const [visibleImages, setVisibleImages] = useState(6); // Kezdetben 6 kép jobb (2 sor)
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Lightbox állapota

  const loadMoreImages = () => {
    setVisibleImages((prev) => prev + 3);
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
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto text-lg">
          Profi autófotózás bármilyen autóról vagy motorról. Egyedi, részletgazdag képek, amelyek kiemelik a gép karakterét.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-6 px-8 py-3 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:bg-[#646C5E] hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Vedd fel velem a kapcsolatot!
        </Link>
      </div>

      {/* MIÉRT ÉPPEN ÉN? & A FOTÓZÁS MENETE */}
      <div className="container mx-auto my-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
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
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-[#C79C8D] mb-6">
              Miért engem válassz?
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl font-bold">✓</span>
                <div>
                  <strong className="font-medium text-gray-900">Személyes Kapcsolat:</strong> Nálam nem futószalagon készülnek a képek. Időt szánok Rád és az autódra.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl font-bold">✓</span>
                <div>
                  <strong className="font-medium text-gray-900">Kreatív Szemlélet:</strong> A legmodernebb technikát ötvözöm az egyedi látásmóddal.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl font-bold">✓</span>
                <div>
                  <strong className="font-medium text-gray-900">Egyedi Helyszínek:</strong> Legyen az ipari környezet vagy festői naplemente, megtaláljuk a tökéletes hátteret.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl font-bold">✓</span>
                <div>
                  <strong className="font-medium text-gray-900">Rugalmasság:</strong> A Te elégedettséged a legfontosabb.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Jobb oszlop: Kulisszák mögött */}
          <motion.div
            className="bg-[#2D3748] text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-[#C79C8D] mb-6">
              Így készülnek a fotóid
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <span className="text-[#C79C8D] mr-4 text-2xl">📍</span>
                <div>
                  <strong className="font-medium block text-gray-100 mb-1">
                    1. Ötletelés és Helyszínválasztás
                  </strong>
                  <span className="text-gray-400 text-sm">
                    Megbeszéljük az elképzeléseidet, és felkutatjuk azokat a helyszíneket, amelyek a legjobban kiemelik autód egyediségét.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#C79C8D] mr-4 text-2xl">📷</span>
                <div>
                  <strong className="font-medium block text-gray-100 mb-1">
                    2. A Fotózás Napja
                  </strong>
                  <span className="text-gray-400 text-sm">
                    A helyszínen a fényekkel, szögekkel és kompozícióval játszva hozom ki a maximumot.
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#C79C8D] mr-4 text-2xl">✨</span>
                <div>
                  <strong className="font-medium block text-gray-100 mb-1">
                    3. Professzionális Utómunka
                  </strong>
                  <span className="text-gray-400 text-sm">
                    A gondosan kiválogatott képek digitális "sötétkamrámban" nyerik el végső formájukat.
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* EGYEDI KÉPVÁSÁRLÁS SZEKCIÓ */}
      <div className="my-20 py-12 bg-gradient-to-r from-[#646C5E] to-[#52584e] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Csak néhány tökéletes kép hiányzik?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Ha konkrét elképzeléseid vannak, vagy nem szeretnél teljes csomagot
            választani, itt a rugalmas megoldás Neked!
          </p>
          <div className="inline-block bg-white text-gray-800 rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300 max-w-lg mx-auto">
            <p className="text-5xl font-extrabold text-[#C79C8D] mb-2">
              1.990 Ft
            </p>
            <p className="text-lg font-medium text-gray-600 uppercase tracking-wide">
              / retusált digitális kép
            </p>
            <p className="text-sm text-gray-500 mt-4 mb-6 italic">
              (A fotózás időtartama és a helyszínek száma a kért mennyiséghez igazodik. Kérj egyedi ajánlatot!)
            </p>
            <Link
              href="/contact?subject=Egyedi_keprendeles_autofotozas"
              className="inline-block px-10 py-3 border-2 border-[#C79C8D] text-[#C79C8D] font-bold rounded-full transition duration-300 hover:bg-[#C79C8D] hover:text-white"
            >
              Ajánlatot kérek
            </Link>
          </div>
        </div>
      </div>

      {/* CSOMAGAJÁNLATOK */}
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C79984]">
            Csomagajánlatok
          </h2>
          <p className="text-gray-600 mt-4">
            Válaszd ki a számodra tökéletes csomagot!
          </p>
          <p className="text-[#8b614e] font-semibold mt-2">
            Minden csomag teljesen testreszabható az igényeid szerint!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-[#C79C8D] text-center mb-4">
                  {pkg.title}
                </h3>
                <div className="text-center mb-6">
                  <p className="text-4xl font-extrabold text-gray-800">
                    {pkg.price}
                  </p>
                  {pkg.priceSuffix && (
                    <span className="text-sm text-gray-500 block mt-1">
                      {pkg.priceSuffix}
                    </span>
                  )}
                  <p className="text-gray-600 font-medium mt-2 bg-gray-100 inline-block px-3 py-1 rounded-full text-sm">
                    {pkg.duration}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="block w-full text-center py-4 bg-[#646C5E] text-white rounded-xl font-bold hover:bg-[#52584e] transition-colors shadow-md hover:shadow-lg"
              >
                Érdekel a csomag
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Apróbetűs rész */}
        <div className="mt-8 max-w-2xl mx-auto text-center text-sm text-gray-500 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="mb-2">
            <span className="font-bold text-gray-700">Helyszín:</span> Rugalmasan változtatható.
            <span className="mx-2">|</span>
            <span className="font-bold text-gray-700">Időtartam:</span> Tájékoztató jellegű.
          </p>
          <p>
            Az árak változtatásának jogát fenntartom, egyedi igények esetén kérj személyre szabott árajánlatot!
          </p>
        </div>
      </div>

      {/* KÉPGALÉRIA */}
      <div className="container mx-auto px-6 mb-20">
        <h3 className="text-3xl text-center font-bold text-[#C79984] mb-8">
          Galéria
        </h3>
        
        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {allImages.slice(0, visibleImages).map((img, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-xl shadow-md bg-gray-200"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(img.src)} // Kép megnyitása
            >
              <Image
                src={img.src}
                alt={img.alt || "Autófotó"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-semibold">
                  Nagyítás
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Több kép gomb */}
        {visibleImages < allImages.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMoreImages}
              className="px-8 py-3 bg-[#C79984] text-white rounded-full font-semibold hover:bg-[#b18877] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Mutass még képet
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX (Nagyított kép nézet) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedImage(null)} // Bezárás háttérre kattintva
          >
            <button
              className="absolute top-5 right-5 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 z-50"
              onClick={() => setSelectedImage(null)}
            >
               {/* Ha nincs Lucide icon, akkor egy 'X' karakter is megteszi */}
               <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()} // Képre kattintva NE záródjon be
            >
               <Image
                src={selectedImage}
                alt="Nagyított kép"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEÓ SZEKCIÓ (Jelenleg kikommentelve, de készen áll a használatra) */}
      {/* <section className="my-16 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Videós Munkáim</h2>
             <p className="mt-2 text-gray-600">Ízelítő néhány korábbi projektből</p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoPortfolio.map((video) => (
                 <div key={video.id} className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} allowFullScreen></iframe>
                 </div>
              ))}
           </div>
        </div>
      </section> 
      */}

      {/* GYIK */}
      <div className="container mx-auto max-w-3xl px-6 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Gyakran Ismételt Kérdések
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <button
                className="w-full text-left px-6 py-4 focus:outline-none bg-white hover:bg-gray-50 transition-colors flex justify-between items-center group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-[#C79C8D]' : 'text-gray-700'} group-hover:text-[#C79C8D] transition-colors`}>
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}