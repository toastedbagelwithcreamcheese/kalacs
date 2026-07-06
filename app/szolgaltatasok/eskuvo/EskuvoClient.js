"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, Heart, Sparkles, GlassWater, ArrowRight, ChevronDown, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import TiltCard from "@/components/TiltCard";

// --- ESKÜVŐI KÉPEK ---
const heroImage = "/images/Eskuvo2026-3.webp";
const funnyImage = "/images/Eskuvo2026.webp";

const galleryImages = [
  { src: "/images/_BF_2535.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2915.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_3127.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_6727.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_6726.webp", alt: "Esküvői pillanat" },
  { src: "/images/asdf.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2507.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2448-4.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2289.webp", alt: "Esküvői pillanat" },
  { src: "/images/_U2A0633-2.webp", alt: "Esküvői pillanat" },
  { src: "/images/_U2A0314.webp", alt: "Esküvői pillanat" },
  { src: "/images/_U2A0102.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_4181.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_1337-2.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_0328.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5522.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5510.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5326-2.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5191-2.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5158-2.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_5157-2.webp", alt: "Esküvői pillanat" }
];

export default function EskuvoClient() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <div className="bg-[#F9F5F1] text-[#5A4A42] font-sans selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image 
          src={heroImage} 
          fill 
          className="object-cover brightness-[0.6] scale-105 transform animate-kenburns" 
          priority 
          alt="Esküvői Fotózás" 
          quality={100}
        />
        <div className="relative z-10 text-center px-4 max-w-5xl mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.4em] text-sm md:text-base mb-6 font-bold"
          >
            A Nagy Napotok Művészi Szemmel
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-akaya text-white drop-shadow-2xl leading-tight"
          >
            Örökítsd meg <br/> <span className="text-[#C79C8D] italic">a Varázslatot.</span>
          </motion.h1>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/60 w-10 h-10" />
        </motion.div>
      </section>

      {/* 2. EDITORIAL INTRO */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold font-akaya text-[#5A4A42] leading-tight">
                Nem csak képeket, <br/> <span className="text-[#C79C8D]">történetet</span> adok át.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                Az esküvőtök életeket legszebb története, amit feszengés és erőltetett pózok nélkül, 
                a maga őszinte és elegáns valójában érdemes megőrizni. Célom, hogy amikor évek múltán 
                visszanézitek az albumot, ne csak lássátok, hanem *érezzétek* is azt a napot.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-widest text-sm">
                  <Heart size={18} /> Diszkrét Jelenlét
                </div>
                <div className="flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-widest text-sm">
                  <Sparkles size={18} /> Prémium Utómunka
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto rounded-none shadow-2xl overflow-hidden"
            >
              <Image src="/images/_BF_2535.webp" alt="Esküvői Elegancia" fill className="object-cover" />
              <div className="absolute inset-4 border border-white/30 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. A VICCES KÉP SZEKCIÓJA */}
      <section className="py-24 bg-[#261F1D] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <Image src={funnyImage} alt="Vicces esküvői pillanat" fill className="object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-widest text-sm mb-4">
                <GlassWater size={18} /> Valódi pillanatok
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-akaya text-white leading-tight">
                A tökéletesség unalmas. <br/> Én a <span className="text-[#C79C8D] italic">valódit</span> keresem.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                Egy esküvő nem egy magazin-fotózás. Könnyek, hatalmas nevetések, váratlan helyzetek, 
                és néha egy kis felnipucolás a menyasszonyi ruhával. Nem foglak titeket órákig 
                természetellenes pózokba kényszeríteni. Élvezzétek a napot, a többit pedig bízzátok rám!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. STORYBOARD GALÉRIA */}
      <section className="py-24 md:py-32 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-akaya text-[#5A4A42] mb-4">Válogatott Pillanatok</h2>
            <div className="w-24 h-1 bg-[#C79C8D] mx-auto" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                style={{ perspective: 800 }}
                className="break-inside-avoid overflow-hidden shadow-lg cursor-pointer relative"
                onClick={() => setLightboxIndex(idx)}
              >
                <TiltCard tiltStrength={6} glare={false}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="text-white w-10 h-10 drop-shadow-md" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEFEKTETÉS (A'LA CARTE ÁRAZÁS) */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-akaya text-[#5A4A42] mb-4">Befektetés az emlékekbe</h2>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Nincsenek merev csomagok, csak egy szilárd alap, amire felépítjük a ti egyedi napotokat.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Bal oldal: Alapdíj */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-7 bg-[#F9F5F1] p-10 md:p-14 rounded-[2rem] shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles size={120} />
              </div>
              <h3 className="text-2xl font-bold text-[#5A4A42] uppercase tracking-widest text-sm mb-4">Esküvői Alapdíj</h3>
              <div className="text-5xl md:text-6xl font-bold text-[#C79C8D] mb-8 font-akaya">
                100.000 Ft <span className="text-xl text-[#5A4A42]/50 font-sans tracking-normal">-tól</span>
              </div>
              
              <div className="mb-6 font-bold text-[#5A4A42] text-lg">Az alapár tartalma:</div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                  <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                  <span className="text-base md:text-lg">Konzultáció és forgatókönyv egyeztetés</span>
                </li>
                <li className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                  <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                  <span className="text-base md:text-lg">Kreatív páros fotózás és a szertartás megörökítése (4-5 óra)</span>
                </li>
                <li className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                  <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                  <span className="text-base md:text-lg">Csoport- és családi képek</span>
                </li>
                <li className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                  <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                  <span className="text-base md:text-lg">Minimum 150 db prémium retusált kép</span>
                </li>
                <li className="flex items-start gap-4 text-[#5A4A42]/80 font-light">
                  <CheckCircle size={20} className="text-[#C79C8D] shrink-0 mt-0.5" /> 
                  <span className="text-base md:text-lg">Online, jelszavas galéria a megosztáshoz</span>
                </li>
              </ul>
              
              <Link href="/contact?subject=Eskuvoi_ajanlatkeres" className="inline-block bg-[#5A4A42] text-white py-4 px-10 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C79C8D] transition-colors shadow-lg hover:-translate-y-1 duration-300">
                Kérj személyre szabott ajánlatot
              </Link>
            </motion.div>

            {/* Jobb oldal: Extrák */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-5 bg-white border border-[#5A4A42]/10 p-10 md:p-12 rounded-[2rem] shadow-xl"
            >
              <h3 className="text-2xl font-bold font-akaya text-[#5A4A42] mb-8 border-b border-[#5A4A42]/10 pb-6">Legnépszerűbb Extrák</h3>
              <ul className="space-y-6">
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-[#5A4A42]">Egész napos rendelkezésre állás (12+ óra)</span>
                  <span className="text-[#C79C8D] text-sm font-bold tracking-wider">+100.000 Ft-tól</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-[#5A4A42]">Külön napi kreatív fotózás</span>
                  <span className="text-[#C79C8D] text-sm font-bold tracking-wider">Kérésre egyeztetve(Minden csomag tartalmazza díjmentesen)</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-[#5A4A42]">Mobil stúdió / Fotósarok a buliba</span>
                  <span className="text-[#C79C8D] text-sm font-bold tracking-wider">Benne van a nagy csomagokban</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-[#5A4A42]">Polaroid gép (Instax) vendégeknek</span>
                  <span className="text-[#C79C8D] text-sm font-bold tracking-wider">Egyéni díjszabás, nagy csomagok tartalmazzák díjmentesen</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-[#5A4A42]">Prémium Fine-Art fotókönyv</span>
                  <span className="text-[#C79C8D] text-sm font-bold tracking-wider">Kérésre egyeztetve</span>
                </li>
              </ul>
              <p className="mt-8 pt-6 border-t border-[#5A4A42]/10 text-xs text-gray-400 font-light italic">
                A pontos árajánlatot a ti igényeitek (esküvő hossza, helyszínek száma) alapján állítom össze. Találkozzunk és tervezzük meg!
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. ZÁRÓ CTA */}
      <section className="py-32 bg-[#5A4A42] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold font-akaya text-white mb-8">Készen álltok életek <br/> legszebb kalandjára?</h2>
          <p className="text-xl text-white/70 mb-12 font-light">
            Foglaljatok időpontot egy kötetlen, kávézós személyes találkozóra, 
            és beszéljük át a részleteket!
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 bg-[#C79C8D] text-white font-bold py-5 px-12 rounded-full text-lg hover:bg-white hover:text-[#5A4A42] transition-all shadow-xl hover:-translate-y-1 duration-300"
          >
            Irány a kapcsolatfelvétel <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={galleryImages.map(img => ({ src: img.src, alt: img.alt }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(38, 31, 29, 0.98)" } }}
      />
    </div>
  );
}