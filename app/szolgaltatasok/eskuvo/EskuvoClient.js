"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, Heart, Sparkles, GlassWater, ArrowRight, ChevronDown, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// --- ESKÜVŐI KÉPEK A LISTÁDBÓL ---
const heroImage = "/images/Eskuvo2026-3.webp";
const funnyImage = "/images/Eskuvo2026.webp";

const galleryImages = [
  { src: "/images/_BF_2535.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2915.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_3127.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2507.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2448-4.webp", alt: "Esküvői pillanat" },
  { src: "/images/_BF_2289.webp", alt: "Esküvői pillanat" }
];

const packages = [
  {
    title: "Esszencia",
    subtitle: "Rövid, de tartalmas",
    price: "180.000 Ft",
    duration: "4 óra rendelkezésre állás",
    desc: "Tökéletes választás kisebb, polgári esküvőkhöz, ahol csak a legfontosabb pillanatokat és a kreatív fotózást szeretnétek megörökíteni.",
    features: [
      "Kreatív páros fotózás",
      "Szertartás megörökítése",
      "Csoport- és családi képek",
      "Minimum 150 db retusált kép",
      "Online, jelszavas galéria"
    ]
  },
  {
    title: "Harmónia",
    subtitle: "A legnépszerűbb",
    price: "280.000 Ft",
    duration: "8 óra rendelkezésre állás",
    desc: "A készülődés izgalmaitól egészen a nyitótáncig végigkísérem a napotokat, hogy a történet kerek legyen.",
    features: [
      "Készülődés és \"first look\"",
      "Kreatív fotózás (akár külön napon)",
      "Polgári és templomi szertartás",
      "Vacsora és nyitótánc megörökítése",
      "Minimum 350 db retusált kép"
    ],
    popular: true
  },
  {
    title: "Örökkévalóság",
    subtitle: "Kompromisszumok nélkül",
    price: "380.000 Ft",
    duration: "12+ óra (Egész napos)",
    desc: "Az első sminkecsetvonástól a menyasszonytáncig (hajnali 1-ig) ott vagyok, hogy egyetlen mosoly se vesszen el.",
    features: [
      "Teljes napos jelenlét (hajnali 1-ig)",
      "Jegyesfotózás (ajándék)",
      "Kreatív fotózás külön napon is",
      "Minimum 600 db retusált kép",
      "Prémium fotókönyv vagy papírképek",
      "Elsőbbségi (gyorsított) átadás"
    ]
  }
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

      {/* 2. EDITORIAL INTRO (Aszimmetrikus szöveg és egy portré) */}
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

      {/* 3. A VICCES KÉP SZEKCIÓJA (Törjük meg a jeget!) */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx % 3 * 0.1 }}
                className="relative aspect-[3/4] overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="text-white w-10 h-10 drop-shadow-md" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRÉMIUM CSOMAGOK */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold font-akaya text-[#5A4A42] mb-6">Esküvői Csomagok</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Átlátható árazás, rejtett költségek nélkül. Válaszátok azt, amelyik a legjobban illik a Nagy Naphoz!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col p-10 bg-[#F9F5F1] transition-all duration-300 ${pkg.popular ? 'border border-[#C79C8D] shadow-2xl scale-100 lg:scale-105 z-10' : 'border border-transparent hover:shadow-xl'}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5A4A42] text-white px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                    Legnépszerűbb
                  </div>
                )}
                <div className="text-center mb-8 border-b border-[#5A4A42]/10 pb-8">
                  <h3 className="text-3xl font-bold font-akaya text-[#5A4A42] mb-2">{pkg.title}</h3>
                  <p className="text-sm text-[#C79C8D] font-bold uppercase tracking-widest mb-6">{pkg.subtitle}</p>
                  <div className="text-4xl font-bold text-[#5A4A42] mb-4">{pkg.price}</div>
                  <div className="inline-block px-4 py-2 bg-white text-[#5A4A42] text-sm font-bold shadow-sm">
                    {pkg.duration}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-8 leading-relaxed italic text-center min-h-[60px]">"{pkg.desc}"</p>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <CheckCircle size={18} className="text-[#C79C8D] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact?subject=Eskuvoi_ajanlatkeres" 
                  className={`block text-center py-4 font-bold uppercase tracking-widest text-sm transition-colors ${pkg.popular ? 'bg-[#C79C8D] text-white hover:bg-[#5A4A42]' : 'bg-white text-[#5A4A42] border border-[#5A4A42]/20 hover:border-[#5A4A42] hover:bg-[#5A4A42] hover:text-white'}`}
                >
                  Ajánlatot Kérek
                </Link>
              </motion.div>
            ))}
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
            className="inline-flex items-center gap-3 bg-[#C79C8D] text-white font-bold py-5 px-12 rounded-full text-lg hover:bg-white hover:text-[#5A4A42] transition-all shadow-xl hover:scale-105"
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