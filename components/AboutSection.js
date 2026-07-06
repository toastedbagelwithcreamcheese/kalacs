"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Coffee, Heart, MapPin } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function AboutSection() {
  return (
    <section className="bg-[#F9F5F1] py-24 md:py-32 overflow-hidden relative border-t border-[#5A4A42]/5">
      
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#C79C8D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* 1. BAL OLDAL: KÉP (Rólad) */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TiltCard tiltStrength={6} className="rounded-[2rem]">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                {/* TIPP: Ide tölts fel egy jó portrét magadról a public/images mappába! */}
                <Image
                  src="/images/profilkep.webp"
                  alt="Kovács Bálint fotográfus Zalaegerszeg Budapest"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </TiltCard>
            {/* Lebegő "badge" - Letisztultabb lett */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white p-6 rounded-2xl shadow-xl max-w-[220px] hidden md:block border border-[#5A4A42]/5">
              <p className="font-akaya text-[#C79C8D] text-xl leading-tight">
                "A pillanat a tied, az emlék az enyém."
              </p>
            </div>
          </motion.div>

          {/* 2. JOBB OLDAL: SZÖVEG */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-[0.2em] text-xs mb-6">
              <MapPin size={16} /> Budapest & Zalaegerszeg
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-[#5A4A42] mb-6 font-akaya leading-tight">
              Szia, Bálint vagyok!
            </h2>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              <strong className="font-medium text-[#5A4A42]">Zalaegerszegi és budapesti</strong> bázisú fotósként a célom nem csupán a dokumentálás, hanem az érzések megőrzése. 
              Legyen szó egy felszabadult családi délutánról, életed nagy napjáról vagy a féltett autód részleteiről, 
              én azokat a pillanatokat keresem, amikor minden őszinte és természetes.
            </p>

            {/* Értékek */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col gap-2 border-l-2 border-[#C79C8D]/30 pl-4">
                <Heart className="text-[#C79C8D] mb-1" size={24} />
                <h3 className="font-bold text-[#5A4A42] text-sm uppercase tracking-wider">Őszinteség</h3>
                <p className="text-sm text-gray-500 font-light">Valódi érzelmek pózok helyett.</p>
              </div>
              <div className="flex flex-col gap-2 border-l-2 border-[#C79C8D]/30 pl-4">
                <Camera className="text-[#C79C8D] mb-1" size={24} />
                <h3 className="font-bold text-[#5A4A42] text-sm uppercase tracking-wider">Minőség</h3>
                <p className="text-sm text-gray-500 font-light">Profi technika, gondos utómunka.</p>
              </div>
              <div className="flex flex-col gap-2 border-l-2 border-[#C79C8D]/30 pl-4">
                <Coffee className="text-[#C79C8D] mb-1" size={24} />
                <h3 className="font-bold text-[#5A4A42] text-sm uppercase tracking-wider">Hangulat</h3>
                <p className="text-sm text-gray-500 font-light">Baráti, feszengésmentes légkör.</p>
              </div>
            </div>

            {/* Gomb */}
            <Link href="/about" className="inline-flex items-center gap-3 border-b-2 border-[#5A4A42] pb-1 text-[#5A4A42] font-bold uppercase tracking-widest text-sm hover:text-[#C79C8D] hover:border-[#C79C8D] transition-all group">
              Tudj meg többet rólam
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  );
}