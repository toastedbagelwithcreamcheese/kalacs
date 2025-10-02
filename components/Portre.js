"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PortreGallery from "@/components/portregallery"; // Feltételezzük, hogy ez a komponens létezik
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import {
  ChevronDown,
  Camera,
  Sparkles,
  Users,
  Gift,
  Palette,
  MapPin,
  Edit3,
  CheckCircle,
} from "lucide-react"; // Ikonok

// A csomagokat itt hagyom az előző verzióból, ahogy kérted
const packages = [
  {
    title: "Alap Portré Csomag",
    price: "14.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 1 óra fotózás",
    features: [
      "Előzetes online vagy telefonos konzultáció",
      "10-15 db profi, természetesen retusált digitális portré",
      "Minden további retusált kép: 1.990 Ft/db",
      "1 választott helyszín Zalaegerszegen (szabadtér/otthon)",
      "1-2 átöltözési lehetőség",
      "Változatos beállítások (teljes alakos, közeli stb.)",
      "Kreatív ötletek megvalósítása, személyes tárgyak bevonása",
      "Online válogató galéria",
    ],
    category: "portrait_package",
  },
  {
    title: "Prémium Portré Csomag",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 90 perc fotózás",
    features: [
      "Részletes konzultáció, közös koncepcióalkotás",
      "20-30 db profi, művészi retusálású digitális portré",
      "Minden további retusált kép: 1.790 Ft/db",
      "Akár 2 helyszín Zalaegerszegen és környékén",
      "Több (2-3) átöltözési lehetőség",
      "Változatos beállítások (teljes alakos, közeli stb.)",
      "Online galéria válogatáshoz és letöltéshez",
      "Kreatív ötletek megvalósítása, személyes tárgyak bevonása",
    ],
    category: "portrait_package",
  },
];

const faqData = [
  {
    question: "Milyen ruhákat hozzak a fotózásra?",
    answer:
      "Válassz olyan ruhákat, amikben jól érzed magad és tükrözik a stílusodat! Általában 2-3 különböző szettet javaslok. Kerüld a nagyon apró mintás vagy nagy feliratos darabokat. A fotózás előtt természetesen átbeszéljük a részleteket.",
  },
  {
    question: "Szükséges sminkes/fodrász?",
    answer:
      "Egy profi smink és frizura sokat hozzáadhat a képekhez, de nem kötelező.",
  },
  {
    question: "Hol zajlik a fotózás?",
    answer:
      "A helyszín teljesen rugalmas! Lehet kedvenc szabadtéri helyed Zalaegerszegen, egy hangulatos kávézó, a saját otthonod, vagy akár stúdiót is bérelhetünk (ennek díja külön tétel lehet). A lényeg, hogy olyan környezetet válasszunk, ami illik a koncepcióhoz és ahol komfortosan érzed magad.",
  },
  {
    question: "Mennyi idő után kapom meg a képeket?",
    answer:
      "A fotózás után 1-2 napon belül küldök egy online válogató galériát. A kiválasztott képeket általában 7-10 munkanapon belül retusálom és adom át digitálisan, nagy felbontásban.",
  },
  {
    question: "Mit tegyek, ha izgulok a fotózás miatt?",
    answer:
      "Teljesen természetes egy kis izgalom! Célom, hogy a fotózás egy kellemes, felszabadult élmény legyen. Sokat fogunk beszélgetni, és segítek majd a pózokban, hogy a lehető legtermészetesebb és legelőnyösebb képek szülessenek rólad.",
  },
];

