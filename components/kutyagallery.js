"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";

// Cseréld le ezeket a saját kutyás képeid elérési útvonalaira
const images = [
  "/images/59957F6B-2DAA-4D9D-AB69-3B47B1F7216F_1_105_c.jpeg",
  "/images/_MG_5324.webp",
  "/images/_MG_5347.webp",
  "/images/_MG_5351.webp",
  "/images/_MG_5375.webp",
  "/images/_MG_5415.webp",
];

const KutyaGallery = () => {
  const [visibleImages, setVisibleImages] = useState(4); // Kezdetben 4 kép látható
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadMore = () => {
    setVisibleImages((prev) => Math.min(prev + 4, images.length));
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="text-center py-8 px-4">
       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nézd meg a galériát!</h2>
      {/* Galéria */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, visibleImages).map((src, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden group rounded-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(index)}
            layout // For smoother animation when loading more
          >
            <Image
              src={src}
              width={400}
              height={300}
              className="w-full h-auto object-cover aspect-[4/3]" // Keep aspect ratio
              alt={`Kutya fotó ${index + 1}`} // Dinamikus alt text
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Search size={40} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mutass többet gomb */}
      {visibleImages < images.length && (
        <motion.button
          className="px-8 py-3 mt-8 mb-5 border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300 font-semibold"
          onClick={loadMore}
          whileTap={{ scale: 0.95 }}
        >
          További képek
        </motion.button>
      )}

      {/* Lightbox (nagyított kép + lapozás) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[100]" // Higher z-index
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)} // Close on backdrop click
          >
            <div className="relative flex items-center w-full max-w-4xl h-full max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on image itself */}
              {/* Balra lapozás */}
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-[101] transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft size={30} />
              </button>

              {/* Kép */}
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={images[selectedIndex]}
                  layout="fill" // Changed to fill for better responsiveness within the container
                  objectFit="contain" // Ensures the whole image is visible
                  className="rounded-lg shadow-2xl"
                  alt={`Nagyított kutya fotó ${selectedIndex + 1}`}
                />
              </div>
              

              {/* Jobbra lapozás */}
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-[101] transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight size={30} />
              </button>

              {/* Bezárás ikon */}
              <button
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-[101] transition-opacity"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={30} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KutyaGallery;