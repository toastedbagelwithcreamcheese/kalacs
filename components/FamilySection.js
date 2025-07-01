"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Maximize, ArrowRight, Users } from "lucide-react";

const FamilySectionModernFlipped = ({ title, description, images = [], extraImages = [], link }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = useMemo(() => [...images, ...extraImages], [images, extraImages]);
  const slides = useMemo(() => allImages.map(img => ({ src: img.src, alt: img.alt })), [allImages]);
  const displayImages = useMemo(() => images.slice(0, 3), [images]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <motion.section
        className="bg-teal-50/30 py-16 sm:py-24" // A családi szekció friss, zöldes háttere
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* BAL OLDAL - KÉP MOZAIK (MÓDOSÍTVA) */}
          <motion.div
            className="w-full h-full lg:order-1" // `order-1` helyezi bal oldalra nagy képernyőn
            initial={{ opacity: 0, x: -50 }} // Animáció balról
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {displayImages.length > 0 && (
              <div className="grid grid-cols-2 grid-rows-2 gap-4 aspect-[4/3]">
                <div 
                  className="col-span-2 row-span-1 md:col-span-1 md:row-span-2 rounded-xl overflow-hidden shadow-lg group cursor-pointer relative"
                  onClick={() => openLightbox(0)}
                >
                  <Image src={displayImages[0].src} alt={displayImages[0].alt} layout="fill" objectFit="cover" className="transition-transform duration-500 ease-in-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize size={32} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                {displayImages[1] && (
                  <div 
                    className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-lg group cursor-pointer relative"
                    onClick={() => openLightbox(1)}
                  >
                    <Image src={displayImages[1].src} alt={displayImages[1].alt} layout="fill" objectFit="cover" className="transition-transform duration-500 ease-in-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize size={28} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
                {displayImages[2] && (
                  <div 
                    className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-lg group cursor-pointer relative"
                    onClick={() => openLightbox(2)}
                  >
                    <Image src={displayImages[2].src} alt={displayImages[2].alt} layout="fill" objectFit="cover" className="transition-transform duration-500 ease-in-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize size={28} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* JOBB OLDAL - SZÖVEG (MÓDOSÍTVA) */}
          <motion.div
            className="text-center lg:text-left lg:order-2" // `order-2` helyezi jobb oldalra nagy képernyőn
            initial={{ opacity: 0, x: 50 }} // Animáció jobbról
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="inline-block p-3 bg-white rounded-full shadow-md mb-4">
              <Users size={32} className="text-teal-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-900/90 leading-tight" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
              {title}
            </h2>
            <p className="text-lg text-slate-700 mt-6 max-w-lg mx-auto lg:mx-0">
              {description}
            </p>
            <Link href={link || "/family-sessions"} legacyBehavior>
              <a className="inline-flex items-center mt-8 bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Családi Kalandok
                <ArrowRight size={20} className="ml-2" />
              </a>
            </Link>
          </motion.div>

        </div>
      </motion.section>

      {/* LIGHTBOX (MODÁL) */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Zoom, Thumbnails]}
        styles={{ container: { backgroundColor: "rgba(10, 10, 10, .95)" } }}
      />
    </>
  );
};

// Javasolt új név, hogy megkülönböztesd a másiktól
export default FamilySectionModernFlipped;