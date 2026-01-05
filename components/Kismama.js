"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import KismamaGallery from "@/components/kismamagallery";
import Link from "next/link";
import { ChevronDown, CheckCircle, Gift, Heart, Users, Camera } from "lucide-react";

const maternityPackages = [
  {
    title: "Pocak Varázs Csomag",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 45-60 perc fotózás",
    features: [
      "Előzetes konzultáció a stílusról és helyszínről",
      "15-20 db profi, retusált digitális fotó",
      "Minden további retusált kép: 1.990 Ft/db",
      "1 választott helyszín (szabadtér vagy otthon)",
      "Online, jelszóval védett válogató galéria",
    ],
    popular: false,
  },
  {
    title: "Családi Álmodozás Csomag",
    price: "24.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 60-90 perc fotózás",
    features: [
      "Részletes konzultáció, koncepcióalkotás",
      "25-30 db profi, retusált digitális fotó",
      "Akár 2 helyszín (pl. otthon és szabadtér)",
      "Apás, tesós és közös családi képek is",
      "Online galéria válogatáshoz és letöltéshez",
    ],
    popular: true,
  },
  {
    title: "Örökké Emlék Prémium",
    price: "34.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 90-120 perc fotózás",
    features: [
      "35+ db profi minőségű retusált digitális fotó",
      "Minden további retusált kép: 1.590 Ft/db",
      "Rugalmas helyszínválasztás",
      "Ajándék 10x15-ös prémium fotónyomat (10db)",
      "Prémium online galéria letöltési lehetőséggel",
    ],
    popular: false,
  },
];

const faqData = [
  { question: "Mikor érdemes kismama fotózást készíteni?", answer: "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, de még nem okoz túl nagy kényelmetlenséget." },
  { question: "Milyen ruhát érdemes hozni a fotózásra?", answer: "Ajánlott világos, pasztell színű, testhezálló vagy lágy esésű ruhákat választani. Kerüld a nagy feliratokat és a túl harsány mintákat." },
  { question: "Lehet-e a párom és a gyermekem is a képeken?", answer: "Természetesen! Sőt, bátorítalak is rá, hiszen ez egy közös családi várakozás." },
  { question: "Hogyan kapom meg a kész képeket?", answer: "A fotózás után 1-2 napon belül küldöm a válogató galériát. A kész, retusált képeket 7-10 munkanapon belül veheted át digitálisan." },
];

export default function KismamaFotozasModern() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // A kért új képek elérési útjai
  const heroImage = "/images/kata_kismama/_47A9158-2.jpg";
  const featuredImage = "/images/kata_kismama/_47A9009-2.jpg";

  return (
    <div className="bg-white text-gray-800 selection:bg-[#C79C8D]/30">
      
      {/* HERO SZEKCIÓ - Stabilabb animációval */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Kismama fotózás hero"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        </motion.div>
        
        <div className="relative z-20 px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.3em] text-sm mb-4 block font-medium">Zalaegerszeg & környéke</span>
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 italic"
              style={{ fontFamily: "Noto Serif Armenian, serif" }}
            >
              Az Anyaság Varázsa
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Örökítsük meg a várakozás legszebb pillanatait finom, természetes és időtálló fotókon.
            </p>
            <Link href="/contact?subject=Kismamafotozas" className="inline-block bg-[#C79C8D] hover:bg-[#b3897b] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#C79C8D]/20 transform hover:-translate-y-1">
              Időpontot foglalok
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-white/70" size={32} />
        </motion.div>
      </section>

      {/* MIÉRT ÉLMÉNY? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
              { icon: <Heart className="text-[#C79C8D]" />, title: "Meghitt hangulat", text: "Feszültségmentes, nyugodt környezetben alkotunk." },
              { icon: <Camera className="text-[#C79C8D]" />, title: "Profi utómunka", text: "Minden kép egyedi, finom retust kap a természetesség jegyében." },
              { icon: <Users className="text-[#C79C8D]" />, title: "Családi élmény", text: "A párod és a nagyobb tesók is a részesei lehetnek." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="mb-6 inline-flex p-5 bg-rose-50 rounded-full group-hover:bg-[#C79C8D] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KIEMELT KÉP SZEKCIÓ - Az új képpel */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={featuredImage}
          alt="Kismama részletfotó"
          fill
          className="object-cover object-fixed"
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* GALÉRIA */}
      <section className="py-24 bg-rose-50/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Portfolio</h2>
            <div className="w-20 h-1 bg-[#C79C8D] mx-auto" />
          </div>
          <KismamaGallery />
        </div>
      </section>

      {/* CSOMAGOK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Választható csomagok</h2>
            <p className="text-gray-500">Minden fotózás egyedi, válasszuk ki az igényeidhez leginkább illőt.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {maternityPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative p-10 rounded-3xl transition-all duration-500 ${
                  pkg.popular ? 'bg-gray-900 text-white shadow-2xl scale-105 z-10' : 'bg-rose-50/50 text-gray-800 hover:bg-rose-50'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#C79C8D] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-2 rounded-full uppercase">
                    Legnépszerűbb
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4 italic">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <p className={`text-sm mt-1 ${pkg.popular ? 'text-gray-400' : 'text-gray-500'}`}>{pkg.duration}</p>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle size={18} className={pkg.popular ? 'text-[#C79C8D]' : 'text-green-600'} />
                      <span className={pkg.popular ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-4 rounded-xl font-bold transition-all ${
                  pkg.popular ? 'bg-[#C79C8D] hover:bg-[#b3897b] text-white' : 'bg-white border border-gray-200 hover:border-[#C79C8D] text-gray-800'
                }`}>
                  Lefoglalom
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GYIK */}
      <section className="py-24 bg-rose-50/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Gyakori kérdések</h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold">{item.question}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-gray-500 border-t border-gray-50 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Megőrizzük az emlékeket?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg">
            Keress bizalommal, és beszéljük át az elképzeléseidet egy kötetlen beszélgetés során.
          </p>
          <Link href="/contact" className="bg-[#C79C8D] hover:bg-[#b3897b] text-white px-12 py-5 rounded-full font-bold transition-all inline-block shadow-2xl">
            Vegyük fel a kapcsolatot
          </Link>
        </div>
      </section>
    </div>
  );
}