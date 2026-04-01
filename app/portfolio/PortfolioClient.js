"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// --- A LEGJOBB KÉPEID (Minden kategóriából válogatva) ---
// Ide tényleg csak a "Wow" faktoros képeket tedd!
const portfolioImages = [
  { src: "/images/Eskuvo2026-3.webp", category: "Esküvő", alt: "Esküvői főkép" },
  { src: "/images/_MG_0315-2.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_7632.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/karacsony_patriek/_47A2095.jpeg", category: "Család/Kismama", alt: "Karácsonyi családi pillanat" },
  { src: "/images/_BF_6727.jpg", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_BF_6726.jpg", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/asdf.jpg", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_MG_5347.webp", category: "Kutyusok", alt: "Kutyás akciófotó" },
  { src: "/images/_BF_7627.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_2535.webp", category: "Esküvő", alt: "Esküvői portré" },
  { src: "/images/kata_kismama/_47A9158-2.jpg", category: "Család/Kismama", alt: "Kismama fotó" },
  { src: "/images/_MG_4270festettV5.webp", category: "Portré", alt: "Művészi portré" },
  { src: "/images/_BF_2915.webp", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_BF_7732.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/6.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_3127.webp", category: "Esküvő", alt: "Esküvői kreatív" },
  { src: "/images/_MG_8762.webp", category: "Család/Kismama", alt: "Családi fotó a réten" },
  { src: "/images/_BF_7664.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/1_1.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/anna_varosliget/_47A7016.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/anna_varosliget/_47A7180.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/_MG_2456.jpg", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Eskuvo2026.webp", category: "Esküvő", alt: "Vicces esküvői fotó" },
  { src: "/images/karacsony_patriek/_47A2250.jpeg", category: "Család/Kismama", alt: "Családi ölelés a fa alatt" },
  { src: "/images/_MG_5324.webp", category: "Kutyusok", alt: "Kutya portré" },
  { src: "/images/Virag_BP/10.png", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_7636.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_6908.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/Virag_BP/8.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_6906.webp", category: "Autók", alt: "Kreatív Autó fotó" },
  { src: "/images/_BF_6913.webp", category: "Autók", alt: "Kreatív Autó fotó" },
  { src: "/images/_BF_6916.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_0390.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9146-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0045.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_8620.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_4462.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/Rendszamnelkul-7580.jpg", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8248-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_7633.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_0586-2.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9191-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0031.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_8842.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0274.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9009-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0003.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_9335.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0568.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/Rendszamnelkul-7651.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8484-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0490.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/_MG_8992.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_7636.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8279-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_1136.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0097-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/kata_kismama/_47A9104-2.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_9219.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/kata_kismama/B56E8960-7048-4562-BD9A-C27C2E6FEE1A.jpg", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0017-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_8775.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_8634.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
];

const categories = ["Összes", "Esküvő", "Portré", "Család/Kismama", "Autók", "Kutyusok"];

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("Összes");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Képek szűrése az aktív kategória alapján
  const filteredImages = portfolioImages.filter(
    (img) => activeCategory === "Összes" || img.category === activeCategory
  );

  return (
    <main className="bg-[#F9F5F1] min-h-screen pt-32 pb-24 selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. HEADER (Nagyon letisztult, elegáns) */}
      <section className="container mx-auto px-6 text-center mb-16 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-[#C79C8D] font-bold uppercase tracking-[0.3em] text-xs mb-6"
        >
          Mestermunkák
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-akaya text-[#5A4A42] mb-8"
        >
          A pillanatok, <br/> <span className="text-[#C79C8D] italic">amiket megőrzök.</span>
        </motion.h1>
      </section>

      {/* 2. SZOLID SZŰRŐ (Minimalista, szöveges navigáció) */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-[#5A4A42]/10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative text-sm md:text-base font-medium tracking-wide pb-2 transition-colors duration-300"
            >
              <span className={activeCategory === category ? "text-[#5A4A42] font-bold" : "text-[#5A4A42]/50 hover:text-[#C79C8D]"}>
                {category}
              </span>
              {/* Finom animált vonal az aktív elem alatt */}
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C79C8D]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MASONRY GALÉRIA (Rács elrendezés lágy animációkkal) */}
      <section className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          layout 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                key={img.src} // A kulcs nagyon fontos az animációhoz!
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setLightboxIndex(portfolioImages.indexOf(img))} // Eredeti indexet keresünk a Lightboxhoz
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
                
                {/* Finom hover effektus (Kamera ikon + Kategória név) */}
                <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                   <Camera className="text-white w-8 h-8 mb-3 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                   <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                     {img.category}
                   </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Ha üres lenne egy kategória (bár a mostani listában nincs ilyen) */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-[#5A4A42]/50 font-light">
            Ebben a kategóriában jelenleg nincsenek feltöltve képek.
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX (Képnagyító) */}
      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        // Itt a teljes listát adjuk át, hogy a nagyítóban lehessen lapozni is
        slides={portfolioImages.map(img => ({ src: img.src, alt: img.alt }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(38, 31, 29, 0.98)" } }}
      />
    </main>
  );
}