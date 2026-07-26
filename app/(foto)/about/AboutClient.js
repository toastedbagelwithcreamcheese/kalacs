"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Camera, MapPin, ArrowRight, Heart, Sparkles, Coffee, Compass, Smile } from "lucide-react";

export default function AboutClient() {
  return (
    <div className="bg-white text-[#5A4A42] overflow-hidden">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-[#F9F5F1] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-[0.2em] text-xs mb-6">
              <MapPin size={16} /> Budapest • Zalaegerszeg • Országosan
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-akaya leading-tight mb-6 text-[#5A4A42]">
              Kovács <br/> <span className="text-[#C79C8D]">Bálint</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#5A4A42]/80 font-medium mb-8 italic">
              "Élményeket alkotunk, együtt."
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg font-light">
              Üdvözöllek! Zalaegerszegi és budapesti bázisú fotósként a szenvedélyem, hogy valódi érzelmeket és megismételhetetlen pillanatokat örökítsek meg. 
              Számomra minden fotózás egy közös kaland, ahol a cél, hogy olyan képek szülessenek, amik Rólad mesélnek.
            </p>
            
            <div className="flex flex-wrap gap-6">
                <Link href="/contact" className="bg-[#5A4A42] text-white font-bold py-4 px-10 rounded-full text-sm uppercase tracking-widest hover:bg-[#C79C8D] transition-colors shadow-lg hover:-translate-y-1 duration-300">
                    Kapcsolatfelvétel
                </Link>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
                <Image
                  src="/images/profilkep.webp" 
                  alt="Kovács Bálint, fotós Budapest és Zalaegerszeg"
                  fill
                  className="object-cover"
                  priority
                />
            </div>
            <div className="absolute inset-0 max-w-md mx-auto border border-[#C79C8D]/30 rounded-[2rem] transform translate-x-6 translate-y-6 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 2. A FILOZÓFIÁM SZEKCIÓ (Képpel kiegyensúlyozva) */}
      <section className="py-24 sm:py-32 bg-[#F9F5F1]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl sm:text-6xl font-bold text-[#5A4A42] font-akaya leading-tight mb-8">
                Emlékek, <br/> <span className="text-[#C79C8D] italic">nem csak képek.</span>
              </h2>
              <div className="text-lg text-[#5A4A42]/80 space-y-6 leading-relaxed font-light">
                  <p>
                    Hiszem, hogy a legjobb fotók akkor születnek, amikor felszabadult a hangulat és valódi a kapcsolódás. 
                    Nem hiszek a merev, beállított pózokban, amikben feszengve érzed magad. Ehelyett arra törekszem, 
                    hogy egy olyan közeget teremtsek, ahol <strong>önmagad lehetsz</strong>.
                  </p>
                  <p>
                    Két bázisom van: <strong className="text-[#5A4A42]">Zalaegerszeg és Budapest</strong>. 
                    Ez a két város adja a mindennapjaim ritmusát, de egy izgalmas projektért az ország bármely pontjára 
                    szívesen elutazom. A helyszín végül is csak egy díszlet; a lényeg Ti vagytok.
                  </p>
                  <p>
                    Legyen szó egy esküvőről, egy játékos családi délutánról vagy az imádott autódról, 
                    olyan emlékeket készítek, amiket évek múltán is öröm lesz újra és újra elővenni.
                  </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
            >
               {/* TIPP: Ide tegyél be egy olyan képet, ami a munkádat szimbolizálja (pl. ahogy fotózol egy esküvőt, egy elkapott nevetés, vagy egy fényképezőgép) */}
              <Image 
                src="/images/_BF_6727.webp" 
                alt="Munka közben" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-[#5A4A42]/10 mix-blend-multiply" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. MUNKAMÓDSZER (Hogyan dolgozom?) */}
      <section className="py-24 bg-white border-b border-[#5A4A42]/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-akaya text-[#5A4A42] mb-4">Így dolgozom én</h2>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              A tökéletes végeredményhez nem csak jó fényképezőgép kell, hanem egy jól felépített folyamat és bizalom is.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-[#F9F5F1] p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#C79C8D] mb-6 shadow-sm">
                <Smile size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#5A4A42] mb-3">Pózok helyett instrukciók</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Nem fogom azt mondani, hogy "állj ide és mosolyogj". Helyette feladatokat, játékos instrukciókat adok, amikből megszületnek a valódi mosolyok.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-[#F9F5F1] p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#C79C8D] mb-6 shadow-sm">
                <Camera size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#5A4A42] mb-3">Láthatatlan jelenlét</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Főleg esküvőkön és rendezvényeken igyekszem észrevétlenül a háttérbe olvadni, hogy a legtisztább, dokumentarista pillanatokat tudjam elkapni.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="bg-[#F9F5F1] p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#C79C8D] mb-6 shadow-sm">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#5A4A42] mb-3">Prémium utómunka</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                A kattintás csak az első lépés. Minden átadott kép egyenként, aprólékos szín- és fényelésen, valamint finom retusáláson esik át a saját stílusomban.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. A LENCSE TÚLOLDALÁN (Személyes fun facts) */}
      <section className="py-24 bg-[#F9F5F1]">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-akaya text-[#5A4A42] mb-12">A lencsén túl...</h2>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white px-6 py-4 rounded-full shadow-sm flex items-center gap-3 border border-gray-100 text-[#5A4A42] font-medium"
            >
              <Coffee className="text-[#C79C8D]" size={20} /> Kávérajongó
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white px-6 py-4 rounded-full shadow-sm flex items-center gap-3 border border-gray-100 text-[#5A4A42] font-medium"
            >
              <Heart className="text-[#C79C8D]" size={20} /> Kutyabarát
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white px-6 py-4 rounded-full shadow-sm flex items-center gap-3 border border-gray-100 text-[#5A4A42] font-medium"
            >
              <Compass className="text-[#C79C8D]" size={20} /> Imádok utazni
            </motion.div>
          </div>
          
          <p className="mt-12 text-gray-500 font-light italic max-w-2xl mx-auto">
            Hiszem, hogy egy jó képhez elengedhetetlen, hogy ismerjük és megértsük egymást. Számomra te nem csak egy ügyfél vagy, hanem egy új történet, amit elmesélhetek.
          </p>
        </div>
      </section>

      {/* 5. ZÁRÓ CTA */}
      <section className="py-32 bg-[#5A4A42] text-white text-center px-6">
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                className="max-w-3xl mx-auto"
            >
                <Camera className="mx-auto mb-8 text-[#C79C8D]" size={48} />
                <h2 className="text-4xl sm:text-6xl font-bold mb-6 font-akaya text-white">
                    Alkosson a fókuszunk.
                </h2>
                <p className="text-xl text-gray-300 mb-12 font-light">
                    Készen állsz egy feszengésmentes, jó hangulatú fotózásra Budapesten, Zalában, vagy bárhol máshol?
                </p>
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#C79C8D] text-white font-bold py-5 px-12 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-[#5A4A42] transition-colors shadow-xl hover:-translate-y-1 duration-300">
                    Időpontot kérek <ArrowRight size={18} />
                </Link>
            </motion.div>
      </section>

    </div>
  );
}