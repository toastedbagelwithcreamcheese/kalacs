"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import KutyaGallery from "@/components/kutyagallery";
import Link from "next/link";

const packages = [
  {
    title: "Pajkos Portrék",
    price: "9.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 30 perc fotózás",
    features: [
      "Személyes konzultáció a fotózás előtt",
      "Az alapdíj 5-8 db profi, retusált digitális képet tartalmaz",
      "Minden további választott és retusált kép: 1.990 Ft/db",
      "1 választott helyszín (pl. kedvenc park, otthon)",
      "Online képgaléria a válogatáshoz",
      "Kutyus(ok) és gazdi(k) közös képei is lehetségesek",
    ],
  },
  {
    title: "Kalandra Fel!",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 60-90 perc fotózás",
    features: [
      "Személyes konzultáció a fotózás előtt",
      "Az alapdíj 15 db profi, retusált digitális képet tartalmaz",
      "Minden további választott és retusált kép: 1.790 Ft/db",
      "Akár 2 közeli helyszín a változatosabb fotókért",
      "Online képgaléria a válogatáshoz",
      "Akciófotók, portrék, közös képek a gazdival",
    ],
  },
];

const faqData = [
  {
    question: "Hogyan készüljünk fel a kutyafotózásra?",
    answer: "A fotózás előtt érdemes a kutyust megsétáltatni, hogy energikus, de ne túlpörgött legyen. Hozz magaddal kedvenc játékait, jutalomfalatkáit, és vizet. Fontos, hogy a kutyus ismerje az alap vezényszavakat (ül, fekszik, marad), de ha nem, az sem baj, türelemmel és kreativitással mindent megoldunk!",
  },
  {
    question: "Mi történik, ha rossz az idő a szabadtéri fotózáson?",
    answer: "Az időjárás sajnos kiszámíthatatlan. Ha az előrejelzés rossz időt jósol (pl. eső, vihar), akkor közösen keresünk egy új, megfelelő időpontot. A kutyus és a Te kényelmed a legfontosabb!",
  },
  {
    question: "Hozhatok több kutyát is a fotózásra?",
    answer: "Természetesen! Ha több kutyussal érkeznél, kérlek, ezt jelezd előre az időpontfoglaláskor, hogy megfelelően tudjunk tervezni. Több kutyus esetén javasoljuk a hosszabb fotózási időt biztosító 'Kalandra Fel!' csomagot.",
  },
  {
    question: "A kutyám nagyon energikus / félénk, lehet így is jó képeket készíteni?",
    answer: "Minden kutyus egyedi személyiség, és én imádom a kihívásokat! Legyen szó extra energikus vagy visszahúzódóbb kedvencről, türelemmel és a kutyus igényeihez alkalmazkodva fogunk csodás képeket készíteni. A lényeg, hogy a fotózás számára is pozitív élmény legyen.",
  },
  {
    question: "Milyen helyszíneken lehet fotózni?",
    answer: "A helyszínválasztás rugalmas! Lehet a kedvenc parkotok, egy közeli erdő, tópart, de akár a saját kertetek vagy otthonotok is. A lényeg, hogy a kutyus jól érezze magát és biztonságban legyen. Zalaegerszegen és környékén vállalok fotózást, de egyedi megbeszélés alapján távolabbi helyszínek is szóba jöhetnek.",
  },
  {
    question: "Mikor kapom meg a kész képeket?",
    answer: "A fotózás után 1-2 napon belül küldök egy online válogató galériát a nyers képekből. Miután kiválasztottad a kedvenceidet, a retusált képeket általában 7-10 munkanapon belül elkészítem és digitálisan átadom.",
  },
];

