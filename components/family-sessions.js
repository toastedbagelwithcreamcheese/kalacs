"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CheckCircle, Gift, Camera, Sun, Laugh, ArrowRight, X, Heart, ArrowUpRight, Clock } from "lucide-react";

// --- ADATOK (Változatlan tartalom) ---

const galleryImages = [
  { src: "/images/_MG_8762.webp", alt: "Családi pillanat a réten" },
  { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "Karácsonyi hangulat" },
  { src: "/images/_MG_8653.webp", alt: "Anya és gyermeke" },
  { src: "/images/_MG_0017-2.webp", alt: "Gyerekek játéka" },
  { src: "/images/_MG_8762.webp", alt: "Boldog család" },
  { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "Mosolygós portré" },
];

const familyPackages = [
  {
    title: "Mini Családi Kaland",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 1 óra fotózás",
    features: [
      "Ideális kisebb családoknak vagy egy gyors sorozathoz",
      "20-25 db profi, természetes stílusban retusált digitális fotó",
      "Minden további retusált kép: 990 Ft/db",
      "1 választott szabadtéri helyszín",
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
      "30-35 db profi, művészi retusálású digitális fotó",
      "Minden további retusált kép: 990 Ft/db",
      "Akár 2 helyszín a változatosságért",
      "Több beállítás: közös képek, gyerekek külön, szülők kettesben",
      "Átöltözési lehetőség",
    ],
    popular: true, // Kiemelt csomag
  },
  {
    title: "Prémium Generációk",
    price: "34.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 120 perc fotózás",
    features: [
      "Tökéletes választás nagyszülőkkel, több generációval",
      "Kb 50 db prémium minőségű retusált digitális fotó",
      "Minden további retusált kép: 990 Ft/db",
      "Kényelmes, ráérős tempó, mindenkire figyelve",
      "Ajándék 10x15-ös prémium fotónyomat a 10 kedvenc képből",
      "Prémium online galéria",
    ],
    popular: false,
  },
];

const faqData = [
  { 
    question: "Mit vegyünk fel a fotózásra?", 
    answer: "A legfontosabb a kényelem! Válasszatok egymással harmonizáló, de nem teljesen egyforma ruhákat. A pasztell és földszínek (bézs, barna, fehér, mustár) mindig jól működnek a képeimen. Kerüljük a nagy feliratokat." 
  },
  { 
    question: "Mi történik, ha a gyerekek nyűgösek?", 
    answer: "Semmi gond! A fotózás nálam játék. Tapasztalatból tudom, hogyan tereljük el a figyelmüket. A hiszti utáni nevetésekből születnek sokszor a legjobb képek." 
  },
  { 
    question: "Hol legyen a fotózás?", 
    answer: "Zalaegerszeg környékén a természetben (erdő, mező), ahol a gyerekek szabadon szaladgálhatnak. De szívesen megyek a saját kertetekbe is." 
  },
  { 
    question: "Hozhatjuk a kutyánkat is?", 
    answer: "Természetesen! A háziállatok a család teljes jogú tagjai, imádom, ha ők is rajta vannak a képeken." 
  },
];

// --- FŐ KOMPONENS ---

