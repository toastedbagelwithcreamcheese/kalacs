// pages/csaladi-galeria.js
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Heart } from "lucide-react";

// --- KÉP ADATOK (PLACEHOLDER) ---
// CSERÉLD LE EZEKET A SAJÁT CLOUDINARY KÉPEIDRE!
const familyImages = [
{ src: "/images/kata_kismama/_47A7843-2.jpeg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A7885-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A7897-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A8142-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A8160-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A8248-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A8279-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A8484-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A8666-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A8673-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A8966-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A9009-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A9056-2.jpeg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A9104-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A9146-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A9158-2.jpg", alt: "", width: 800, height: 1200 },
{ src: "/images/kata_kismama/_47A9191-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/_47A9221-2.jpg", alt: "", width: 1200, height: 800 },
{ src: "/images/kata_kismama/B56E8960-7048-4562-BD9A-C27C2E6FEE1A.jpg", alt: "", width: 1200, height: 800 }
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
    {/* Az ikont Users-ről Heart-ra cseréltem a meghittebb hangulatért */}
    <Heart className="mx-auto w-12 h-12 text-teal-400 mb-4" />
    <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
      Az Anyaság Varázsa
    </h1>
    <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
      Az áldott állapot minden pillanata egy csoda. Örökítsük meg együtt ezt a különleges várakozást, a sugárzó boldogságot és az élet legszebb ígéretét egy meghitt fotózás keretében.
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