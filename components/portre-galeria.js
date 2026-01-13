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
import { Camera, ArrowRight, X } from "lucide-react";

// --- KATEGORIZÁLT KÉP ADATOK (Változatlan tartalom) ---
const allImages = [
  { src: "/images/_MG_4462.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/7.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_7494.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/3.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_4523.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_4270festettV5.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_4486.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/1_1.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_4521.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_4619.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_7266.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/_MG_2433.jpg", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_7000.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/6.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Evoto-(3 of 3).webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_7041.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_7542.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0047.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0056-2.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0127-2.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/_MG_1848-3.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0586-2.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0568.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/2.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0315-2.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0274.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0490.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0390.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/11.jpeg", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0284.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/_MG_0262.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/5.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/_MG_2841.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/9.jpeg", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/4.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/10.png", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/_MG_2456.jpg", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/Virag_BP/8.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/anna_varosliget/_47A7016.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/anna_varosliget/_47A7180.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/anna_varosliget/_47A7193.webp", width: 800, height: 1200, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/anna_varosliget/_47A7506.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  { src: "/images/anna_varosliget/_47A7701.webp", width: 1200, height: 800, alt: "Felnőtt portré", category: 'Felnőtt' },
  // Gyermek fotók
  { src: "/images/_MG_9410.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_9398.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_9381.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_0047-2.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_9000.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8992.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8932.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8890.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_0281-2-Edit.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8842.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8634.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_8620.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_5009.webp", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
  { src: "/images/_MG_4986.jpg", width: 800, height: 1200, alt: "Gyermek portré", category: 'Gyermek' },
];

const categories = ['Összes', 'Felnőtt', 'Gyermek'];

export default function PortreGaleriaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Összes');

  const filteredImages = useMemo(() => {
    if (activeCategory === 'Összes') {
      return allImages;
    }
    return allImages.filter(image => image.category === activeCategory);
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
        <title>Portré Galéria – Kovács Bálint Fotó</title>
        <meta name="description" content="Fedezd fel egyedi és művészi portréimat: gyermek, felnőtt és üzleti fotók." />
      </Head>

      {/* HEADER - Új stílusban */}
      <motion.header 
        className="pt-32 pb-12 text-center bg-[#F9F5F1] rounded-b-[3rem]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-akaya text-[#5A4A42]">
          Portrék Varázsa
        </h1>
        <div className="w-20 h-1 bg-[#C79C8D] mx-auto rounded-full mb-6" />
        <p className="text-lg text-[#5A4A42]/70 max-w-2xl mx-auto px-6">
          Minden arc egy történet, minden pillantás egy érzelem. 
          Fedezd fel válogatott portréimat, melyek az egyediséget ünneplik.
        </p>
      </motion.header>

      {/* SZŰRŐ GOMBOK - Letisztultabb */}
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

      {/* GALÉRIA RÁCS - Masonry stílus */}
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
            container: { backgroundColor: "rgba(90, 74, 66, 0.95)" }, // Barna áttetsző háttér
            thumbnail: { borderRadius: "4px" },
            icon: { color: "#fff" } // Fehér ikonok
          }}
        />
      )}
      
      {/* FOOTER / CTA */}
      <footer className="py-20 bg-[#5A4A42] text-white text-center mt-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold font-akaya mb-6">Tetszenek a képek?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Ha szeretnél magadról vagy szeretteidről hasonlóan hangulatos portrékat, keress bizalommal!
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C79C8D] hover:bg-[#b3897b] text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl hover:scale-105">
                Időpontot foglalok <ArrowRight size={20} />
            </Link>
            <p className="text-white/40 text-sm mt-12">
              &copy; {new Date().getFullYear()} Kovács Bálint – Professzionális Portréfotózás
            </p>
          </div>
      </footer>
    </div>
  );
}