"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Plus, Minus, ArrowRight, Camera, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import TiltCard from "@/components/TiltCard";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ServiceClient({ data }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleImages, setVisibleImages] = useState(6); 

  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 6, data.gallery?.length || 0));
  };

  return (
    <div className="bg-white overflow-hidden text-[#5A4A42]">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative w-full h-screen flex items-center justify-center text-white">
        <Image 
          src={data.heroImage} 
          fill 
          className="object-cover brightness-[0.45]" 
          priority 
          alt={data.title} 
          quality={95}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-akaya drop-shadow-lg mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-2xl font-light text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed"
          >
            {data.heroSubtitle}
          </motion.p>
        </div>
        
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
        className="py-20 md:py-32 container mx-auto px-6"
      >
         <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79C8D] mb-6">
              <Camera size={16} /> Az élményről
            </motion.div>
            <motion.p variants={fadeIn} className="text-[#5A4A42] leading-relaxed text-lg md:text-xl font-light">
              {data.description}
            </motion.p>
         </div>
      </motion.section>

      {/* 3. GALÉRIA */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 md:py-32 bg-[#F9F5F1] rounded-t-[3rem]">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-akaya text-[#5A4A42]">
                Pillanatok a portfólióból
              </h2>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {data.gallery.slice(0, visibleImages).map((img, idx) => (
                  <motion.div
                    key={img.src + idx}
                    initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, delay: Math.min((idx % 6) * 0.05, 0.4), ease: "easeOut" }}
                    style={{ perspective: 800 }}
                    className="break-inside-avoid rounded-2xl overflow-hidden shadow-md cursor-pointer relative"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <TiltCard tiltStrength={6} glare={false}>
                      <Image
                        src={img.src}
                        alt={img.alt || "Galéria kép"}
                        width={600}
                        height={800}
                        className="group-hover:scale-105 transition-transform duration-700 w-full object-cover"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Camera className="text-white w-8 h-8 drop-shadow-md" />
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {visibleImages < data.gallery.length && (
              <div className="text-center mt-16">
                <button 
                  onClick={loadMoreImages}
                  className="inline-flex items-center gap-2 border-b-2 border-[#5A4A42] text-[#5A4A42] font-bold uppercase tracking-widest text-sm pb-1 hover:text-[#C79C8D] hover:border-[#C79C8D] transition-colors"
                >
                  További képek betöltése
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. BEFEKTETÉS (ÁRAK ÉS EXTRÁK) - AZ ÚJ SZEKCIÓ! */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-akaya text-[#5A4A42] mb-4">Befektetés az emlékekbe</h2>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Átlátható árazás, hogy pontosan tudd, mire számíthatsz. Szabd személyre a fotózást a kiegészítőkkel!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Bal oldal: Alapcsomag */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-7 bg-[#F9F5F1] p-10 md:p-14 rounded-[2rem] shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles size={120} />
              </div>
              <h3 className="text-2xl font-bold text-[#5A4A42] uppercase tracking-widest text-sm mb-4">Alapdíj</h3>
              <div className="text-5xl md:text-6xl font-bold text-[#C79C8D] mb-8 font-akaya">
                {data.startingPrice} <span className="text-xl text-[#5A4A42]/50 font-sans tracking-normal">-tól</span>
              </div>
              
              <div className="mb-6 font-bold text-[#5A4A42] text-lg">Az alapár tartalma:</div>
              <ul className="space-y-4 mb-10">
                {data.baseFeatures?.map((f, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                    <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                    <span className="text-base md:text-lg">{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact" className="inline-block bg-[#5A4A42] text-white py-4 px-10 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C79C8D] transition-colors shadow-lg hover:-translate-y-1 duration-300">
                Időpontot foglalok
              </Link>
            </motion.div>

            {/* Jobb oldal: Extrák (A'la carte) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-5 bg-white border border-[#5A4A42]/10 p-10 md:p-12 rounded-[2rem] shadow-xl"
            >
              <h3 className="text-2xl font-bold font-akaya text-[#5A4A42] mb-8 border-b border-[#5A4A42]/10 pb-6">Kiegészítők / Extrák</h3>
              <ul className="space-y-6">
                {data.extras?.map((extra, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="font-bold text-[#5A4A42]">{extra.name}</span>
                    <span className="text-[#C79C8D] text-sm font-bold tracking-wider">{extra.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 pt-6 border-t border-[#5A4A42]/10 text-xs text-gray-400 font-light italic">
                Minden fotózás egyedi, így az árak és az extrák is személyre szabhatóak a beszélgetésünk során.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. GYIK */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-24 bg-[#F9F5F1]">
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
                    <div className={`p-2 rounded-full transition-colors ${openFaqIndex === idx ? "bg-[#C79C8D] text-white" : "bg-[#F9F5F1] group-hover:bg-[#C79C8D]/10 text-[#5A4A42]"}`}>
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
                        <p className="px-5 md:px-6 pb-6 pt-0 text-gray-600 leading-relaxed text-sm md:text-base border-t border-[#5A4A42]/5 mt-3 pt-4 font-light">
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
      <section className="py-24 md:py-32 bg-[#5A4A42] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold font-akaya mb-8">
            Készen állsz a közös fotózásra?
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-light">
            Keress bizalommal, és beszéljük át az elképzeléseidet egy kötetlen beszélgetés során.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-[#C79C8D] text-white font-bold py-5 px-10 rounded-full hover:bg-white hover:text-[#5A4A42] transition-colors shadow-xl hover:-translate-y-1 duration-300 text-sm uppercase tracking-widest">
            Kapcsolatfelvétel <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      
      {/* LIGHTBOX */}
      {data.gallery && (
        <Lightbox
          index={lightboxIndex}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={data.gallery.map(img => ({ src: img.src, alt: img.alt }))}
          plugins={[Zoom]}
          styles={{ container: { backgroundColor: "rgba(38, 31, 29, 0.98)" } }}
        />
      )}
    </div>
  );
}