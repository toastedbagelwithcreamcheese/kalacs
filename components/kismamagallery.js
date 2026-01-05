import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/_MG_4693.webp",
  "/images/kata_kismama/_47A7843-2.jpeg",
  "/images/kata_kismama/_47A7885-2.jpg",
  "/images/_MG_4958.webp",
  "/images/kata_kismama/_47A7897-2.jpg",
  "/images/kata_kismama/_47A8142-2.jpg",
  "/images/_MG_4731.webp",
  "/images/kata_kismama/_47A8160-2.jpg",
  "/images/_MG_4931.webp",
  "/images/kata_kismama/_47A8248-2.jpg",
  "/images/kata_kismama/_47A8279-2.jpg",
  "/images/kata_kismama/_47A8484-2.jpg",
  "/images/_MG_4966.webp",
  "/images/kata_kismama/_47A8666-2.jpg",
  "/images/kata_kismama/_47A8673-2.jpg",
  "/images/kata_kismama/_47A8966-2.jpg",
  "/images/_MG_4764.webp",
  "/images/kata_kismama/_47A9009-2.jpg",
  "/images/kata_kismama/_47A9056-2.jpeg",
  "/images/kata_kismama/_47A9056-2.jpg",
  "/images/kata_kismama/_47A9104-2.jpg",
  "/images/kata_kismama/_47A9146-2.jpg",
  "/images/_MG_4971.webp",
  "/images/kata_kismama/_47A9158-2.jpg",
  "/images/kata_kismama/_47A9191-2.jpg",
  "/images/kata_kismama/_47A9221-2.jpg",
  "/images/kata_kismama/B56E8960-7048-4562-BD9A-C27C2E6FEE1A.jpg",
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(4);
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
    <div className="text-center">
      {/* Galéria */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, visibleImages).map((src, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={src}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
              alt="Kismama fotó"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Search size={40} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mutass többet gomb */}
      {visibleImages < images.length && (
        <motion.button
          className="px-6 py-2 mt-6 mb-5 border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition"
          onClick={loadMore}
          whileTap={{ scale: 0.95 }}
        >
          Mutass többet
        </motion.button>
      )}

      {/* Lightbox (nagyított kép + lapozás) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative flex items-center">
              {/* Balra lapozás */}
              <button
                className="absolute left-2 bg-white p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={30} className="text-black" />
              </button>

              {/* Kép */}
              <Image
                src={images[selectedIndex]}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                alt="Nagyított kép"
              />

              {/* Jobbra lapozás */}
              <button
                className="absolute right-2 bg-white p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={30} className="text-black" />
              </button>

              {/* Bezárás ikon */}
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={30} className="text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
