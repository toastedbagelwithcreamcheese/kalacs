"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Példa képek (cseréld ki sajátjaidra)
const allImages = [
  { src: "/images/audi_tel-1198.webp", alt: "" },
  { src: "/images/_MG_6310.webp", alt: "" },
  { src: "/images/_MG_6506.webp", alt: "" },
  { src: "/images/_MG_6508.webp", alt: "" },
  { src: "/images/_MG_6519.webp", alt: "" },
  { src: "/images/_MG_6531.webp", alt: "" },
  { src: "/images/_MG_6330_2.webp", alt: "" },
  { src: "/images/audi_tel--5.webp", alt: "" },
  { src: "/images/_MG_6525.webp", alt: "" },
];

const packages = [
  {
    title: "Alap csomag",
    price: "29.900 Ft",
    duration: "30 perc fotózás",
    features: [
      "10-15 profi retusált kép",
      "1 helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Normál csomag",
    price: "34.900 Ft",
    duration: "60 perc fotózás",
    features: [
      "20-25 profi retusált kép",
      "1 helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Maxi csomag",
    price: "44.900 Ft",
    duration: "90 perc fotózás",
    features: [
      "25-30 profi retusált kép",
      "Akár 2 helyszín is",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Prémium csomag",
    price: "54.900 Ft",
    duration: "120 perc fotózás",
    features: [
      "Összes kép resutálva digitálisan elküldve",
      "Akármennyi helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
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
          Profi autófotózás tuningolt autóknak, veterán járműveknek és
          sportkocsiknak. Egyedi, részletgazdag képek, amelyek kiemelik a
          karakterét.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-4 px-6 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105"
        >
          Vedd fel velem a kapcsolatot!
        </Link>
      </div>

      {/* MIÉRT VÁLASSZ ENGEM */}
      <div className="container mx-auto mt-12 px-6 grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold text-[#C79984]">
            Miért válassz engem?
          </h3>
          <ul className="mt-4 text-gray-700 space-y-2">
            <li>✔ Szenvedélyem az autók és a fotózás</li>
            <li>✔ Professzionális felszerelés</li>
            <li>✔ Egyedi helyszínek és koncepciók</li>
            <li>✔ Rugalmasság és személyre szabott szolgáltatás</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold text-[#C79984]">
            Kulisszák mögött
          </h3>
          <p className="mt-4 text-gray-700">
            Egy autófotózás nem csupán a gomb lenyomásáról szól – minden részlet
            gondos tervezést és figyelmet igényel. Íme, hogyan zajlik egy
            fotózás velem:
          </p>
          <ul className="mt-4 text-gray-700 space-y-2">
            <li>
              📍 <strong>Helyszínválasztás</strong> – Együtt kiválasztjuk a
              tökéletes helyszínt.
            </li>
            <li>
              📷 <strong>Beállítások és kompozíció</strong> – A legjobb szögeket
              és fényeket keresem meg.
            </li>
            <li>
              ✨ <strong>Utómunka</strong> – A nyers képeket profi retusálással
              teszem tökéletessé.
            </li>
          </ul>
        </motion.div>
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
            ajánlatokkal keress nyugodtan Emailen vagy telefonon!
          </p>
        </div>

        <div className="container mx-auto mt-12 px-6 grid md:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold text-[#C79984]">
                {pkg.title}
              </h3>
              <p>{pkg.price} </p>
              <p className="text-gray-700 mt-2">{pkg.duration}</p>
              <ul className="mt-4 text-gray-700 space-y-2 text-left">
                {pkg.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-block mt-4 px-6 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105"
              >
                Foglalj időpontot!
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
      {/* GYIK */}
      <div className="max-w-3xl mx-auto mt-7">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Gyakran Ismétlődő Kérdések
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-2">
              <button
                className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.question}
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-gray-600"
                >
                  {item.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
    
  );
}
