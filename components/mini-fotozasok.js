"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CheckCircle, Calendar, Clock, Sparkles, Snowflake } from "lucide-react";

// SZEZONÁLIS CSOMAGOK (Mini Session fókusz)
const seasonalPackages = [
  {
    title: "Ünnepi Mini",
    price: "30.000 Ft",
    duration: "25-30 perc fotózás",
    features: [
      "Gondosan berendezett ünnepi díszlet",
      "10 db profi, retusált digitális fotó",
      "Online válogató galéria",
      "Maximum 2 felnőtt + 2 gyermek",
      "Gyors átadási határidő (5 munkanap)",
    ],
    popular: false,
  },
  {
    title: "Családi Karácsony",
    price: "39.000 Ft",
    duration: "50-60 perc fotózás",
    features: [
      "Több háttér/helyszín használata",
      "20 db profi, retusált digitális fotó",
      "Minden további kép: 1.790 Ft/db",
      "Online letölthető galéria",
      "Ajándék: 3 db nyomtatott kép (10x15)",
    ],
    popular: true,
  },
  {
    title: "Prémium Ünnepi Emlék",
    price: "49.000 Ft",
    duration: "90 perc fotózás",
    features: [
      "Korlátlan létszám (közeli hozzátartozók)",
      "35 db profi, retusált digitális fotó",
      "Saját, otthoni helyszín lehetősége",
      "Díszdobozos pendrive az összes képpel",
      "Prémium fotókönyv összeállítása",
    ],
    popular: false,
  },
];

export default function SzezonalisFotozas() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Kiemelt képek a karacsony_patriek mappából
  const heroImage = "/images/karacsony_patriek/_47A2289.webp";
  const featureImage = "/images/karacsony_patriek/_47A2964.webp";

  return (
    <div className="bg-white text-gray-800">

      {/* HERO SZEKCIÓ - Ünnepi hangulatban */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={heroImage}
            alt="Karácsonyi családi fotózás"
            fill
            className="object-cover"
            priority
          />
          {/* Finom ünnepi overlay (vöröses-arany árnyalat) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-red-900/10 to-black/60" />
        </motion.div>
        
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-center mb-4 space-x-2 text-amber-400">
               <Snowflake size={20} />
               <Sparkles size={20} />
               <Snowflake size={20} />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic" style={{ fontFamily: "Noto Serif Armenian, serif" }}>
              Ünnepi Pillanatok
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
              Legyen szó Karácsonyról, Húsvétról vagy szezonális Mini fotózásokról, segítek megőrizni az év legszebb ünnepeinek fényét.
            </p>
            <Link href="#ajanlatok" className="bg-red-800 hover:bg-red-900 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:scale-105 inline-block">
              Aktuális ajánlatok megtekintése
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MIÉRT VÁLASSZ MINI FOTÓZÁST? */}
      <section className="py-24 bg-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Clock size={32} />, title: "Gyors & Gördülékeny", text: "A mini sessionök rövidek, így a legkisebbek is végig élvezik a figyelmet." },
              { icon: <Calendar size={32} />, title: "Időszakos díszlet", text: "Minden évben egyedi, az aktuális ünnephez passzoló dekorációval várlak." },
              { icon: <Sparkles size={32} />, title: "Tökéletes Ajándék", text: "A kész képekből készült nyomatok a legszebb ajándékok a nagyszülőknek." },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-6 text-red-800">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI GALÉRIA - Karácsonyi képekkel */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/karacsony_patriek/_47A2095.webp" alt="Karácsony" fill className="object-cover" />
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
              <Image src="/images/karacsony_patriek/_47A2157.webp" alt="Karácsony" fill className="object-cover" />
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/karacsony_patriek/_47A2351.webp" alt="Karácsony" fill className="object-cover" />
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
              <Image src="/images/karacsony_patriek/_47A2438.webp" alt="Karácsony" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CSOMAGOK SZAKASZ */}
      <section id="ajanlatok" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Szezonális Csomagjaink</h2>
            <p className="text-gray-400 italic">Foglalható időszak: Október - December</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {seasonalPackages.map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl border ${pkg.popular ? 'border-red-800 bg-white/5' : 'border-gray-800 bg-transparent'}`}
              >
                {pkg.popular && <span className="text-red-500 font-bold text-xs uppercase tracking-widest block mb-4">Legnépszerűbb</span>}
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-3xl font-bold text-red-500 mb-4">{pkg.price}</p>
                <p className="text-sm text-gray-400 mb-8 flex items-center gap-2"><Clock size={16}/> {pkg.duration}</p>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle size={18} className="text-red-800 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-4 rounded-xl font-bold transition-all ${pkg.popular ? 'bg-red-800 text-white' : 'bg-white text-gray-900'}`}>
                  Lefoglalom az időpontot
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KIEMELT ÉLETKÉP */}
      <section className="relative h-[50vh]">
        <Image src={featureImage} alt="Ünnepi hangulat" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* VÉGSŐ CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "Noto Serif Armenian, serif" }}>Még több információt szeretnél?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            A mini fotózások pontos időpontjait és a választható díszleteket folyamatosan frissítem a közösségi oldalamon is.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg">
              Kapcsolatfelvétel
            </Link>
            <Link href="/galeria" className="border border-gray-300 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
              Teljes galéria
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}