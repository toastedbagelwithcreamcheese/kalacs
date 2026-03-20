"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Plus, Minus, ArrowRight, Camera, ChevronDown } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ServiceClient({ data }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  
  // Kezdetben 6 kép jelenik meg
  const [visibleImages, setVisibleImages] = useState(6); 

  const loadMoreImages = () => {
    // 6-osával töltjük be a további képeket
    setVisibleImages(prev => Math.min(prev + 6, data.gallery.length));
  };

  return (
    <div className="bg-white overflow-hidden text-[#5A4A42]">
      
      {/* 1. HERO SZEKCIÓ (Teljes képernyős, fókuszált) */}
      <section className="relative w-full h-screen flex items-center justify-center text-white">
        <Image 
          src={data.heroImage} 
          fill 
          className="object-cover brightness-[0.45]" 
          priority 
          alt={data.title} 
          quality={95}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-akaya drop-shadow-lg mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl font-light text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed"
          >
            {data.heroSubtitle}
          </motion.p>
        </div>
        
        {/* Gördítésre ösztönző nyíl */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-white/70" size={32} />
        </motion.div>
      </section>

      {/* 2. AZ ÉLMÉNYRŐL */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 md:py-24 container mx-auto px-6"
      >
         <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79C8D] mb-4">
              <Camera size={16} /> Az élményről
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold font-akaya text-[#5A4A42] mb-8">
              Történetek, amiket érdemes megörökíteni
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed text-base md:text-lg">
              {data.description}
            </motion.p>
         </div>
      </motion.section>

      {/* 3. GALÉRIA (Részleges betöltéssel) */}
      <section className="py-20 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79C8D] mb-4">
              <Camera size={16} /> Galéria
            </div >
            <h2 className="text-3xl md:text-5xl font-bold font-akaya text-[#5A4A42]">
              Pillanatok a portfólióból
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {data.gallery.slice(0, visibleImages).map((img, idx) => (
                <motion.div 
                  key={img.src + idx} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid rounded-2xl overflow-hidden shadow-md group cursor-pointer relative"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <Image 
                    src={img.src} 
                    alt={img.alt || "Galéria kép"} 
                    width={600} 
                    height={800} 
                    className="hover:scale-105 transition-transform duration-700 w-full object-cover" 
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="text-white w-8 h-8 drop-shadow-md" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tovább gomb */}
          {visibleImages < data.gallery.length && (
            <div className="text-center mt-12">
              <button 
                onClick={loadMoreImages}
                className="text-[#5A4A42] font-bold border-b-2 border-[#5A4A42] hover:text-[#C79C8D] hover:border-[#C79C8D] transition-all pb-1 text-sm md:text-base"
              >
                További képek betöltése ({data.gallery.length - visibleImages} db)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. ÁRTÁBLÁZAT */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center font-akaya mb-16 text-[#5A4A42]">Csomagajánlatok</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {data.packages.map((pkg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className={`bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border transition-transform duration-300 flex flex-col relative ${pkg.popular ? "border-[#C79C8D] scale-100 lg:scale-105 z-10" : "border-gray-100"}`}
              >
                {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C79C8D] text-white px-5 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-md">
                        Ajánlott
                    </div>
                )}
                <h3 className="text-2xl font-bold font-akaya mb-2 text-[#5A4A42] text-center">{pkg.title}</h3>
                <p className="text-xs text-gray-500 mb-6 text-center uppercase tracking-widest">{pkg.duration}</p>
                <div className="text-4xl font-bold text-[#C79C8D] mb-8 text-center font-akaya">{pkg.price}</div>
                <ul className="space-y-3 mb-10 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle size={18} className="text-[#C79C8D] shrink-0 mt-0.5" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-3.5 rounded-full font-bold text-sm transition-colors shadow-md ${pkg.popular ? "bg-[#5A4A42] text-white hover:bg-[#C79C8D]" : "bg-[#F9F5F1] text-[#5A4A42] hover:bg-[#C79C8D] hover:text-white"}`}>
                  Ajánlatkérés
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GYIK */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-20 bg-[#F9F5F1]">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center font-akaya mb-12 text-[#5A4A42]">Gyakori Kérdések</h2>
            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <button 
                    className="w-full flex justify-between items-center p-5 md:p-6 text-left group"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  >
                    <span className="text-base md:text-lg font-bold text-[#5A4A42] group-hover:text-[#C79C8D] transition-colors">
                      {item.question}
                    </span>
                    <div className={`p-2 rounded-full transition-colors ${openFaqIndex === idx ? "bg-[#C79C8D] text-white" : "bg-gray-100 group-hover:bg-[#C79C8D]/10 text-[#5A4A42]"}`}>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${openFaqIndex === idx ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 md:px-6 pb-6 pt-0 text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-50 mt-3 pt-3">
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
      )}

      {/* 6. CTA */}
      <section className="py-20 md:py-24 bg-[#5A4A42] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold font-akaya mb-6">
            Készen állsz a közös fotózásra?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Keress bizalommal, és beszéljük át az elképzeléseidet egy kötetlen beszélgetés során.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C79C8D] text-white font-bold py-3.5 px-8 rounded-full hover:bg-white hover:text-[#5A4A42] transition-all shadow-lg hover:-translate-y-1">
            Kapcsolatfelvétel <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      
      {/* LIGHTBOX */}
      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={data.gallery.map(img => ({ src: img.src, alt: img.alt }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />

    </div>
  );
}