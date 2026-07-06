"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroFineArt() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Görgetés figyelése a parallax effekthez
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Eltérő mozgási sebességek beállítása
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // A kép lassan lefelé csúszik
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // A háttérszöveg gyorsan felfelé
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Görgetésre lassan eltűnik az alsó doboz

  // Egérkövető, finom 3D dőlés a fókuszképen
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#F9F5F1] flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ perspective: 1200 }}
    >

      {/* 1. OSZTOTT HÁTTÉR TIPOGRÁFIA (Parallax mozgással) */}
      <motion.div 
        style={{ y: textY }}
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-2 sm:px-8 lg:px-16 z-0 pointer-events-none select-none"
      >
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[16vw] md:text-[13vw] lg:text-[14vw] font-bold font-akaya text-[#5A4A42]/5 leading-none"
        >
          Kovács
        </motion.h1>
        
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[16vw] md:text-[13vw] lg:text-[14vw] font-bold font-akaya text-[#5A4A42]/5 leading-none"
        >
          Bálint
        </motion.h1>
      </motion.div>

      {/* 2. A FÓKUSZPONT: KÉP MASZKOLT BETÖLTÉSSEL (Reveal), PARALLAX-al ÉS EGÉRKÖVETŐ 3D DŐLÉSSEL */}
      <motion.div
        style={{
          y: imageY,
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-[75vw] sm:w-[50vw] md:w-[400px] lg:w-[450px] aspect-[4/5] shadow-2xl rounded-sm overflow-hidden"
      >
        {/* A trükk: a konténer clipPath segítségével lentről felfelé "nyílik ki" */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.77, 0, 0.175, 1] }} // Profi, filmes animációs görbe
          className="w-full h-full relative"
        >
          <Image
            src="/images/_BF_2915.webp" // A kedvenc fotód
            alt="Kovács Bálint Fotográfia"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Kép finom nagyítása (scale) a maszkolás alatt */}
          <motion.div 
            initial={{ scale: 1.2 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 2, ease: "easeOut" }} 
            className="absolute inset-0"
          />
        </motion.div>
        
        <div className="absolute inset-4 border border-white/20 pointer-events-none z-20" />
      </motion.div>

      {/* 3. LETISZTULT SZÖVEG (Görgetésre eltűnik) */}
      <motion.div
        style={{ opacity: opacityFade }} // Görgetéskor halványodik
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center mt-10 md:-mt-8 px-4"
      >
        <div className="bg-[#F9F5F1]/80 backdrop-blur-md px-8 py-6 rounded-2xl shadow-sm border border-[#5A4A42]/5 inline-block">
          <h2 className="text-3xl md:text-4xl font-bold font-akaya text-[#5A4A42] mb-2">
            A pillanat <span className="italic text-shimmer">művészete.</span>
          </h2>
          <p className="text-[#5A4A42]/70 text-sm md:text-base mb-6 font-light max-w-xs mx-auto">
            Letisztult, őszinte és időtálló emlékek.
          </p>
          
          <Link 
            href="/contact" 
            className="inline-block border-b-2 border-[#C79C8D] pb-1 text-[#5A4A42] font-bold uppercase tracking-widest text-xs hover:text-[#C79C8D] transition-colors"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </motion.div>

      {/* 4. GÖRDÍTÉSRE ÖSZTÖNZŐ JEL */}
      <motion.div
        style={{ opacity: opacityFade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A4A42]/50 font-bold">
          Görgess
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#C79C8D]" />
        </motion.div>
      </motion.div>

    </section>
  );
}