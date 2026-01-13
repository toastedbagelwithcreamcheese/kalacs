"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Coffee, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-[#F9F5F1] py-20 md:py-32 overflow-hidden relative">
      
      {/* Dekoratív háttér elem (opcionális, halvány kör) */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#C79C8D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. BAL OLDAL: KÉP (Rólad) */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* TIPP: Ide tölts fel egy jó portrét magadról a public/images mappába, és cseréld le az src-t! */}
              <Image 
                src="/images/_MG_0315-2.webp" 
                alt="Kovács Bálint fotográfus" 
                fill
                className="object-cover"
              />
            </div>
            {/* Lebegő "badge" */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block">
              <p className="font-akaya text-[#C79C8D] text-lg leading-tight">
                "A pillanat a tied, az emlék az enyém."
              </p>
            </div>
          </motion.div>

          {/* 2. JOBB OLDAL: SZÖVEG */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-[#C79C8D] font-bold uppercase tracking-widest text-sm mb-2">
              Bemutatkozás
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A4A42] mb-6 font-akaya leading-tight">
              Szia, Bálint vagyok!
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Zalaegerszegi fotósként a célom nem csupán a dokumentálás, hanem az érzések megőrzése. 
              Legyen szó egy felszabadult családi délutánról, életed nagy napjáról vagy a féltett autód részleteiről, 
              én azokat a pillanatokat keresem, amikor minden <b>őszinte és természetes</b>.
            </p>

            {/* Értékek / Stílusjegyek ikonokkal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <Heart className="text-[#C79C8D]" size={28} />
                <h3 className="font-bold text-[#5A4A42]">Őszinteség</h3>
                <p className="text-sm text-gray-500">Beállított pózok helyett valódi érzelmek.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Camera className="text-[#C79C8D]" size={28} />
                <h3 className="font-bold text-[#5A4A42]">Minőség</h3>
                <p className="text-sm text-gray-500">Profi technika és gondos utómunka.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Coffee className="text-[#C79C8D]" size={28} />
                <h3 className="font-bold text-[#5A4A42]">Hangulat</h3>
                <p className="text-sm text-gray-500">Feszengésmentes, baráti légkör.</p>
              </div>
            </div>

            {/* Gomb */}
            <Link href="/about" className="inline-flex items-center gap-2 bg-[#5A4A42] text-white px-8 py-3 rounded-full font-bold hover:bg-[#4a3c35] transition-all shadow-lg hover:shadow-xl group">
              Tudj meg többet rólam
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  );
}