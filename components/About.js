"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Camera, Layers3, Zap, Video, ArrowRight } from "lucide-react";

export default function AboutPageModern() {

  // --- FELSZERELÉS ADATOK ---
  const gear = [
    {
      icon: <Camera size={36} className="text-[#C79984]" />,
      category: "Fényképezőgép váz",
      items: ["Canon EOS 6D", "Canon EOS 90D"]
    },
    {
      icon: <Layers3 size={36} className="text-[#C79984]" />,
      category: "Objektívek",
      items: ["Canon EF 24-105mm f/4 L", "Sigma EF 100-300mm f/4 EX APO DG", "Sigma EF 85mm f/1.4 EX DG HSM", "Canon EF 50mm f/1.8 II"]
    },
    {
      icon: <Zap size={36} className="text-[#C79984]" />,
      category: "Világítástechnika",
      items: ["Stúdió softboxok", "Professzionális vakuk"]
    },
    {
      icon: <Video size={36} className="text-[#C79C8D]" />,
      category: "Videó és Stabilizálás",
      items: ["DJI Osmo Mobile 7 gimbal"]
    }
  ];

  // --- SZOLGÁLTATÁSOK ADATAI ---
  const services = [
    { title: "Portré", desc: "Egyedi portrék, meghitt családi pillanatok.", link: "/portre" },
    { title: "Családi Fotózás", desc: "A nagy nap legszebb emlékei, örökre megörökítve.", link: "/family-sessions" },
    { title: "Autófotózás & videózás", desc: "Lenyűgöző képek, amelyek eladnak.", link: "/autok" },
    { title: "Kismama fotózás", desc: "Mozgóképes történetek, hangulatos klipek.", link: "/kismama" }
  ];


  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* HERO SZEKCIÓ */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Kovács Bálint
              <span className="block text-2xl sm:text-3xl text-[#C79984] font-medium mt-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
                Élményeket alkotunk, együtt.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Üdvözöllek! Zalaegerszegi fotósként a szenvedélyem, hogy valódi érzelmeket és megismételhetetlen pillanatokat örökítsek meg. Számomra minden fotózás egy közös kaland, ahol a cél, hogy olyan képek szülessenek, amik rólad mesélnek.
            </p>
            <Link href="/contact" legacyBehavior>
              <a className="inline-block mt-8 bg-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Vegyük fel a kapcsolatot!
              </a>
            </Link>
          </motion.div>
          <motion.div 
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/images/zsirii-2212.jpg" // CSERÉLD LE A SAJÁT PORTRÉDRA!
              alt="Kovács Bálint, fotós"
              width={500}
              height={500}
              className="rounded-full shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* A FILOZÓFIÁM SZEKCIÓ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
              A filozófiám: Emlékek, nem csak képek
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Hiszem, hogy a legjobb fotók akkor születnek, amikor felszabadult a hangulat és valódi a kapcsolódás. Nem hiszek a merev, beállított pózokban. Ehelyett arra törekszem, hogy egy olyan közeget teremtsek, ahol önmagad lehetsz.
            </p>
            <p className="text-lg text-gray-600">
              Legyen szó egy meghitt esküvőről, egy játékos családi délutánról vagy egy önbizalmat adó portrésorozatról, a célom, hogy a képeken keresztül ne csak a látványt, hanem az érzéseket is visszakapd. Olyan emlékeket készítek, amiket évek múltán is öröm lesz újra és újra elővenni.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FELSZERELÉS SZEKCIÓ */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Eszközök a Tökéletes Emlékekért</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">A kreatív látásmód mellett a megbízható technika is elengedhetetlen. Kizárólag professzionális felszereléssel dolgozom, hogy garantáljam a kompromisszumok nélküli minőséget.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {gear.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map(item => (
                    <li key={item} className="text-gray-300 text-sm sm:text-base">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SZOLGÁLTATÁSOK SZEKCIÓ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Szolgáltatások – Hogyan segíthetek?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Válaszd ki a számodra leginkább megfelelő szolgáltatást, vagy keress egyedi elképzeléseiddel!</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                <Link href={service.link} legacyBehavior>
                  <a className="mt-auto flex items-center font-semibold text-[#C79C8D] hover:text-[#a87661] transition-colors group">
                    Részletek <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZÁRÓ CTA */}
      <section className="py-20 sm:py-28 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Készen állsz, hogy együtt alkossunk?</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">Ha egyedi, személyre szabott fotózást szeretnél, ami valóban Rólad szól, vedd fel velem a kapcsolatot. Beszéljük meg az ötleteidet, és hozzuk létre együtt a tökéletes képeket!</p>
                <Link href="/contact" legacyBehavior>
                    <a className="inline-block bg-gray-900 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        Írj nekem üzenetet!
                    </a>
                </Link>
            </motion.div>
        </div>
      </section>

    </div>
  );
}