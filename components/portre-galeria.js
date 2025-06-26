"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

// Lightbox pluginok importálása és aktiválása
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// --- KÉP ADATOK ---
// !!! FIGYELEM: AZ ALÁBBI `width` ÉS `height` ÉRTÉKEK CSAK PLACEHOLDEREK!
// !!! KÉRLEK, CSERÉLD LE ŐKET A KÉPEID TÉNYLEGES EREDETI MÉRETEIRE!
const galleryImages = [
  { src: "/images/_MG_7468.webp", width: 800, height: 1200, alt: "Portré kép 1" },
  { src: "/images/BogyoCv2FF-1-2.jpg", width: 800, height: 1200, alt: "Portré kép 2" }, // Lehetséges duplikátum vagy hasonló név
  { src: "/images/_MG_4462.webp", width: 800, height: 1200, alt: "Portré kép 3" },
  { src: "/images/_MG_7494.webp", width: 800, height: 1200, alt: "Portré kép 3" },
  { src: "/images/_MG_4523.webp", width: 800, height: 1200, alt: "Portré kép 4" },
  { src: "/images/_MG_4270festettV5.webp", width: 800, height: 1200, alt: "Portré kép 5" },
  { src: "/images/_MG_7123.webp", width: 800, height: 1200, alt: "Portré kép 6" },
  { src: "/images/_MG_4486.webp", width: 800, height: 1200, alt: "Portré kép 8" },
  { src: "/images/_MG_4521.webp", width: 800, height: 1200, alt: "Portré kép 10" },
  { src: "/images/_MG_7296.webp", width: 800, height: 1200, alt: "Portré kép 12" },
  { src: "/images/_MG_4619.webp", width: 800, height: 1200, alt: "Portré kép 13" },
  { src: "/images/_MG_7266.webp", width: 800, height: 1200, alt: "Portré kép 13" },
  { src: "/images/_MG_7000.webp", width: 800, height: 1200, alt: "Portré kép 13" },
  { src: "/images/Evoto-(3 of 3).webp", width: 1200, height: 800, alt: "Portré kép 14 (lehet fekvő)" }, // Eltérő méretarány példa
  { src: "/images/_MG_7041.webp", width: 1200, height: 800, alt: "Portré kép 14 (lehet fekvő)" }, // Eltérő méretarány példa
  { src: "/images/_MG_7503.webp", width: 1200, height: 800, alt: "Portré kép 14 (lehet fekvő)" }, // Eltérő méretarány példa
  { src: "/images/_MG_7542.webp", width: 1200, height: 800, alt: "Portré kép 14 (lehet fekvő)" }, // Eltérő méretarány példa
];
// --------------------

export default function PortreGaleriaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = galleryImages.map(img => ({
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
    <>
      <Head>
        <title>Portré Galéria – [A Te Fotós Neved Ide]</title> {/* CSERÉLD LE! */}
        <meta name="description" content="Fedezd fel egyedi és művészi portré fotóimat. Professzionális portréfotózás Zalaegerszegen és környékén." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <motion.header 
          className="py-20 md:py-28 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#e0c3b6] via-[#C79C8D] to-[#b3897b]"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif"}}
          >
            Portrék Varázsa
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Minden arc egy történet, minden pillantás egy érzelem. Fedezd fel válogatott portréimat, melyek az egyediséget és a személyiséget ünneplik Zalaegerszegen.
          </p>
        </motion.header>

        <main className="container mx-auto px-2 sm:px-4 pb-16">
          {galleryImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-4 sm:gap-5 md:gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src + '-' + index} // Egyedi kulcs duplikált src esetén is
                  className="mb-4 sm:mb-5 md:mb-6 break-inside-avoid overflow-hidden rounded-lg shadow-2xl group cursor-pointer relative block"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: (index % 12) * 0.07, ease:"easeOut" }}
                  onClick={() => openImageInLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width} // !!! FELTÉTLENÜL CSERÉLD LE A VALÓS MÉRETRE !!!
                    height={image.height} // !!! FELTÉTLENÜL CSERÉLD LE A VALÓS MÉRETRE !!!
                    layout="responsive"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                    quality={85}
                    // placeholder="blur" // Fontold meg a blur placeholder használatát valós blurDataURL-ekkel
                    // blurDataURL="VALÓS_BLUR_DATA_URL_IDE_VAGY_DINAMIKUSAN_GENERÁLVA"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 ease-in-out flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 drop-shadow-lg">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-center text-gray-400 text-xl py-20">A galéria feltöltés alatt áll. Nézz vissza később a legfrissebb portrékért!</p>
          )}
        </main>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={lightboxIndex}
            plugins={[Zoom, Thumbnails]} // Pluginok aktiválva
            zoom={{ // Zoom plugin beállításai (opcionális)
              maxZoomPixelRatio: 3,
              doubleTapDelay: 300,
              scrollToZoom: true, // Engedélyezi a görgővel való zoomolást
            }}
            thumbnails={{ // Thumbnails plugin beállításai (opcionális)
              position: "bottom",
              width: 100,
              height: 80,
              padding: 2,
              gap: 4,
              border: 1,
              borderColor: "rgba(255,255,255,0.2)",
              imageFit: "cover",
            }}
            styles={{
              container: { backgroundColor: "rgba(10, 10, 10, .95)" },
              thumbnail: { borderColor: "rgba(255,255,255,0.2)"},
              thumbnailsContainer: { backgroundColor: "rgba(0,0,0,0.5)"}
            }}
            render={{
              buttonPrev: () => galleryImages.length <= 1 ? null : undefined,
              buttonNext: () => galleryImages.length <= 1 ? null : undefined,
            }}
          />
        )}
        
        <footer className="text-center py-16 border-t border-gray-700/50 mt-10">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Kovács Bálint – Professzionális Portréfotózás</p> {/* CSERÉLD LE! */}
            <Link href="/contact" legacyBehavior>
                <a className="text-[#C79C8D] hover:text-[#bda093] transition-colors mt-3 inline-block text-md font-medium">
                  Kapcsolat & Időpontfoglalás
                </a>
            </Link>
        </footer>
      </div>
    </>
  );
}