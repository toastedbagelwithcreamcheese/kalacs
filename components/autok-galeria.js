"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Camera, ArrowRight } from "lucide-react";

// --- KÉP ADATOK (Változatlan tartalom) ---
const carGalleryImages = [
  { src: "/images/audi_tel-1198.webp", width: 1600, height: 900, alt: "Autó fotó 1 (Audi)" },
  { src: "/images/_MG_6310.webp", width: 1600, height: 900, alt: "Autó fotó 2" },
  { src: "/images/_MG_6506.webp", width: 1600, height: 900, alt: "Autó fotó 3" },
  { src: "/images/_MG_7633.webp", width: 1600, height: 900, alt: "Autó fotó 3" },
  { src: "/images/_MG_6508.webp", width: 1600, height: 900, alt: "Autó fotó 4" },
  { src: "/images/_MG_7636.webp", width: 1600, height: 900, alt: "Autó fotó 4" },
  { src: "/images/_MG_6519.webp", width: 1600, height: 900, alt: "Autó fotó 5" },
  { src: "/images/_MG_6531.webp", width: 1600, height: 900, alt: "Autó fotó 6" },
  { src: "/images/_MG_6330_2.webp", width: 1600, height: 900, alt: "Autó fotó 7" },
  { src: "/images/audi_tel--5.webp", width: 1600, height: 900, alt: "Autó fotó 8 (Audi)" },
  { src: "/images/_MG_6525.webp", width: 1600, height: 900, alt: "Autó fotó 9" },
  { src: "/images/_MG_6305-Enhanced-NR.webp", width: 1600, height: 900, alt: "Autó fotó 14" },
  { src: "/images/Rendszamnelkul-7580.jpg", width: 1600, height: 900, alt: "Autó fotó 14" },
  { src: "/images/Rendszamnelkul-7651.webp", width: 1600, height: 900, alt: "Autó fotó 14" },
  { src: "/images/_MG_6508.webp", width: 1600, height: 900, alt: "Autó fotó 16 (duplikált)" },
  { src: "/images/_MG_6519.webp", width: 1600, height: 900, alt: "Autó fotó 17 (duplikált)" },
  { src: "/images/_MG_0019.webp", width: 1600, height: 900, alt: "Autó fotó 18" },
  { src: "/images/_MG_0045.webp", width: 1600, height: 900, alt: "Autó fotó 19" },
  { src: "/images/_MG_0031.webp", width: 1600, height: 900, alt: "Autó fotó 20" },
  { src: "/images/_MG_0094.webp", width: 1600, height: 900, alt: "Autó fotó 21" },
  { src: "/images/_MG_0003.webp", width: 1600, height: 900, alt: "Autó fotó 22" },
];

export default function AutoGaleriaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = carGalleryImages.map(img => ({
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
        <title>Autó Galéria – Kovács Bálint Fotó</title>
        <meta name="description" content="Lenyűgöző autófotók Zalaegerszegről. Dinamikus és művészi képek kedvenc járművekről." />
      </Head>

      {/* HEADER */}
      <motion.header 
        className="pt-32 pb-16 text-center bg-[#F9F5F1] rounded-b-[3rem]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-akaya text-[#5A4A42]"
        >
          Négy Kerék Művészete
        </h1>
        <div className="w-20 h-1 bg-[#C79C8D] mx-auto rounded-full mb-6" />
        <p className="text-lg text-[#5A4A42]/70 max-w-2xl mx-auto px-6">
          Fedezd fel válogatott autófotóimat, ahol a design, az erő és a szenvedély találkozik. 
          Profi autófotózás Zalaegerszegen.
        </p>
      </motion.header>

      {/* GALÉRIA RÁCS */}
      <main className="container mx-auto px-4 sm:px-6 py-12 min-h-screen">
        {carGalleryImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {carGalleryImages.map((image, index) => (
                <motion.div
                  key={image.src + '--' + index}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg bg-[#F9F5F1]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                  onClick={() => openImageInLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="text-white w-10 h-10 drop-shadow-md" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
           <p className="text-center text-[#5A4A42]/60 text-xl py-20">Az autógaléria jelenleg üres. Hamarosan érkeznek a lélegzetelállító képek!</p>
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
          zoom={{
            maxZoomPixelRatio: 3.5,
            doubleTapDelay: 300,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: "bottom",
            width: 110,
            height: 70,
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
            <h2 className="text-3xl font-bold font-akaya mb-6">Szeretnéd megörökíteni az autódat?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Legyen szó eladásról vagy csak a szenvedélyről, egy profi sorozat kiemeli a járgányod karakterét.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C79C8D] hover:bg-[#b3897b] text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl hover:scale-105">
                Időpontot foglalok <ArrowRight size={20} />
            </Link>
            <p className="text-white/40 text-sm mt-12">
              &copy; {new Date().getFullYear()} Kovács Bálint – Autófotózás
            </p>
          </div>
      </footer>
    </div>
  );
}