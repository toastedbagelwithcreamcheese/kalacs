"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import KismamaGallery from "@/components/kismamagallery"; // A galéria komponensed
import Link from "next/link";
import { ChevronDown, CheckCircle, Gift, Heart, Users } from "lucide-react";

// --- ÚJ, KISMAMA TÉMÁJÚ CSOMAGOK ---
const maternityPackages = [
  {
    title: "Pocak Varázs Csomag",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 45-60 perc fotózás",
    features: [
      "Előzetes konzultáció a stílusról és helyszínről",
      "8 db profi, gondosan retusált digitális fotó",
      "Minden további retusált kép: 1.990 Ft/db",
      "1 választott helyszín (szabadtér vagy otthon)",
      "1-2 átöltözési lehetőség",
      "Fókuszban a kismama és a pocak szépsége",
      "Online, jelszóval védett válogató galéria",
    ],
    popular: false,
  },
  {
    title: "Családi Álmodozás Csomag",
    price: "34.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 60-90 perc fotózás",
    features: [
      "Részletes konzultáció, közös koncepcióalkotás",
      "15 db profi, művészi retusálású digitális fotó",
      "Minden további retusált kép: 1.790 Ft/db",
      "Akár 2 helyszín (pl. otthon és szabadtér)",
      "Több (2-3) átöltözési lehetőség",
      "Apás, tesós és közös családi képek is készülnek",
      "Igény esetén kellékek és kismamaruhák biztosítása",
      "Online galéria válogatáshoz és letöltéshez",
    ],
    popular: true, // Ezzel jelöljük a legnépszerűbb csomagot
  },
  {
    title: "Örökké Emlék Prémium Csomag",
    price: "49.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 90-120 perc fotózás",
    features: [
      "Mélyreható konzultáció, személyre szabott moodboard",
      "25 db profi, magazin minőségű retusált digitális fotó",
      "Minden további retusált kép: 1.590 Ft/db",
      "Rugalmas helyszínválasztás, akár több helyszínen is",
      "Korlátlan átöltözési lehetőség",
      "Kreatív, lifestyle és klasszikus beállítások vegyesen",
      "Ajándék 10x15-ös prémium fotónyomat a 10 kedvenc képből",
      "Prémium online galéria, akár nyomtatási lehetőséggel",
    ],
    popular: false,
  },
];

// A GYIK adatok megmaradtak, mert relevánsak és hasznosak
const faqData = [
  { question: "Mikor érdemes kismama fotózást készíteni?", answer: "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, de még nem okoz túl nagy kényelmetlenséget." },
  { question: "Milyen ruhát érdemes hozni a fotózásra?", answer: "Ajánlott világos, pasztell színű, testhezálló vagy lágy esésű ruhákat választani, amelyek kiemelik a pocak szépségét. Kényelmes, elegáns viselet ajánlott. Természetesen segítek a választásban!" },
  { question: "Lehet-e a párom és a gyermekem is a képeken?", answer: "Természetesen, sőt, bátorítalak is rá! A fotózás során lehetőség van közös képek készítésére is, hogy az egész család megörökíthesse ezt a különleges időszakot." },
  { question: "Hogyan kapom meg a kész képeket?", answer: "A fotózás után 1-2 napon belül küldök egy online válogató galériát. A kiválasztott képeket általában 7-10 munkanapon belül retusálom és adom át digitálisan, nagy felbontásban." },
];

