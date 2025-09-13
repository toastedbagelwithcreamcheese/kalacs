import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/_MG_4693.webp",
  "/images/_MG_0148-2-2.webp",
  "/images/_MG_8775.webp",
  "/images/_MG_0066-2.webp",
  "/images/_MG_4764.webp",
  "/images/_MG_0047-2.webp",
  "/images/_MG_4795.webp",
  "/images/_MG_8762.webp",
  "/images/_MG_0281-2-Edit.webp",
  "/images/_MG_4971.webp",
  "/images/_MG_0097-2.webp",
  "/images/_MG_9219.webp",
  "/images/_MG_0114-2.webp",
  "/images/_MG_9237.webp",
  "/images/_MG_8876.webp",
  "/images/_MG_1136.webp",
  "/images/_MG_9335.webp",
  "/images/_MG_0017-2.webp",
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadMore = () => {
    setVisibleImages((prev) => Math.min(prev + 6, images.length));
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="text-center">
      {/* Grid alapú galéria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {images.slice(0, visibleImages).map((src, index) => (
            <motion.div
              key={src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative cursor-pointer overflow-hidden group rounded-lg shadow-md"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                width={600}
                height={800}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt="Fotó"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Search size={40} className="text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mutass többet gomb */}
      {visibleImages < images.length && (
        <motion.button
          className="px-6 py-2 mt-6 mb-5 border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition"
          onClick={loadMore}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Mutass többet
        </motion.button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative flex items-center">
              {/* Balra */}
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
              <motion.div
                key={images[selectedIndex]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={images[selectedIndex]}
                  width={1000}
                  height={800}
                  className="rounded-lg shadow-lg max-h-[90vh] w-auto"
                  alt="Nagyított kép"
                />
              </motion.div>

              {/* Jobbra */}
              <button
                className="absolute right-2 bg-white p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={30} className="text-black" />
              </button>

              {/* Bezárás */}
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
