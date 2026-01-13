"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CheckCircle, Heart, Sun, Camera, X, ArrowRight, PawPrint } from "lucide-react";

// --- ADATOK ---

// Galéria képek (Masonry elrendezéshez - a te képeid alapján)
const galleryImages = [
  { src: "/images/_MG_5347.webp", alt: "Játék a parkban" },
  { src: "/images/_MG_5324.webp", alt: "Kutyus portré" },
  { src: "/images/_MG_5351.webp", alt: "Gazdival közösen" },
  // Ide tegyél még képeket, hogy szép legyen a rács! (Placeholderként duplikálom a meglévőket)
  { src: "/images/_MG_5347.webp", alt: "Szaladgálás" },
  { src: "/images/_MG_5324.webp", alt: "Figyelő tekintet" },
  { src: "/images/_MG_5351.webp", alt: "Ölelés" },
  { src: "/images/_MG_5347.webp", alt: "Természetben" },
  { src: "/images/_MG_5324.webp", alt: "Közeli kép" },
  { src: "/images/_MG_5351.webp", alt: "Boldogság" },
];

const dogPackages = [
  {
    title: "Pajkos Portrék",
    price: "9.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 30 perc",
    features: [
      "Személyes konzultáció",
      "10-15 db profi, retusált digitális fotó",
      "Minden további retusált kép: 1.990 Ft",
      "1 választott helyszín (pl. park)",
      "Kutyus és gazdi közös képei is",
      "Online válogató galéria",
    ],
    popular: false,
  },
  {
    title: "Kalandra Fel!",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 60-90 perc",
    features: [
      "Személyes konzultáció",
      "25 db profi, retusált digitális fotó",
      "Minden további retusált kép: 1.790 Ft",
      "Akár 2 helyszín a változatosságért",
      "Akciófotók, portrék, közös képek",
      "Online válogató galéria",
    ],
    popular: true,
  },
];

const faqData = [
  { 
    question: "Hogyan készüljünk fel?", 
    answer: "Érdemes a kutyust előtte megsétáltatni, hogy energikus, de ne 'túlpörgött' legyen. Hozz jutalomfalatot, vizet és a kedvenc játékát! Az alap vezényszavak (ül, marad) segítenek, de türelemmel mindent megoldunk nélkülük is." 
  },
  { 
    question: "A kutyám nagyon energikus / félénk...", 
    answer: "Imádom a kihívásokat! Minden kutyus egyedi. Ha energikus, akciófotókat készítünk, ha félénk, türelmesen, távolabbról kezdjük. A lényeg, hogy számára is pozitív élmény legyen a fotózás." 
  },
  { 
    question: "Hozhatok több kutyát is?", 
    answer: "Természetesen! Ha több kutyussal érkeznél, kérlek jelezd előre. Több kutyus esetén a hosszabb 'Kalandra Fel!' csomagot javaslom, hogy mindenkire jusson idő." 
  },
  { 
    question: "Milyen helyszíneken fotózunk?", 
    answer: "Zalaegerszeg és környéke tele van csodás helyekkel. Erdő, mező, tópart, vagy akár a saját kertetek. A lényeg, hogy a kutyus biztonságban érezze magát." 
  },
];