export default function KismamaFotozasModern() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Placeholder képek - CSERÉLD LE SAJÁT KÉPEIDRE!
  const heroImage = "/images/_MG_4693.webp"; 
  
  return (
    <div className="bg-white text-gray-800">

      {/* HERO SZEKCIÓ (MÓDOSÍTVA) */}
      <motion.section
        className="relative h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center text-white text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 z-0" // Ez a div feszül ki a szülőre, és ezt animáljuk
          initial={{
            scale: 1,
            x: "0%",
            y: "0%",
          }}
          animate={{
            scale: 1.5,
            x: "-2%",
            y: "1%",
          }}
          transition={{
            duration: 25,
            ease: "linear",
          }}
        >
          <Image
            src={heroImage} // CSERÉLD LE A LEGSZEBB KISMAMA KÉPEDRE!
            alt="Gyönyörű kismama egy virágos mezőn naplementében"
            layout="fill"
            objectFit="contain"
            quality={90}
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"></div>
        
        <motion.div
          className="relative z-20 p-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif", textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
          >
            A Várandósság Varázsa
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}>
            Örökítsd meg életed egyik legcsodálatosabb időszakát Zalaegerszegen. Készítsünk együtt finom, meghitt és időtálló képeket, melyek örökre megőrzik a boldog várakozás pillanatait.
          </p>
          <Link href="/contact?subject=Kismamafotozas_ajanlatkeres" legacyBehavior>
            <a className="inline-block bg-[#C79C8D] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#b3897b] transition duration-300 transform hover:scale-105 shadow-lg">
              Időpontot Foglalok
            </a>
          </Link>
        </motion.div>
      </motion.section>

      {/* MIÉRT ÉLMÉNY? SZEKCIÓ */}
      <section className="py-16 sm:py-24 bg-rose-50/30">
        <div className="container mx-auto px-6 text-center">
            <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-gray-800 mb-16"
                initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.6 }}
                style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
                Több Mint Fotózás, Egy Életre Szóló Emlék
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { icon: <Heart size={36} className="text-[#C79C8D]" />, title: "Intim Pillanatok", text: "Egy lehetőség, hogy megállj egy pillanatra és megünnepeld a testedben zajló csodát." },
              { icon: <Users size={36} className="text-[#C79C8D]" />, title: "Családi Kapcsok", text: "Vond be párodat, gyermekeidet is, hogy megörökítsük az első közös családi emléketeket." },
              { icon: <Gift size={36} className="text-[#C79C8D]" />, title: "Időtálló Ajándék", text: "A képek örök emléket jelentenek számodra, és csodálatos ajándékot a születendő gyermekednek." },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y:30 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.5, delay: index * 0.15 }}
              >
                <div className="mb-5 inline-block p-4 bg-white rounded-full shadow-md">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base max-w-xs">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALÉRIA KIEMELŐ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.6 }}
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Pillanatok a Várandósságból
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.6, delay:0.1 }}
          >
            Nézd meg, hogyan látom én a kismama fotózás világát, és meríts inspirációt a saját fotózásodhoz!
          </motion.p>
          <div className="mb-10">
            <KismamaGallery />
          </div>
        </div>
      </section>

      {/* CSOMAGAJÁNLATOK */}
      <section className="py-16 sm:py-24 bg-rose-50/30">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Csomagajánlatok</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto mb-12">Találd meg a Hozzád leginkább illő csomagot, hogy tökéletes formában őrizhesd meg ezeket a pillanatokat.</p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
          {maternityPackages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg flex flex-col transition-all duration-300 ${pkg.popular ? 'border-2 border-[#C79C8D] transform lg:scale-105' : 'border border-gray-200'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {pkg.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#C79C8D] text-white text-xs font-bold px-4 py-1 rounded-full">LEGNÉPSZERŰBB</div>}
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{pkg.title}</h3>
              <p className="text-4xl font-extrabold text-[#C79C8D] mb-1">{pkg.price}</p>
              <p className="text-sm text-gray-500 mb-6">{pkg.duration}</p>
              
              <ul className="text-gray-600 space-y-3 text-sm sm:text-base mb-8 text-left flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact?subject=Kismama_csomag_erdeklodes" legacyBehavior>
                <a className={`w-full inline-block font-semibold py-3 px-6 rounded-lg text-md transition duration-300 transform hover:scale-105 ${pkg.popular ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  Kiválasztom
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GYAKRAN ISMÉTELT KÉRDÉSEK (GYIK) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
              Kérdések és Válaszok
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50/80 rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left p-5 sm:p-6 font-semibold text-gray-700 hover:bg-rose-50/50 focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-md sm:text-lg">{item.question}</span>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : "rotate-0"} text-[#C79C8D]`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-5 sm:px-6 pb-5 text-gray-600 text-base"
                    >
                      <p className="border-l-2 border-[#C79C8D] pl-4">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VÉGSŐ CALL TO ACTION (MÓDOSÍTVA) */}
      <section className="py-20 sm:py-28 bg-rose-50/30">
        <div className="container mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Készen állsz megörökíteni a csodát?</h2>
                <p className="text-lg sm:text-xl mb-10 max-w-xl mx-auto text-gray-600">Beszéljük meg az elképzeléseidet! Vedd fel velem a kapcsolatot egy ingyenes konzultációra, és tervezzük meg együtt a tökéletes kismama fotózásodat.</p>
                <Link href="/contact" legacyBehavior>
                    <a className="inline-block bg-gray-800 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        Kapcsolatfelvétel
                    </a>
                </Link>
            </motion.div>
        </div>
      </section>

    </div>
  );
}