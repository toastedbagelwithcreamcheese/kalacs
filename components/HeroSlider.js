"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- SLIDE ADATOK (A te eredeti adataid) ---
const slides = [
  {
    image: "/images/_MG_0315-2.webp",
    desktopImage: "/images/portre-collage.png",
    title: "Portrék",
    text: "Stílusos portrék, amelyek megmutatják egyéniséged.",
    buttonText: "Részletek",
    link: "/portre",
  },
  {
    image: "/images/_MG_4693.webp",
    desktopImage: "/images/kismama-collage.png",
    title: "Kismama",
    text: "A várandósság varázsa finom, meghitt pillanatokban.",
    buttonText: "Részletek",
    link: "/kismama",
  },
  {
    image: "/images/_MG_4693.webp",
    desktopImage: "/images/csaladi-collage.png",
    title: "Családi Fotózás",
    text: "Örökítsd meg a család minden mosolyát és pillanatát szeretettel és természetességgel.",
    buttonText: "Részletek",
    link: "/family-sessions",
  },
  {
    image: "/images/audi_tel-1198.webp",
    desktopImage: "/images/AutoKollazs.png",
    title: "Autó Fotózás",
    text: "Lenyűgöző formák és dinamikus részletek, prémium minőségben.",
    buttonText: "Részletek",
    link: "/autok",
  },
  {
    image: "/images/_MG_5347.webp",
    desktopImage: "/images/kutyus_kollazs.png",
    title: "Kutyus Fotózás",
    text: "Játékos kalandok és felejthetetlen emlékek a négylábú barátodról.",
    buttonText: "Részletek",
    link: "/kutyusok",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const timeoutRef = useRef(null);

  const slideDuration = 5000;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isHovered) {
      timeoutRef.current = setTimeout(
        () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
        slideDuration
      );
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, isHovered]);

  const nextSlide = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const currentSlide = slides[index];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut" }
          }}
          exit={{ opacity: 0 }}
        >
          {/* Sötétítés a kép alatt az olvashatóságért */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <Image
            src={isDesktop ? currentSlide.desktopImage : currentSlide.image}
            alt={currentSlide.title}
            fill
            className="object-cover"
            priority={true}
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-6">
        <AnimatePresence mode="wait">
          <motion.div
              key={index + "-text"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
              <h2 className="text-xl md:text-3xl font-bold uppercase tracking-[0.2em] text-white/90 mb-4 font-akaya">
                  {currentSlide.title}
              </h2>
              <p className="text-3xl md:text-6xl font-bold max-w-4xl mb-8 leading-tight drop-shadow-lg">
                  {currentSlide.text}
              </p>
              <Link href={currentSlide.link} className="inline-block btn-primary">
                  {currentSlide.buttonText}
              </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigációs gombok */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition text-white">
          <ArrowLeft size={24}/>
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition text-white">
          <ArrowRight size={24}/>
      </button>

      {/* Pagináció */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${index === i ? "w-12 bg-white" : "w-4 bg-white/40"}`}
            aria-label={`Ugrás a ${i + 1}. diára`}
          />
        ))}
      </div>
    </div>
  );
}