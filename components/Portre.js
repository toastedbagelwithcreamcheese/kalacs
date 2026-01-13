"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Camera,
  Sparkles,
  Users,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  MapPin,
  ArrowRight,
  Image as ImageIcon
} from "lucide-react"; 

// --- GALÉRIA KÉPEK (Beleépítve) ---
const galleryImages = [
  "/images/_MG_4270festettV5.webp",
  "/images/_MG_8992.webp",
  "/images/_MG_7542.webp",
  "/images/Virag_BP/6.webp",
  "/images/_MG_8932.webp",
  "/images/_MG_4462.webp",
  "/images/Virag_BP/1_1.webp",
  "/images/_MG_4486.webp",
  "/images/_MG_8634.webp",
  "/images/Virag_BP/11.jpeg",
  "/images/Virag_BP/_MG_2433.jpg",
  "/images/_MG_8620.webp",
  "/images/_MG_7503.webp",
  "/images/Virag_BP/10.png",
  "/images/_MG_4523.webp",
  "/images/_MG_7041.webp",
  "/images/_MG_4619.webp",
  "/images/Evoto-(3 of 3).webp",
  "/images/_MG_7266.webp",
  "/images/_MG_9381.webp",
  "/images/Virag_BP/3.webp",
  "/images/_MG_0047.webp",
  "/images/_MG_0056-2.webp",
  "/images/Virag_BP/7.webp",
  "/images/_MG_0127-2.webp",
  "/images/Virag_BP/_MG_2841.webp",
  "/images/_MG_0586-2.webp",
  "/images/Virag_BP/5.webp",
  "/images/_MG_0568.webp",
  "/images/_MG_0315-2.webp",
  "/images/_MG_0274.webp",
];

// --- 3 CSOMAG LOGIKA ---
const packages = [
  {
    title: "Mini Portré",
    price: "9.900 Ft",
    duration: "30 perc",
    imageCount: "5 db retusált kép",
    desc: "Gyors, lényegretörő sorozat. Ideális önéletrajzhoz, LinkedInre vagy social media profilképnek.",
    features: [
      "Online konzultáció",
      "1 helyszín Zalaegerszegen",
      "1 szett ruha",
      "Online átadás 3 munkanapon belül"
    ],
    highlight: false,
  },
  {
    title: "Alap Portré",
    price: "14.900 Ft",
    duration: "60 perc",
    imageCount: "15 db retusált kép",
    desc: "A legnépszerűbb választás. Változatos beállítások, átöltözési lehetőség, kényelmes tempó.",
    features: [
      "Részletes koncepciótervezés",
      "1-2 helyszín",
      "2 szett ruha",
      "Online válogató galéria",
      "Ajándék fekete-fehér verziók"
    ],
    highlight: true, // Kiemelt
  },
  {
    title: "Prémium Portré",
    price: "24.900 Ft",
    duration: "90-120 perc",
    imageCount: "30 db retusált kép",
    desc: "A teljes élmény. Kreatív, művészi sorozat több helyszínen, kompromisszumok nélkül.",
    features: [
      "Személyes konzultáció",
      "Több helyszín (Zalaegerszeg + környéke)",
      "3+ szett ruha",
      "Kellékek használata",
      "Elsőbbségi retusálás (3 nap)"
    ],
    highlight: false,
  },
];

// --- GYIK ADATOK (Tömörítve) ---
const faqData = [
  { q: "Milyen ruhákat hozzak?", a: "Amiben magabiztos vagy! Kerüld az apró mintákat. Hozz 2-3 szettet, segíttek választani." },
  { q: "Sminkes / Fodrász?", a: "Nem kötelező, de sokat dob a képeken. Tudok ajánlani profit, ha szeretnéd." },
  { q: "Hol fotózunk?", a: "Szabadtéren (park, város), kávézóban vagy nálad. Rugalmas vagyok!" },
  { q: "Mikor kapom meg?", a: "Nyers képek: 1-2 nap. Retusált képek: a kiválasztástól számított 7-10 nap." },
];

