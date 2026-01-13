"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Camera, Heart, Sparkles, ArrowRight, Aperture, Users, Clock } from "lucide-react";

export default function AboutPageModern() {

  // --- SZOLGÁLTATÁSOK ADATAI ---
  const services = [
    { 
        title: "Portré", 
        desc: "Egyedi portrék, amelyek megmutatják a valódi éned.", 
        link: "/portre",
        icon: <Users size={24} className="text-[#C79C8D]" />
    },
    { 
        title: "Családi Fotózás", 
        desc: "A közös nevetések és ölelések örök emléke.", 
        link: "/family-sessions",
        icon: <Heart size={24} className="text-[#C79C8D]" />
    },
    { 
        title: "Autófotózás", 
        desc: "Prémium minőségű képek a büszkeségedről.", 
        link: "/autok",
        icon: <Aperture size={24} className="text-[#C79C8D]" />
    },
    { 
        title: "Kismama fotózás", 
        desc: "A várakozás csodája, meghitt hangulatban.", 
        link: "/kismama",
        icon: <Sparkles size={24} className="text-[#C79C8D]" />
    }
  ];

  // --- ÉRTÉKEK / STATISZTIKA (Opcionális, de feldobja az oldalt) ---
  const values = [
      { icon: <Camera size={32} />, title: "Profi Technika", text: "Csúcsminőségű felszerelés" },
      { icon: <Clock size={32} />, title: "Rugalmasság", text: "Hozzád igazodva" },
      { icon: <Heart size={32} />, title: "Szenvedély", text: "Szívvel-lélekkel" },
  ];

  return (
    <div className="bg-white text-[#5A4A42] overflow-hidden">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6">
        {/* Dekoratív háttér elem */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-[#F7E7CE]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Szöveg */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <h4 className="text-[#C79C8D] font-bold uppercase tracking-widest text-sm mb-4">
              Ismerj meg közelebbről
            </h4>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-akaya leading-tight mb-6 text-[#5A4A42]">
              Kovács Bálint
            </h1>
            <p className="text-xl md:text-2xl text-[#C79C8D] font-medium mb-8" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
              "Élményeket alkotunk, együtt."
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Üdvözöllek! Zalaegerszegi fotósként a szenvedélyem, hogy valódi érzelmeket és megismételhetetlen pillanatokat örökítsek meg. 
              Számomra minden fotózás egy közös kaland, ahol a cél, hogy olyan képek szülessenek, amik Rólad mesélnek.
            </p>
            
            <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-[#5A4A42] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#4a3c35] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Vegyük fel a kapcsolatot
                </Link>
                <Link href="#filozofia" className="border-2 border-[#5A4A42] text-[#5A4A42] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#F9F5F1] transition-all">
                    Olvass tovább
                </Link>
            </div>
          </motion.div>

          {/* Kép */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-700">
                {/* TIPP: Ide érdemes egy álló tájolású, jó minőségű képet tenni */}
                <Image
                src="/images/profilkep.jpg" 
                alt="Kovács Bálint, fotós"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
                />
            </div>
            {/* Háttér keret dekoráció */}
            <div className="absolute inset-0 border-2 border-[#C79C8D] rounded-[3rem] transform -translate-x-4 translate-y-4 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 2. ÉRTÉKEK SÁV (Ikonok) */}
      <section className="bg-[#5A4A42] py-12 text-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {values.map((val, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center gap-3"
                  >
                      <div className="text-[#C79C8D] bg-white/10 p-4 rounded-full mb-2">
                          {val.icon}
                      </div>
                      <h3 className="text-xl font-bold font-akaya">{val.title}</h3>
                      <p className="text-white/70">{val.text}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* 3. A FILOZÓFIÁM SZEKCIÓ */}
      <section id="filozofia" className="py-20 sm:py-28 bg-[#F9F5F1]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-[#5A4A42] font-akaya">
              Emlékek, nem csak képek
            </h2>
            <div className="text-lg text-gray-700 space-y-6 leading-relaxed text-justify md:text-center">
                <p>
                Hiszem, hogy a legjobb fotók akkor születnek, amikor felszabadult a hangulat és valódi a kapcsolódás. 
                Nem hiszek a merev, beállított pózokban, amikben feszengve érzed magad. Ehelyett arra törekszem, 
                hogy egy olyan közeget teremtsek, ahol <strong>önmagad lehetsz</strong>.
                </p>
                <p>
                Legyen szó egy meghitt esküvőről, egy játékos családi délutánról vagy egy önbizalmat adó portrésorozatról, 
                a célom, hogy a képeken keresztül ne csak a látványt, hanem az <strong>érzéseket is visszakapd</strong>. 
                Olyan emlékeket készítek, amiket évek múltán is öröm lesz újra és újra elővenni, és amik mesélnek rólatok.
                </p>
            </div>
            
            <div className="mt-12">
                <Image 
                    src="/images/signature.png" // Ha van aláírás képed, ide teheted (opcionális)
                    alt=""
                    width={150}
                    height={80}
                    className="mx-auto opacity-60 hidden" // Most rejtve van, de bekapcsolhatod
                />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SZOLGÁLTATÁSOK NAVIGÁCIÓ */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-[#5A4A42] font-akaya">Miben segíthetek?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Válaszd ki a számodra leginkább megfelelő kategóriát.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-white rounded-3xl p-8 flex flex-col items-start border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Ikon háttér díszítés */}
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-125 duration-500 text-[#5A4A42]">
                    {service.icon}
                </div>

                <div className="bg-[#F9F5F1] p-3 rounded-2xl mb-6 group-hover:bg-[#E6D4CD] group-hover:text-white transition-colors">
                    {service.icon}
                </div>

                <h3 className="text-xl font-bold text-[#5A4A42] mb-3 font-akaya">{service.title}</h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed flex-grow">{service.desc}</p>
                
                <Link href={service.link} className="flex items-center font-bold text-[#C79C8D] group-hover:text-[#5A4A42] transition-colors gap-2 text-sm uppercase tracking-wide">
                    Részletek <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ZÁRÓ CTA */}
      <section className="py-24 bg-[#5A4A42] text-white text-center px-6">
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-akaya text-white">
                    Készen állsz a közös munkára?
                </h2>
                <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                    Ha egyedi, személyre szabott fotózást szeretnél, ami valóban Rólad szól, 
                    ne habozz! Beszéljük meg az ötleteidet egy kötetlen beszélgetés keretében.
                </p>
                <Link href="/contact" className="inline-block bg-[#C79C8D] text-white font-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-[#5A4A42] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    Időpontot kérek
                </Link>
            </motion.div>
      </section>

    </div>
  );
}