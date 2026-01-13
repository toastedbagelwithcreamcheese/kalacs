"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Camera, ArrowRight } from "lucide-react";

// --- KÉP ADATOK (Kategorizálva) ---
const familyImages = [
  // Családi / Vegyes
  { src: "/images/_MG_4795.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_1136.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_4805.jpg", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_0097-2.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_4971.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_4986.jpg", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_8653.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_0066-2.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_8762.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_8775.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_8876.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_9219.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_0114-2.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_0148-2-2.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },
  { src: "/images/_MG_9237.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_9335.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Családi' },
  { src: "/images/_MG_0017-2.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Családi' },

  // Kismama (Feltételezve, hogy ez a kép kismama fotó volt a másik listában, ide soroltam)
  { src: "/images/_MG_4693.webp", alt: "Kismama fotó", width: 1200, height: 800, category: 'Kismama' },
  { src: "/images/_MG_4795.webp", alt: "Családi fotó", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/_MG_4805.jpg", alt: "Családi fotó", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/_MG_4971.webp", alt: "Családi fotó", width: 1200, height: 800, category: 'Kismama' },
  { src: "/images/_MG_4986.jpg", alt: "Családi fotó", width: 1200, height: 800, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9056-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9056-2.jpeg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A7843-2.jpeg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8484-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8248-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8279-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9146-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9191-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8673-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8666-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9104-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A7897-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9009-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8966-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8142-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A8160-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A7885-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9158-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },
  { src: "/images/kata_kismama/_47A9221-2.jpg", alt: "Kismama fotózás", width: 800, height: 1200, category: 'Kismama' },

  // Karácsonyi / Szezonális
  { src: "/images/karacsony_patriek/_47A2095.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2157.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2250.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2289.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2319.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2351.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2421.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2438.jpeg", alt: "Karácsonyi fotózás", width: 800, height: 1200, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2860.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A2964.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
  { src: "/images/karacsony_patriek/_47A3036.jpeg", alt: "Karácsonyi fotózás", width: 1200, height: 800, category: 'Szezonális' },
];

const categories = ['Összes', 'Családi', 'Kismama', 'Szezonális'];

export default function CsaladiGaleriaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Összes');

  const filteredImages = useMemo(() => {
    if (activeCategory === 'Összes') {
      return familyImages;
    }
    return familyImages.filter(image => image.category === activeCategory);
  }, [activeCategory]);
  
  const slides = filteredImages.map(img => ({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: img.alt,
  }));

  const openImageInLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-white font-sans text-[#5A4A42] selection:bg-[#C79C8D] selection:text-white">
      <Head>
        <title>Családi Galéria – Kovács Bálint Fotó</title>
        <meta name="description" content="Tekintsd meg válogatott családi, kismama és szezonális fotóimat! Játékos, őszinte pillanatok." />
      </Head>

      {/* HEADER */}
      <motion.header 
        className="pt-32 pb-12 text-center bg-[#F9F5F1] rounded-b-[3rem]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-akaya text-[#5A4A42]">
          Családi Pillanatok
        </h1>
        <div className="w-20 h-1 bg-[#C79C8D] mx-auto rounded-full mb-6" />
        <p className="text-lg text-[#5A4A42]/70 max-w-2xl mx-auto px-6">
          A közös nevetések, a szoros ölelések, a megismételhetetlen pillanatok. 
          Játékos, szabadtéri fotózás az egész családnak.
        </p>
      </motion.header>

      {/* SZŰRŐ GOMBOK */}
      <div className="sticky top-20 z-30 py-6 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 flex justify-center flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-bold rounded-full transition-all duration-300 border-2 ${
                activeCategory === category 
                ? 'bg-[#5A4A42] text-white border-[#5A4A42] shadow-md' 
                : 'bg-white text-[#5A4A42] border-[#5A4A42]/20 hover:border-[#C79C8D] hover:text-[#C79C8D]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* GALÉRIA RÁCS */}
      <main className="container mx-auto px-4 sm:px-6 py-12 min-h-screen">
        {filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg bg-[#F9F5F1]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  onClick={() => openImageInLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="text-white w-10 h-10 drop-shadow-md" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#5A4A42]/60 text-xl py-20">
             Ebben a kategóriában jelenleg nincsenek képek.
           </motion.p>
        )}
      </main>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
          plugins={[Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 3 }}
          thumbnails={{
            position: "bottom",
            width: 100,
            height: 80,
            border: 0,
            borderRadius: 4,
            padding: 4,
            gap: 10,
          }}
          styles={{
            container: { backgroundColor: "rgba(90, 74, 66, 0.95)" },
            thumbnail: { borderRadius: "4px" },
            icon: { color: "#fff" }
          }}
        />
      )}
      
      {/* FOOTER */}
      <footer className="py-20 bg-[#5A4A42] text-white text-center mt-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold font-akaya mb-6">Szeretnél hasonló képeket?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Örökítsük meg a családod legszebb pillanatait! Keress bizalommal.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C79C8D] hover:bg-[#b3897b] text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl hover:scale-105">
                Időpontot foglalok <ArrowRight size={20} />
            </Link>
            <p className="text-white/40 text-sm mt-12">
              &copy; {new Date().getFullYear()} Kovács Bálint – Családi Fotózás
            </p>
          </div>
      </footer>
    </div>
  );
}