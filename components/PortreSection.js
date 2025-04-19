"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Maximize } from "lucide-react";
import Link from "next/link";

const PortreSection = ({ title, description, images, extraImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.section
      className="bg-[#F5EDE6] py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* BAL OLDAL - SZÖVEG */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#C79984]">
            {title}
          </h2>
          <p className="text-gray-700 mt-4">{description}</p>
          <Link
            href="/portre"
            className="inline-flex items-center px-4 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105 max-w-[220px] mt-2.5"
          >
            Fedezd fel a részleteket!
          </Link>
        </motion.div>

        {/* JOBB OLDAL - KÉPEK */}
        <motion.div
          className="md:w-1/2 grid grid-cols-2 gap-1 relative" // Csökkentett távolság
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full aspect-[3/4] group cursor-pointer overflow-hidden" // Fix képarány
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{img.title}</p>
                <Maximize className="text-white mt-2 w-6 h-6" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* EXTRA KÉPEK - UGYANÚGY AZ ELSŐDLEGES KÉPEK ALATT */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {extraImages.map((img, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">
                    {img.title}
                  </p>
                  <Maximize className="text-white mt-2 w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MUTASS TÖBBET GOMB */}
      <motion.div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setShowMore(!showMore)}
          className="px-6 py-2 bg-[#C79984] text-white rounded-lg font-semibold hover:bg-[#b18877] transition-all duration-200 transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {showMore ? "Kevesebb" : "Mutass többet"}
        </motion.button>
      </motion.div>

      {/* MODÁL TELJES KÉPERNYŐS KÉPHEZ */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Teljes képernyős kép"
            width={900}
            height={600}
            className="max-w-full max-h-full object-contain" // Hozzáadtam az object-contain-t
          />
        </motion.div>
      )}
    </motion.section>
  );
};

export default PortreSection;
