"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

// Lightbox pluginok importálása
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// --- KÉP ADATOK ---
// !!! FIGYELEM: AZ ALÁBBI `width` ÉS `height` ÉRTÉKEK CSAK PLACEHOLDEREK!
// !!! KÉRLEK, CSERÉLD LE ŐKET A KÉPEID TÉNYLEGES EREDETI MÉRETEIRE!
// Az `alt` szövegeket is érdemes egyedivé tenni.
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
];
// --------------------

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
    <>
      <Head>
        <title>Autó Galéria – [A Te Fotós Neved Ide]</title> {/* CSERÉLD LE! */}
        <meta name="description" content="Lenyűgöző autófotók Zalaegerszegről. Dinamikus és művészi képek kedvenc járművekről." />
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
            Négy Kerék Művészete
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Fedezd fel válogatott autófotóimat, ahol a design, az erő és a szenvedély találkozik minden egyes képen. Profi autófotózás Zalaegerszegen.
          </p>
        </motion.header>

        <main className="container mx-auto px-2 sm:px-4 pb-16">
          {carGalleryImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 md:gap-6"> {/* Autóknál lehet, hogy kevesebb oszlop jobb a fekvő képek miatt */}
              {carGalleryImages.map((image, index) => (
                <motion.div
                  key={image.src + '--' + index} // Egyedi kulcs duplikált src esetén is
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
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105" // Kisebb zoom autós képeknél
                    quality={85}
                    // placeholder="blur" // Fontold meg a blur placeholder használatát
                    // blurDataURL="AUTOS_BLUR_DATA_URL_IDE"
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
             <p className="text-center text-gray-400 text-xl py-20">Az autógaléria jelenleg üres. Hamarosan érkeznek a lélegzetelállító képek!</p>
          )}
        </main>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={lightboxIndex}
            plugins={[Zoom, Thumbnails]}
            zoom={{
              maxZoomPixelRatio: 3.5, // Autóknál a részletek miatt lehet nagyobb zoom
              doubleTapDelay: 300,
              scrollToZoom: true,
            }}
            thumbnails={{
              position: "bottom",
              width: 110, // Kicsit szélesebb thumbnail autós képekhez
              height: 70,
              padding: 2,
              gap: 5,
              border: 1,
              borderColor: "rgba(255,255,255,0.2)",
              imageFit: "cover", // vagy "contain", attól függően, mi néz ki jobban
            }}
            styles={{
              container: { backgroundColor: "rgba(10, 10, 10, .95)" },
              thumbnail: { borderColor: "rgba(255,255,255,0.2)"},
              thumbnailsContainer: { backgroundColor: "rgba(0,0,0,0.6)"}
            }}
            render={{
              buttonPrev: () => carGalleryImages.length <= 1 ? null : undefined,
              buttonNext: () => carGalleryImages.length <= 1 ? null : undefined,
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