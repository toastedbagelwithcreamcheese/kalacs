"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Gallery from "@/components/kismamagallery";
import Link from "next/link";

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
      "Akár több helyszín is",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Prémium csomag",
    price: "54.900 Ft",
    duration: "120 perc fotózás",
    features: [
      "Összes kép resutálva digitálisan elküldve",
      "Akár több helyszín is",
      "Összes kép digitálisan elküldve",
    ],
  },
];

const faqData = [
  {
    question: "Mikor érdemes kismama fotózást készíteni?",
    answer:
      "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, de még nem okoz túl nagy kényelmetlenséget.",
  },
  {
    question: "Milyen ruhát érdemes hozni a fotózásra?",
    answer:
      "Ajánlott világos, pasztell színű ruhákat választani, amelyek kiemelik a pocak szépségét. Stúdióban és szabadtéren is egyaránt ajánlott kényelmes, elegáns viselet.",
  },
  {
    question: "Hány ruhát hozzak a fotózásra?",
    answer:
      "A ruhák száma teljesen rád van bízva, de számoljatok az átöltözéssel, és annak idejével is. Általában 2 maximum 3 ruha ajánlott.",
  },
  {
    question: "Lehet-e a párom és a gyermekem is a képeken?",
    answer:
      "Természetesen! A fotózás során lehetőség van közös képek készítésére is, hogy az egész család megörökíthesse ezt a különleges időszakot.",
  },
  {
    question: "Mikor kapom meg a kész képeket?",
    answer:
      "A fotózás után az elkészült képeket gondosan válogatom és kidolgozom, majd elküldöm neked, hogy kiválaszthasd közülük a retusálásra és nyomtatásra szánt képeket. A végleges képeket általában 1 héten belül átadom digitális formában. Ha rövidebb határidőre van szükséged, jelezd előre, és igyekszem alkalmazkodni.",
  },
];

export default function KismamaFotozas() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-12">
      {/* Főcím */}
      <div className="text-center mb-12 p-6 bg-[#f5ede6c4]">
        <div className="flex items-center justify-start max-w-4xl mx-auto">
          <img
            src="/images/_MG_4693.jpg"
            alt="Kismama fotózás"
            className="rounded-full w-24 h-32 mr-6"
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold"
            style={{ fontSize: "35px", color: "#c79c8d" }}
          >
            Kismama fotózás Debrecen –<br />
            Örökítsd meg a babavárás pillanatait!
          </motion.h1>
        </div>

        {/* Gomb hozzáadása */}
        <div className="mt-6">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-[#c79c8d] text-[#c79c8d] font-semibold rounded-full transition duration-300 hover:bg-[#c79c8d] hover:text-white"
            >
              Foglalj időpontot
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Szabadtéri kismama fotózás */}
      <section className="w-4/5 mb-12 mx-auto bg-pink-50 py-12 px-6 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Kismama Fotózás
        </h1>

        {/* Szabadtéri kismama fotózás */}
        <motion.div
          className="flex flex-col md:flex-row items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }}>
            <Image
              src="/images/_MG_4693.jpg"
              width={300}
              height={200}
              alt="Szabadtéri kismama fotózás"
              className="rounded-tl-[90px] rounded-br-[90px] rounded-tr-3xl rounded-bl-3xl shadow-lg"
            />
          </motion.div>
          <div className="md:ml-8 mt-4 md:mt-0 max-w-lg">
            <h2 className="text-4xl text-[#7A7A7A] font-semibold">
              Szabadtéri kismama fotózás
            </h2>
            <p className="mt-2 text-[#7A7A7A] text-[20px] t-gray-700">
              A természetes fények és a csodálatos környezet teszi egyedivé a
              szabadtéri fotózást. A szabadban készített képek frissességet és
              természetességet sugároznak, miközben örök emléket teremtenek.
            </p>
          </div>
        </motion.div>

        {/* Stúdió kismama fotózás */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }}>
            <Image
              src="/images/_MG_4731.jpg"
              width={300}
              height={200}
              alt="Stúdió kismama fotózás"
              className="rounded-tl-[90px] rounded-br-[90px] rounded-tr-3xl rounded-bl-3xl shadow-lg"
            />
          </motion.div>
          <div className="md:mr-8 mt-4 md:mt-0 max-w-lg">
            <h2 className="text-4xl text-[#7A7A7A] font-semibold">
              Stúdió kismama fotózás
            </h2>
            <p className="mt-2 text-gray-700">
              A stúdió fotózás lehetőséget biztosít a professzionális világítás
              és a különböző háttérbeállítások használatára. Így minden részlet
              a lehető legtökéletesebb lesz, és az időjárás sem befolyásolja a
              végeredményt.
            </p>
          </div>
        </motion.div>
      </section>

      <div>
        <Gallery />
      </div>

      <motion.section
        className="bg-[#F5EDE6] py-16 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C79984]">
            Kismama fotózás Csomagajánlatok
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
    </div>
  );
}
