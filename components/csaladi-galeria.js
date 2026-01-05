// pages/csaladi-galeria.js
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Users } from "lucide-react";

// --- KÉP ADATOK (PLACEHOLDER) ---
// CSERÉLD LE EZEKET A SAJÁT CLOUDINARY KÉPEIDRE!
const familyImages = [
  { src: "/images/_MG_4795.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_4693.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_1136.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_4805.jpg", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_0097-2.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_4971.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_4986.jpg", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_8653.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_0066-2.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_8762.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_8775.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_8876.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_9219.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_0114-2.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_0148-2-2.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/_MG_9237.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_9335.webp", alt: "", width: 800, height: 1200 },
  { src: "/images/_MG_0017-2.webp", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A2095.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2157.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2250.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2262.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2289.jpeg", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A2319.jpeg", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A2351.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2421.jpeg", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A2438.jpeg", alt: "", width: 800, height: 1200 },
  { src: "/images/karacsony_patriek/_47A2860.jpeg", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A2964.jpeg", alt: "", width: 1200, height: 800 },
  { src: "/images/karacsony_patriek/_47A3036.jpeg", alt: "", width: 1200, height: 800 },
];


export default function FamilyGalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = useMemo(() => familyImages.map(img => ({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: img.alt,
  })), []);

  const openLightboxOn = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Head>
        <title>Családi Fotózás Galéria – Kovács Bálint Fotó</title>
        <meta name="description" content="Tekintsd meg válogatott családi fotóimat! Játékos, őszinte és megismételhetetlen pillanatok a szabadban." />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* FEJLÉC */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-16 sm:py-24 text-center bg-black/20"
        >
          <div className="container mx-auto px-6">
            <Users className="mx-auto w-12 h-12 text-teal-400 mb-4" />
            <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
              Családi Pillanatok
            </h1>
            <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
              A közös nevetések, a szoros ölelések, a megismételhetetlen pillanatok. Játékos, szabadtéri fotózás az egész családnak, ahol az őszinte érzelmeké a főszerep.
            </p>
          </div>
        </motion.section>

        {/* GALÉRIA RÁCS */}
        <main className="container mx-auto p-4 sm:p-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {familyImages.map((image, index) => (
              <motion.div
                key={image.src}
                className="mb-4 break-inside-avoid cursor-pointer group relative"
                onClick={() => openLightboxOn(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <p className="text-white text-center p-4 font-semibold">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* LIGHTBOX */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
          styles={{ container: { backgroundColor: "rgba(10, 10, 10, .95)" } }}
        />
      </div>
    </>
  );
}