export default function FamilyPhotographySection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [visibleImages, setVisibleImages] = useState(6); 

  // Kiemelt kép
  const heroImage = "/images/_MG_8762.webp"; 

  return (
    <div className="bg-white text-[#5A4A42] font-sans">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="container mx-auto px-6 py-16 lg:py-24 overflow-hidden bg-[#F9F5F1] rounded-b-[3rem]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Szöveges rész */}
          <motion.div 
            className="text-center lg:text-left z-10"
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white text-[#C79C8D] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm border border-[#C79C8D]/20">
              Zalaegerszeg és környéke
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-akaya text-[#5A4A42] leading-tight mb-6">
              Családi Fotózás <br />
              <span className="text-[#C79C8D] italic">
                Őszinte pillanatok
              </span>
            </h1>
            <p className="text-lg text-[#5A4A42]/80 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Felejtsétek el a feszengést és a "csíz"-t. Nálam a fotózás közös játék, séta és nevetés. 
              Örökítsük meg a valódi öleléseket és a gyerekek huncut mosolyát.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/contact?subject=Csaladi_fotozas_erdeklodes" 
                className="px-8 py-3 bg-[#C79C8D] text-white rounded-full font-bold hover:bg-[#b08572] transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                Időpontot kérek <ArrowUpRight size={20} />
              </Link>
              <Link 
                href="#gallery" 
                className="px-8 py-3 border-2 border-[#5A4A42] text-[#5A4A42] rounded-full font-bold hover:bg-[#5A4A42] hover:text-white transition-all duration-300"
              >
                Galéria
              </Link>
            </div>
          </motion.div>

          {/* Kép rész */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
              <Image
                src={heroImage}
                alt="Boldog család"
                width={600}
                height={800}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MIÉRT ÉN? (GRID) - Style matching ServicesGrid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-akaya text-[#5A4A42]">Miért lesz ez élmény?</h2>
            <p className="text-[#5A4A42]/70 mt-2 text-lg">Nem csak fotózni megyünk, hanem kikapcsolódni.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Laugh size={40} className="text-[#C79C8D]" />, 
                title: "Játékos, Spontán", 
                text: "A cél, hogy felszabadultan játsszatok, nevessetek. Én közben elkapjam a valódi érzelmeket." 
              },
              { 
                icon: <Sun size={40} className="text-[#C79C8D]" />, 
                title: "A Természetben", 
                text: "A legszebb hátteret a természet adja. Naplemente, erdő széle, vagy egy vadvirágos rét." 
              },
              { 
                icon: <Heart size={40} className="text-[#C79C8D]" />, 
                title: "Örök Emlék", 
                text: "Ezek a képek idővel egyre értékesebbé válnak. Egy kincs, amit az unokáitok is boldogan fognak nézegetni." 
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-[#F9F5F1] p-10 rounded-3xl text-center shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-[#C79C8D]/20 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-6 bg-white w-20 h-20 mx-auto rounded-full items-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                </div>
                <h3 className="text-2xl font-bold font-akaya text-[#5A4A42] mb-4">{item.title}</h3>
                <p className="text-[#5A4A42]/80 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GALÉRIA */}
      <section id="gallery" className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center font-akaya text-[#5A4A42] mb-12">Pillanatok</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.slice(0, visibleImages).map((img, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl cursor-pointer shadow-md group"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <Camera className="text-white w-10 h-10 drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {visibleImages < galleryImages.length && (
          <div className="text-center mt-10">
            <button 
              onClick={() => setVisibleImages(prev => prev + 3)}
              className="text-[#C79C8D] font-bold text-lg hover:text-[#5A4A42] transition-colors underline underline-offset-4 decoration-2"
            >
              További képek mutatása
            </button>
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#5A4A42]/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full p-2">
              <X size={32} />
            </button>
            <div className="relative w-full max-w-5xl h-[85vh]">
              <Image 
                src={selectedImage} 
                alt="Nagyított kép" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. ÁRAK */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center font-akaya text-[#5A4A42] mb-16">Csomagajánlatok</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {familyPackages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-[2rem] p-8 flex flex-col h-full transition-all duration-300 border ${
                  pkg.popular 
                    ? 'border-[#C79C8D] shadow-2xl scale-105 z-10 ring-4 ring-[#C79C8D]/10' 
                    : 'border-gray-100 shadow-xl hover:shadow-2xl'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C79C8D] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Legnépszerűbb
                  </div>
                )}
                
                <h3 className="text-2xl font-bold font-akaya text-[#5A4A42] mb-2 text-center">{pkg.title}</h3>
                <div className="text-center mb-8 pb-6 border-b border-gray-100">
                  <span className="text-4xl font-bold text-[#C79C8D] block mb-2">{pkg.price}</span>
                  <span className="text-sm text-[#5A4A42]/60">{pkg.priceSuffix}</span>
                  <div className="mt-4 text-sm text-[#5A4A42] font-semibold bg-[#F9F5F1] inline-block px-4 py-2 rounded-full">
                    <Clock size={16} className="inline mr-2 -mt-1"/>
                    {pkg.duration}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-[#5A4A42]/80 text-sm leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-[#C79C8D] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact?subject=Csaladi_csomag_erdeklodes"
                  className={`block w-full text-center py-4 rounded-full font-bold transition-all shadow-md ${
                    pkg.popular 
                      ? 'bg-[#5A4A42] text-white hover:bg-[#463932]' 
                      : 'bg-[#F9F5F1] text-[#5A4A42] hover:bg-[#C79C8D] hover:text-white'
                  }`}
                >
                  Ez érdekel
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GYIK */}
      <section className="container mx-auto px-6 py-20 max-w-3xl">
        <h2 className="text-3xl font-bold font-akaya text-[#5A4A42] mb-10 text-center">
          Gyakran Ismételt Kérdések
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-[#F9F5F1] rounded-2xl p-2 transition-all">
              <button
                className="w-full flex justify-between items-center text-left font-bold text-lg text-[#5A4A42] p-4 hover:text-[#C79C8D] transition-colors focus:outline-none"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span>{item.question}</span>
                <div className={`p-2 rounded-full bg-white transition-transform duration-300 ${openFaqIndex === index ? "rotate-180 bg-[#C79C8D] text-white" : ""}`}>
                    <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-6 pt-0 text-[#5A4A42]/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA - ZÁRÁS (Ugyanaz mint a Home oldalon) */}
      <div className="bg-[#5A4A42] py-20 px-4 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-akaya">
          Készen álltok a közös kalandra?
        </h2>
        <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
          A legszebb pillanatok most történnek. Örökítsük meg a családotok boldogságát még ma!
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-white text-[#5A4A42] font-bold py-4 px-10 rounded-full text-lg hover:bg-[#F7E7CE] transition-colors shadow-lg"
        >
          Kapcsolatfelvétel
        </Link>
      </div>

    </div>
  );
}