export default function PortreFotozasModern() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Placeholder képek - ezeket cseréld le saját, jó minőségű portréidra!
  const heroImage = "/images/_MG_0315-2.webp"; // NAGY, LÁTVÁNYOS HERO KÉP
  const whyImage1 = "/images/Virag_BP/1_1.webp";
  const whyImage2 = "/images/_MG_0490.webp";
  const whyImage3 = "/images/_MG_9381.webp";

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* HERO SZEKCIÓ */}
      <motion.section
        className="relative h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center text-white text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Ezt a motion.div-et animáljuk, és ez tartalmazza a képet */}
        <motion.div
          className="absolute inset-0 z-0" // Ez a div feszül ki a szülőre, és ezt animáljuk
          initial={{
            scale: 1.05,
            x: "0%",
            y: "0%",
          }}
          animate={{
            scale: 2,
            x: "-2%",
            y: "1%",
          }}
          transition={{
            duration: 25,
            ease: "linear",
          }}
        >
          <Image
            src={heroImage}
            alt="Lenyűgöző portréfotó"
            layout="fill"
            objectFit="contain" // A cover helyett: megőrzi az arányokat
            quality={90}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>{" "}
        {/* Sötétítő réteg */}
        <motion.div
          className="relative z-20 p-6 max-w-3xl" // Ez a szöveges tartalom konténere
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{
              fontFamily: "Noto Serif Armenian, sans-serif",
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Fedezd fel Önmagad – Egyedi Portrék Budapesten és Zalaegerszegen
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl mb-8 font-light"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
          >
            Engedd, hogy professzionális fotókon keresztül megmutassam valódi
            szépséged és egyéniséged. Több mint fotózás – egy élmény, ami rólad
            szól.
          </p>
          <Link
            href="/contact?subject=Portrefotozas_ajanlatkeres"
            legacyBehavior
          >
            <a className="inline-block bg-[#C79984] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#b3897b] transition duration-300 transform hover:scale-105 shadow-lg">
              Ajánlatot Kérek
            </a>
          </Link>
        </motion.div>
      </motion.section>

      {/* A PORTRÉ VARÁZSA SZEKCIÓ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Miért Érdemes Profi Portrét Készíttetned?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Egy portréfotózás sokkal többet ad, mint néhány szép kép. Ez egy
            lehetőség, hogy kapcsolódj önmagaddal, növeld az önbizalmad és
            maradandó emléket teremts.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                icon: <Sparkles size={40} className="text-[#C79984]" />,
                title: "Önbizalom és Önkifejezés",
                text: "Lásd magad új fényben! Egy profi sorozat segít felfedezni és megmutatni valódi énedet, növelve magabiztosságodat.",
                image: whyImage1,
              },
              {
                icon: <Camera size={40} className="text-[#C79984]" />,
                title: "Profi Megjelenés",
                text: "Legyen szó üzleti portréról LinkedIn-re, önéletrajzhoz, vagy csak egy igényes profilképről – a minőség itt kezdődik.",
                image: whyImage2,
              },
              {
                icon: <Gift size={40} className="text-[#C79984]" />,
                title: "Örök Emlék, Egyedi Ajándék",
                text: "Ajándékozd meg magad vagy szeretteidet egy időtálló élménnyel és olyan képekkel, amelyek generációkon át mesélnek.",
                image: whyImage3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-4 inline-block p-3 bg-[#C79984] bg-opacity-10 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFÓLIÓ KIEMELŐ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Pillants Bele a Munkáimba
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Minden fotózás egyedi történet. Nézd meg, hogyan látom én a portrék
            világát, és meríts inspirációt a saját fotózásodhoz!
          </motion.p>
          <div className="mb-10">
            <PortreGallery /> {/* Itt jelenik meg a galéria komponensed */}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/portre-galeria">
              {" "}
              {/* Módosítsd a linket a teljes galéria oldaladra */}
              <a className="inline-block bg-transparent border-2 border-[#C79984] text-[#C79984] font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#C79984] hover:text-white transition duration-300 transform hover:scale-105">
                Teljes Portré Galéria Megtekintése
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AZ ALKOTÁS LÉPÉSEI */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
              Az Álomból Valóság: Így Dolgozunk Együtt
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Együttműködésünk minden pillanata Rólad szól, hogy a végeredmény
              tökéletesen tükrözze egyéniségedet.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Users size={36} className="text-white" />,
                title: "1. Kapcsolat & Koncepció",
                text: "Egy laza beszélgetéssel kezdünk, ahol megismerem az elképzeléseidet, stílusodat, és közösen ötletelünk a tökéletes fotózásról.",
              },
              {
                icon: <Palette size={36} className="text-white" />,
                title: "2. A Varázslat Napja",
                text: "A kiválasztott helyszín(ek)en, nyugodt és kreatív légkörben elkészítjük a felvételeket. Segítek a pózokban, hogy igazán magabiztosnak érezd magad.",
              },
              {
                icon: <CheckCircle size={36} className="text-white" />,
                title: "3. Kiválasztás & Tökéletesítés",
                text: "Online galériából választhatod ki kedvenc képeidet, melyeket professzionális utómunkával teszek még lenyűgözőbbé.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="mb-5 inline-block p-4 bg-[#C79984] rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSOMAGAJÁNLATOK */}
      <motion.section
        className="py-16 sm:py-24 bg-gray-50" // Vissza a világosabb háttérre
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Portré Fotózás Csomagok
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto mb-10">
            Találd meg a Hozzád leginkább illő csomagot, vagy kérj teljesen
            egyedi, személyre szabott ajánlatot!
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#C79984] mb-3">
                  {pkg.title}
                </h3>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
                  {pkg.price}
                </p>
                <p className="text-sm text-gray-500 mb-3">{pkg.priceSuffix}</p>
                <p className="text-gray-600 mb-6 text-sm">{pkg.duration}</p>
                <ul className="text-gray-600 space-y-2 text-left text-sm sm:text-base mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact?subject=Portrecsomag_erdeklodes"
                legacyBehavior
              >
                <a className="w-full inline-block bg-[#646C5E] text-white font-semibold py-3 px-6 rounded-lg text-md hover:bg-[#52584e] transition duration-300 transform hover:scale-105">
                  Érdekel a csomag
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto text-center px-6 mt-10">
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            <strong className="text-[#8b614e]">
              Teljesen rugalmas vagyok:
            </strong>{" "}
            Ha a csomagok nem fedik le pontosan az elképzeléseidet, ne habozz
            felvenni velem a kapcsolatot egyedi ajánlatért! Minden részletet
            személyre szabhatunk.
          </p>
        </div>
      </motion.section>

      {/* GYAKRAN ISMÉTELT KÉRDÉSEK (GYIK) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
              Gyakori Kérdések
            </h2>
            <p className="text-lg text-gray-600">
              Itt megtalálod a válaszokat a leggyakrabban felmerülő kérdésekre.
            </p>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left p-5 sm:p-6 font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                >
                  <span className="text-md sm:text-lg">{item.question}</span>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${
                      openFaqIndex === index ? "rotate-180" : "rotate-0"
                    } text-[#C79984]`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-5 sm:px-6 pb-5 text-gray-600 text-sm sm:text-base"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VÉGSŐ CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Készen állsz, hogy megörökítsük a legjobb formádat?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl mb-10 max-w-xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vedd fel velem a kapcsolatot, és beszéljük meg, hogyan valósíthatjuk
            meg álmaid portréit Zalaegerszegen!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" legacyBehavior>
              <a className="inline-block bg-[#C79984] text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-[#b3897b] transition duration-300 transform hover:scale-105 shadow-lg">
                Írj Nekem!
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