export default function PortreFotozasModern() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Galéria State
  const [visibleImages, setVisibleImages] = useState(8);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // --- Galéria funkciók ---
  const loadMore = () => setVisibleImages((prev) => Math.min(prev + 4, galleryImages.length));
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e) => { e?.stopPropagation(); setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0)); };
  const prevImage = (e) => { e?.stopPropagation(); setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1)); };

  const heroImage = "/images/_MG_0315-2.webp"; 

  return (
    <div className="bg-white text-[#5A4A42]">
      
      {/* 1. HERO SZEKCIÓ (Kompakt) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  <div className="absolute inset-0 z-0">
    <Image
      src={heroImage}
      alt="Portré fotózás"
      fill
      className="object-contain brightness-50"
      priority
    />
  </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-white px-4 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-akaya drop-shadow-md">
            Portrék, amik <span className="text-[#C79C8D]">Rólad</span> szólnak
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light text-gray-200">
            Természetes, stílusos és őszinte képek. Fedezd fel a benned rejlő karaktert.
          </p>
          <Link
            href="/contact?subject=Portrefotozas_ajanlatkeres"
            className="inline-block bg-[#C79C8D] text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#5A4A42] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Időpontot foglalok
          </Link>
        </motion.div>
      </section>

      {/* 2. ÁRAK / CSOMAGOK (3 db) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5A4A42] mb-4 font-akaya">
              Csomagajánlatok
            </h2>
            <p className="text-gray-500">
              Válaszd ki a céljaidnak megfelelő csomagot. Nincsenek rejtett költségek.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:shadow-xl ${
                  pkg.highlight 
                    ? "border-[#C79C8D] bg-white shadow-2xl scale-105 z-10" 
                    : "border-gray-100 bg-[#F9F5F1]"
                }`}
              >
                {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C79C8D] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                        Ajánlott
                    </div>
                )}

                <h3 className="text-xl font-bold text-[#5A4A42] mb-2 font-akaya">{pkg.title}</h3>
                <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{pkg.desc}</p>
                
                <div className="mb-6 pb-6 border-b border-gray-200/50">
                    <span className="text-3xl font-bold text-[#C79C8D]">{pkg.price}</span>
                </div>

                {/* Infó sávok */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <Clock size={16} className="text-[#C79C8D]" /> {pkg.duration}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                    <ImageIcon size={16} className="text-[#C79C8D]" /> {pkg.imageCount}
                </div>
                
                <ul className="space-y-3 mb-8 text-left flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-[#C79C8D] shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact?subject=Portrecsomag_erdeklodes"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 ${
                      pkg.highlight
                      ? "bg-[#C79C8D] text-white hover:bg-[#5A4A42]"
                      : "bg-white border border-[#5A4A42] text-[#5A4A42] hover:bg-[#5A4A42] hover:text-white"
                  }`}
                >
                  Kiválasztom
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BEÉPÍTETT GALÉRIA (Igényes Grid) */}
      <section className="py-20 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-[#5A4A42] mb-2 font-akaya">
               Ízelítő a munkáimból
             </h2>
             <p className="text-gray-500 text-sm">Kattints a képekre a nagyításhoz</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
                {galleryImages.slice(0, visibleImages).map((src, index) => (
                    <motion.div
                        key={src}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-xl shadow-sm bg-gray-200"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={src}
                            alt={`Portré fotó ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                <Search size={24} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {visibleImages < galleryImages.length && (
            <div className="text-center mt-10">
                <button 
                    onClick={loadMore}
                    className="text-[#5A4A42] font-bold border-b-2 border-[#5A4A42] hover:text-[#C79C8D] hover:border-[#C79C8D] transition-colors pb-1"
                >
                    További képek betöltése
                </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. RÖVID GYIK + KAPCSOLAT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
            
            {/* Bal: GYIK */}
            <div>
                <h2 className="text-3xl font-bold text-[#5A4A42] mb-8 font-akaya">
                    Gyakori kérdések
                </h2>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                        <button
                        className="w-full flex justify-between items-center text-left font-bold text-[#5A4A42] hover:text-[#C79C8D] transition-colors"
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        >
                        <span>{item.q}</span>
                        <ChevronDown
                            size={18}
                            className={`transform transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`}
                        />
                        </button>
                        <AnimatePresence>
                        {openFaqIndex === index && (
                            <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-500 text-sm mt-2 leading-relaxed"
                            >
                            {item.a}
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    ))}
                </div>
            </div>

            {/* Jobb: CTA Doboz */}
            <div className="bg-[#261F1D] text-white p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#C79C8D] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
                 
                 <h3 className="text-2xl font-bold mb-4 font-akaya">Tetszik, amit látsz?</h3>
                 <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    Ne halogasd tovább! Foglalj időpontot egy kötetlen hangulatú fotózásra, és gazdagodj egy örök élménnyel.
                 </p>
                 <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#C79C8D] text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#5A4A42] transition-all duration-300 shadow-lg"
                 >
                    Időpontfoglalás <ArrowRight size={18} />
                 </Link>
            </div>
        </div>
      </section>

      {/* LIGHTBOX (Nagyítás) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={closeLightbox}>
                <X size={32} />
            </button>
            
            <button className="absolute left-4 text-white/70 hover:text-white p-2 bg-black/20 rounded-full" onClick={prevImage}>
                <ChevronLeft size={32} />
            </button>

            <motion.div 
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-w-5xl max-h-[90vh] p-2"
                onClick={(e) => e.stopPropagation()} // Kattintás a képre ne zárja be
            >
                <Image
                    src={galleryImages[lightboxIndex]}
                    alt="Nagyított portré"
                    width={1200}
                    height={1600}
                    className="object-contain max-h-[85vh] w-auto rounded-md shadow-2xl"
                />
            </motion.div>

            <button className="absolute right-4 text-white/70 hover:text-white p-2 bg-black/20 rounded-full" onClick={nextImage}>
                <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}