"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CheckCircle, Heart, Users, Camera, X, ArrowRight, Star } from "lucide-react";

// --- ADATOK ---

// Képek listája (Masonry elrendezéshez)
const galleryImages = [
  { src: "/images/kata_kismama/_47A7843-2.jpeg", alt: "Kismama portré a természetben" },
  { src: "/images/kata_kismama/_47A7885-2.jpg", alt: "Pocak lakója" },
  { src: "/images/kata_kismama/_47A7897-2.jpg", alt: "Boldog várakozás" },
  { src: "/images/kata_kismama/_47A8142-2.jpg", alt: "Anya és a természet" },
  { src: "/images/kata_kismama/_47A8160-2.jpg", alt: "Meghitt pillanatok" },
  { src: "/images/kata_kismama/_47A8248-2.jpg", alt: "Naplemente fényei" },
  { src: "/images/kata_kismama/_47A8279-2.jpg", alt: "Részletfotó" },
  { src: "/images/kata_kismama/_47A8484-2.jpg", alt: "Családi kismama fotózás" },
  { src: "/images/kata_kismama/_47A8666-2.jpg", alt: "Mosoly és boldogság" },
  { src: "/images/kata_kismama/_47A8673-2.jpg", alt: "Természetes beállítás" },
  { src: "/images/kata_kismama/_47A8966-2.jpg", alt: "Elegáns kismama ruha" },
  { src: "/images/kata_kismama/_47A9009-2.jpg", alt: "Várakozás" },
  { src: "/images/kata_kismama/_47A9056-2.jpeg", alt: "Fekete-fehér hangulat" },
  { src: "/images/kata_kismama/_47A9104-2.jpg", alt: "Közeli portré" },
  { src: "/images/kata_kismama/_47A9146-2.jpg", alt: "Anya szemei" },
  { src: "/images/kata_kismama/_47A9158-2.jpg", alt: "Harmónia" },
  { src: "/images/kata_kismama/_47A9191-2.jpg", alt: "Apával közösen" },
  { src: "/images/kata_kismama/_47A9221-2.jpg", alt: "Boldog szülők" },
  { src: "/images/_MG_4795.webp", alt: "Boldog szülők" },
  { src: "/images/_MG_4731.webp", alt: "Boldog szülők" },
  { src: "/images/_MG_4693.webp", alt: "Boldog szülők" },
  { src: "/images/_MG_4805.jpg", alt: "Boldog szülők" },
];

const maternityPackages = [
  {
    title: "Pocak Varázs",
    price: "19.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 45-60 perc",
    features: [
      "Előzetes konzultáció a stílusról",
      "15-20 db profi, retusált digitális fotó",
      "Minden további retusált kép: 1.990 Ft",
      "1 választott helyszín (szabadtér/otthon)",
      "Online, jelszóval védett galéria",
    ],
    popular: false,
  },
  {
    title: "Családi Álmodozás",
    price: "24.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 60-90 perc",
    features: [
      "Részletes konzultáció, koncepció",
      "25-30 db profi, retusált digitális fotó",
      "Akár 2 helyszín a változatosságért",
      "Apás, tesós és közös képek is",
      "Online galéria válogatáshoz",
    ],
    popular: true,
  },
  {
    title: "Örökké Emlék",
    price: "34.900 Ft",
    priceSuffix: "(alapdíj)",
    duration: "kb. 90-120 perc",
    features: [
      "35+ db profi minőségű retusált fotó",
      "Minden további retusált kép: 1.590 Ft",
      "Rugalmas helyszínválasztás",
      "Ajándék 10 db 10x15-ös papírkép",
      "Prémium online galéria",
    ],
    popular: false,
  },
];

const faqData = [
  { question: "Mikor érdemes a fotózást időzíteni?", answer: "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, látványos, de még nem okoz túl nagy kényelmetlenséget a mozgásban." },
  { question: "Milyen ruhát hozzak?", answer: "Ajánlott világos, pasztell színű (bézs, fehér, földszínek), testhezálló vagy lágy esésű ruhákat választani. Kerüld a nagy feliratokat. Szívesen segítek a ruhák kiválasztásában is!" },
  { question: "Jöhet a párom és a tesó is?", answer: "Természetesen! Sőt, bátorítalak is rá, hiszen ez egy közös családi várakozás. Az 'apás' és közös képek mindig a legmeghatóbbak." },
  { question: "Hogyan kapom meg a képeket?", answer: "A fotózás után 1-2 napon belül küldöm a nyers válogató galériát. A kiválasztott, retusált képeket digitálisan adom át, nagy felbontásban." },
];

export default function KismamaFotozasPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Lightbox state
  const [visibleImages, setVisibleImages] = useState(9); // Kezdetben 9 kép

  // Kiemelt képek
  const heroImage = "/images/kata_kismama/_47A9158-2.jpg";
  const featuredImage = "/images/kata_kismama/_47A9009-2.jpg";

  return (
    <div className="bg-white text-[#5A4A42] font-sans selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Háttérkép animációval */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Kismama fotózás borítókép"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/30 md:bg-[#5A4A42]/30 mix-blend-multiply" />
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
              Az Anyaság Varázsa
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed text-white/90">
              Örökítsük meg a várakozás legszebb pillanatait finom, természetes és időtálló fotókon.
            </p>
            <Link 
              href="/contact?subject=Kismamafotozas" 
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
              { icon: <Heart size={36} />, title: "Meghitt Hangulat", text: "Feszültségmentes, nyugodt környezetben alkotunk, ahol Te vagy a középpontban." },
              { icon: <Star size={36} />, title: "Profi Utómunka", text: "Minden kép egyedi, finom retust kap a természetesség és az elegancia jegyében." },
              { icon: <Users size={36} />, title: "Családi Élmény", text: "A párod és a nagyobb tesók is a részesei lehetnek az élménynek." },
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

      {/* 3. KIEMELT KÉP (Parallax jellegű) */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={featuredImage}
          alt="Kismama részletfotó"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#5A4A42]/20" />
      </section>

      {/* 4. GALÉRIA (Masonry Layout + Lightbox) */}
      <section className="py-24 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-akaya text-[#5A4A42]">Portfolio</h2>
            <div className="w-20 h-1 bg-[#C79C8D] mx-auto rounded-full" />
            <p className="mt-4 text-[#5A4A42]/70">Pillantás a legszebb várakozásba.</p>
          </div>
          
          {/* Masonry Grid (CSS columns) */}
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
                  height={800} // Csak arány miatt, a masonry kezeli a magasságot
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
                onClick={() => setVisibleImages(prev => prev + 6)}
                className="text-[#C79C8D] font-bold text-lg hover:text-[#5A4A42] transition-colors underline underline-offset-4 decoration-2"
              >
                További képek mutatása
              </button>
            </div>
          )}
        </div>
      </section>

       {/* LIGHTBOX MODAL */}
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
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-akaya text-[#5A4A42]">Választható Csomagok</h2>
            <p className="text-[#5A4A42]/70">Átlátható árak, rejtett költségek nélkül.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {maternityPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-[2rem] transition-all duration-300 flex flex-col ${
                  pkg.popular 
                    ? 'bg-white border-2 border-[#C79C8D] shadow-2xl scale-105 z-10' 
                    : 'bg-[#F9F5F1] border border-transparent hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#C79C8D] text-white text-[11px] font-bold tracking-[0.2em] px-4 py-2 rounded-full uppercase shadow-md">
                    Legnépszerűbb
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-akaya">Megőrizzük az emlékeket?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
            Keress bizalommal, és beszéljük át az elképzeléseidet egy kötetlen beszélgetés során.
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