export default function KutyaFotozas() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-12">
      {/* Főcím */}
      <div className="text-center mb-12 p-6 bg-[#f5ede6c4]">
        <div className="flex flex-col sm:flex-row items-center justify-start max-w-4xl mx-auto">
          <img
            src="/images/_MG_5324.webp"
            alt="Kutyafotózás"
            className="rounded-full w-32 h-32 sm:w-24 sm:h-32 object-cover mr-0 sm:mr-6 mb-4 sm:mb-0"
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-center sm:text-left"
            style={{ color: "#c79c8d" }}
          >
            Kutyafotózás Zalaegerszegen –<br />
            Örökítsd meg kedvenced legjobb pillanatait!
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

      {/* Kutya fotózás bemutató */}
      <section className="w-full lg:w-4/5 mb-12 mx-auto bg-green-50 py-12 px-6 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Kutyafotózás: Több Mint Csak Képek
        </h1>

        {/* Szabadtéri kutya fotózás */}
        <motion.div
          className="flex flex-col md:flex-row items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="overflow-hidden md:mr-8" whileHover={{ scale: 1.05 }}>
            <Image
              src="/images/_MG_5347.webp"
              width={300}
              height={200}
              alt="Szabadtéri kutyafotózás"
              className="rounded-tl-[90px] rounded-br-[90px] rounded-tr-3xl rounded-bl-3xl shadow-lg w-full h-auto md:w-[300px]"
            />
          </motion.div>
          <div className="mt-4 md:mt-0 max-w-lg">
            <h2 className="text-3xl lg:text-4xl text-[#7A7A7A] font-semibold">
              Szabadtéri Kalandok
            </h2>
            <p className="mt-2 text-[#7A7A7A] text-lg lg:text-[20px]">
              A természetes fények és a csodás környezet adják a legjobb hátteret kutyusod önfeledt játékához. Legyen szó egy erdei sétáról, egy mezőn való futkározásról vagy egy tóparti kalandról, a szabadtéri fotózás során energikus és élettel teli képek születnek.
            </p>
          </div>
        </motion.div>

        {/* Portré / Otthoni kutya fotózás */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="overflow-hidden md:ml-8" whileHover={{ scale: 1.05 }}>
            <Image
              src="/images/59957F6B-2DAA-4D9D-AB69-3B47B1F7216F_1_105_c.jpeg" // <-- Placeholder kép
              width={300}
              height={200}
              alt="Kutya portré fotózás"
              className="rounded-tl-[90px] rounded-br-[90px] rounded-tr-3xl rounded-bl-3xl shadow-lg w-full h-auto md:w-[300px]"
            />
          </motion.div>
          <div className="mt-4 md:mt-0 max-w-lg">
            <h2 className="text-3xl lg:text-4xl text-[#7A7A7A] font-semibold">
                Portrék rólad és a kutyádról – a természetben
            </h2>
            <p className="mt-2 text-gray-700 text-lg lg:text-[20px]">
            A legszebb képek kint születnek – ott, ahol a kutyád boldogan szalad, és te is jól érzed magad. Közös szabadtéri fotózás, ahol nem kell pózolni – csak együtt lenni, és hagyni, hogy a természet tegye a dolgát.
            </p>
          </div>
        </motion.div>
      </section>

      <div>
        <KutyaGallery /> {/* <-- KutyaGallery komponens használata */}
      </div>

      <motion.section
        className="bg-[#F5EDE6] py-16 rounded-3xl mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C79984]">
            Kutyafotózás Árak és Csomagok
          </h1>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Találd meg a tökéletes lehetőséget kedvenced megörökítésére! Az árak Zalaegerszeg területén és közvetlen környékén érvényesek.
          </p>
          <p className="text-[#8b614e] font-bold mt-1 max-w-3xl mx-auto text-xl">
            Minden fotózás egyedi, ahogy minden kutyus is! Ha egyedi elképzeléseid vannak, vagy a csomagoktól eltérő igényeid merülnének fel, bátran keress meg emailen vagy telefonon!
          </p>
        </div>

        <div className="container mx-auto mt-12 px-6 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl text-center flex flex-col justify-between" // Added shadow-xl and flex for equal height
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#C79984]">
                  {pkg.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{pkg.price} <span className="text-lg font-normal">{pkg.priceSuffix}</span></p>
                <p className="text-gray-700 mt-2">{pkg.duration}</p>
                <ul className="mt-4 text-gray-700 space-y-2 text-left">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-3 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-white hover:bg-[#646C5E] transition-all duration-300 transform hover:scale-105"
              >
                Érdekel!
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 p-4 border-t border-gray-300 text-center mx-auto max-w-2xl text-sm"
        >
          <p className="text-gray-700">
            <span className="font-bold">Fontos tudnivalók:</span>
          </p>
          <p className="text-gray-700 mt-2">
            Az alapdíj a fotózási időt és a csomagban meghatározott számú retusált digitális képet tartalmazza.
          </p>
          <p className="text-gray-700 mt-2">
            Kiszállási díj Zalamegyén kívül egyedi megbeszélés alapján.
          </p>
           <p className="text-gray-700 mt-2">
            A fotózás során a kutyus(ok) biztonságáért és viselkedéséért a gazdi(k) felel(nek).
          </p>
        </motion.div>
      </motion.section>

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
    </div>
  );
}