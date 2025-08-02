"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FamilyGallery from "@/components/familysessiongallery";
import Link from "next/link";
import { ChevronDown, CheckCircle, Gift, Camera, Sun, Laugh, ArrowRight } from "lucide-react";

// --- CSALÁDI FOTÓZÁS CSOMAGOK ---
const familyPackages = [
  {
    title: "Mini Családi Kaland",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 1 óra fotózás",
    features: [
      "Ideális kisebb családoknak vagy egy gyors sorozathoz",
      "10-15 db profi, természetes stílusban retusált digitális fotó",
      "Minden további retusált kép: 1.990 Ft/db",
      "1 választott szabadtéri helyszín Zalaegerszegen",
      "Játékos, spontán pillanatok megörökítése",
      "Online, jelszóval védett válogató galéria",
    ],
    popular: false,
  },
  {
    title: "Nagy Családi Élmény",
    price: "24.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 90 perc fotózás",
    features: [
      "Előzetes konzultáció, közös ötletelés",
      "20-25 db profi, művészi retusálású digitális fotó",
      "Minden további retusált kép: 1.790 Ft/db",
      "Rugalmas helyszínválasztás, akár 2 közeli helyszínen is",
      "Több beállítás: közös képek, gyerekek külön, szülők kettesben",
      "1-2 átöltözési lehetőség, ha szeretnétek",
      "Online galéria válogatáshoz és letöltéshez",
    ],
    popular: true,
  },
  {
    title: "Prémium Csomag",
    price: "34.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 120 perc fotózás",
    features: [
      "Tökéletes választás nagyszülőkkel, több generációval",
      "Kb 35 db prémium minőségű retusált digitális fotó",
      "Minden további retusált kép: 1.590 Ft/db",
      "Kényelmes, ráérős tempó, mindenkire figyelve",
      "Különböző családi konstellációk lefotózása",
      "Ajándék 10x15-ös prémium fotónyomat a 10 kedvenc képből",
      "Prémium online galéria, egyszerű megosztási lehetőséggel",
    ],
    popular: false,
  },
];

// --- CSALÁDI FOTÓZÁS GYIK ---
const faqData = [
    { question: "Mit vegyünk fel a fotózásra?", answer: "A legfontosabb a kényelem! Válasszatok egymással harmonizáló, de nem teljesen egyforma ruhákat. A pasztell és földszínek mindig jól működnek. Kerüljük a nagy feliratokat és az apró, zavaró mintákat. Szívesen segítek a ruhák összeállításában is!" },
    { question: "Mi történik, ha a gyerekek nyűgösek vagy nem akarnak fotózkodni?", answer: "Semmi gond, ez a legtermészetesebb dolog! A fotózás nem egy merev esemény, hanem egy közös játék. Sokat mozgunk, játszunk, futkározunk. Mindig a gyerekek tempójához igazodom, a cél, hogy ők is élvezzék. A legjobb képek általában pont a spontán, felszabadult pillanatokban születnek." },
    { question: "Hol legyen a fotózás?", answer: "Bárhol, ahol jól érzitek magatokat! Lehet a kedvenc játszóteretek, egy közeli erdő, tópart, vagy akár a saját kertetek is. A lényeg, hogy a környezet természetes és biztonságos legyen a család számára." },
    { question: "Hozhatjuk a kutyánkat is?", answer: "Természetesen! A háziállatok a család teljes jogú tagjai, így őket is szeretettel várom a fotózáson." },
];