export default function DogPhotographyPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [visibleImages, setVisibleImages] = useState(6); 

  // Kiemelt képek
  const heroImage = "/images/_MG_5347.webp"; 
  const featuredImage = "/images/_MG_5324.webp";

  return (
    <div className="bg-white text-[#5A4A42] font-sans selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Kutyafotózás borítókép"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/20 md:bg-[#5A4A42]/20 mix-blend-multiply" />
        </motion.div>
        
        <div className="relative z-20 px-6 text-center max-w-4xl mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-6 border border-white/50 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase backdrop-blur-sm">
              Zalaegerszeg & Környéke
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-akaya drop-shadow-lg">
              Négylábú Kedvencek
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed text-white/90">
              Örökítsd meg kutyusod legboldogabb, legőszintébb pillanatait. <br className="hidden md:block"/> Portrék, akciófotók és közös képek a gazdival.
            </p>
            <Link 
              href="/contact?subject=Kutyafotozas" 
              className="inline-block bg-[#C79C8D] hover:bg-[#b3897b] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#C79C8D]/40 transform hover:-translate-y-1"
            >
              Időpontot foglalok
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-white/80" size={32} />
        </motion.div>
      </section>

      {/* 2. MIÉRT ÉLMÉNY? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Sun size={36} />, title: "Szabadtéri Kalandok", text: "A természetes fények és a környezet adják a legjobb hátteret az önfeledt játékhoz." },
              { icon: <PawPrint size={36} />, title: "Türelem & Játék", text: "Nem sietünk. Hagyjuk, hogy a kutyus felfedezzen, játsszon, és közben készülnek a képek." },
              { icon: <Heart size={36} />, title: "Örök Barátság", text: "A köztetek lévő kötelék megörökítése a célom. Egy emlék, ami örökre megmarad." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-6 rounded-3xl hover:bg-[#F9F5F1] transition-colors duration-500"
              >
                <div className="mb-6 inline-flex p-4 bg-[#F9F5F1] rounded-full text-[#C79C8D] group-hover:bg-[#C79C8D] group-hover:text-white transition-colors duration-500 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-akaya text-[#5A4A42]">{item.title}</h3>
                <p className="text-[#5A4A42]/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KIEMELT KÉP */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={featuredImage}
          alt="Kutya portré"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#5A4A42]/20" />
      </section>

      {/* 4. GALÉRIA */}
      <section className="py-24 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-akaya text-[#5A4A42]">Pillanatok</h2>
            <div className="w-20 h-1 bg-[#C79C8D] mx-auto rounded-full" />
            <p className="mt-4 text-[#5A4A42]/70">Néhány kedvenc képem a négylábú barátainkról.</p>
          </div>
          
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {galleryImages.slice(0, visibleImages).map((image, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#5A4A42]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Camera className="text-white w-8 h-8 drop-shadow-md" />
                </div>
              </motion.div>
            ))}
          </div>

          {visibleImages < galleryImages.length && (
            <div className="text-center mt-12">
               <button 
                onClick={() => setVisibleImages(prev => prev + 3)}
                className="text-[#C79C8D] font-bold text-lg hover:text-[#5A4A42] transition-colors underline underline-offset-4 decoration-2"
              >
                További képek mutatása
              </button>
            </div>
          )}
        </div>
      </section>

       {/* LIGHTBOX */}
       <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#5A4A42]/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full p-2 z-50">
              <X size={32} />
            </button>
            <div className="relative w-full max-w-5xl h-[85vh]">
              <Image 
                src={selectedImage} 
                alt="Nagyított kép" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CSOMAGOK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-akaya text-[#5A4A42]">Csomagajánlatok</h2>
            <p className="text-[#5A4A42]/70">Egyszerű, átlátható lehetőségek.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {dogPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-[2rem] transition-all duration-300 flex flex-col h-full ${
                  pkg.popular 
                    ? 'bg-white border-2 border-[#C79C8D] shadow-2xl scale-105 z-10' 
                    : 'bg-[#F9F5F1] border border-transparent hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#C79C8D] text-white text-[11px] font-bold tracking-[0.2em] px-4 py-2 rounded-full uppercase shadow-md">
                    Ajánlott
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2 font-akaya text-[#5A4A42] text-center">{pkg.title}</h3>
                <div className="mb-8 text-center border-b border-gray-200/50 pb-6">
                  <span className="text-4xl font-bold text-[#C79C8D] block mb-1">{pkg.price}</span>
                  <p className="text-sm text-[#5A4A42]/60 mb-3">{pkg.priceSuffix}</p>
                  <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#5A4A42]/80 shadow-sm border border-gray-100">
                    {pkg.duration}
                  </span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#5A4A42]/80">
                      <CheckCircle size={18} className="text-[#C79C8D] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className={`block text-center py-3 rounded-full font-bold transition-all shadow-md ${
                    pkg.popular 
                      ? 'bg-[#5A4A42] text-white hover:bg-[#463932]' 
                      : 'bg-white text-[#5A4A42] hover:bg-[#C79C8D] hover:text-white border border-[#C79C8D]/30'
                  }`}
                >
                  Lefoglalom
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GYIK */}
      <section className="py-24 bg-[#F9F5F1]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-10 text-center font-akaya text-[#5A4A42]">Gyakori Kérdések</h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors font-bold text-[#5A4A42]"
                >
                  <span className="text-lg">{item.question}</span>
                  <ChevronDown className={`transition-transform duration-300 text-[#C79C8D] ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 pt-0 text-[#5A4A42]/70 leading-relaxed border-t border-gray-100 mt-2">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-24 bg-[#5A4A42] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-akaya">Készen álltok a mókára?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
            A kutyusod nem csak egy háziállat, hanem családtag. Örökítsük meg a személyiségét!
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-[#C79C8D] hover:bg-[#b3897b] text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl hover:scale-105"
          >
            Vegyük fel a kapcsolatot <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}