export default function CsaladiFotozasPageDistinct() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Placeholder képek - CSERÉLD LE SAJÁT KÉPEIDRE!
  const heroImage = "/images/_MG_8762.webp"; 
  const featureImage1 = "/images/_MG_4764.webp";
  const featureImage2 = "/images/_MG_8653.webp";
  const featureImage3 = "/images/_MG_4795.webp";
  
  return (
    <div className="bg-[#FBF9F4] text-gray-800"> {/* Új, meleg törtfehér háttér */}

      {/* HERO SZEKCIÓ - ÚJ ELRENDEZÉS */}
      <section className="container mx-auto px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              A Családotok Története, 
              <span className="block text-amber-600 mt-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
                Képekben Elmesélve
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Játékos, őszinte és élettel teli családi fotózás Zalaegerszegen, ahol a valódi, megismételhetetlen pillanatoké a főszerep. Örökítsük meg együtt a nevetést és az öleléseket!
            </p>
            <Link href="/contact?subject=Csaladi_fotozas_erdeklodes" legacyBehavior>
              <a className="inline-block mt-8 bg-amber-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition duration-300 transform hover:scale-105 shadow-lg">
                Közös Kaland Indítása
              </a>
            </Link>
          </motion.div>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src={heroImage} // CSERÉLD LE A LEGSZEBB CSALÁDI KÉPEDRE!
              alt="Boldog család játszik a szabadban"
              width={600}
              height={750}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* MIÉRT ÉLMÉNY? - ÚJ CIKK-CAKK ELRENDEZÉS */}
      <section className="py-16 sm:py-24 space-y-20">
        {[
          { icon: <Laugh size={36} className="text-amber-600" />, title: "Őszinte, Játékos Pillanatok", text: "Elfelejtjük a merev beállításokat. A cél, hogy felszabadultan játsszatok, nevessetek, és én közben elkapjam a valódi, őszinte érzelmeket, a huncut mosolyokat és a szoros öleléseket.", image: featureImage1, imageLeft: false },
          { icon: <Sun size={36} className="text-amber-600" />, title: "Kaland a Szabadban", text: "A természet adja a legszebb hátteret és a legjobb fényeket. Egy közös séta vagy játék a szabadban felszabadult élmény az egész családnak, ahol a gyerekek igazán önmaguk lehetnek.", image: featureImage2, imageLeft: true },
          { icon: <Gift size={36} className="text-amber-600" />, title: "Ajándék a Jövőnek", text: "Ezek a képek idővel egyre értékesebbé válnak. Egy kincs, amit a gyermekeitek és unokáitok évek múltán is boldogan fognak nézegetni, felidézve a közös emlékeket.", image: featureImage3, imageLeft: false },
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className={`flex justify-center ${item.imageLeft ? 'md:order-1' : 'md:order-2'}`}>
              <Image src={item.image} alt={item.title} width={500} height={500} className="rounded-xl shadow-xl w-full object-cover aspect-square" />
            </div>
            <div className={`text-center md:text-left ${item.imageLeft ? 'md:order-2' : 'md:order-1'}`}>
              <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">{item.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </section>
      
      {/* GALÉRIA KIEMELŐ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Ízelítő a Családi Történetekből</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Néhány kedvenc pillanatom, melyek bemutatják a családi fotózásaim hangulatát.</p>
            <div className="mb-10">
                <FamilyGallery />
            </div>
        </div>
      </section>

      {/* CSOMAGAJÁNLATOK - ÚJ DIZÁJN */}
      <section className="py-16 sm:py-24 bg-[#FBF9F4]">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Családi Fotós Csomagok</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto mb-12">Válasszátok ki a számotokra legideálisabb csomagot, hogy a családi élményből kézzelfogható emlék legyen.</p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
          {familyPackages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative bg-white p-8 rounded-xl shadow-md flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 ${pkg.popular ? 'border-amber-500' : 'border-gray-200'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {pkg.popular && <div className="absolute top-6 -right-4 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-r-full rounded-l-sm shadow-md transform -rotate-0">NÉPSZERŰ</div>}
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{pkg.title}</h3>
              <p className="text-4xl font-extrabold text-gray-800 mb-1">{pkg.price}</p>
              <p className="text-sm text-gray-500 mb-6">{pkg.duration}</p>
              
              <ul className="text-gray-600 space-y-3 text-sm sm:text-base mb-8 text-left flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle size={18} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact?subject=Csaladi_csomag_erdeklodes" legacyBehavior>
                <a className={`w-full inline-block font-semibold py-3 px-6 rounded-lg text-md transition duration-300 ${pkg.popular ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
                  Érdekel a csomag
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GYAKRAN ISMÉTELT KÉRDÉSEK (GYIK) - ÚJ STÍLUS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
            Gyakori Kérdések
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-[#FBF9F4] rounded-lg overflow-hidden border border-gray-200/80"
                initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left p-5 sm:p-6 font-semibold text-gray-700 hover:bg-amber-50/50 focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-md sm:text-lg">{item.question}</span>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : "rotate-0"} text-amber-600`}
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
                      <p className="border-l-2 border-amber-500 pl-4">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VÉGSŐ CALL TO ACTION */}
      <section className="py-20 sm:py-28 bg-rose-50/30">
        <div className="container mx-auto px-6 text-center py-20 sm:py-24">
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black" style={{ fontFamily: "Noto Serif Armenian, sans-serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Készen álltok a közös kalandra?</h2>
                <p className="text-lg sm:text-xl mb-10 max-w-xl mx-auto text-black/90">Írjatok nekem, és beszéljük meg az elképzeléseiteket! Tervezzük meg együtt a családotokhoz tökéletesen illő fotózást.</p>
                <Link href="/contact" legacyBehavior>
                    <a className="inline-block bg-white text-amber-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-amber-50 transition duration-300 transform hover:scale-105 shadow-xl">
                        Üzenetet Írok
                    </a>
                </Link>
            </motion.div>
        </div>
      </section>

    </div>
  );
}