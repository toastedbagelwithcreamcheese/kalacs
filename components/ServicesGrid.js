"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Camera, MapPin } from "lucide-react";

// Adatok bővített tartalommal (Címkék, időtartam, infók)
const services = [
  {
    id: "portre",
    title: "Portré Fotózás",
    description: "Mutasd meg az igazi arcod. Legyen szó üzleti megjelenésről vagy kreatív önkifejezésről.",
    tags: ["Stúdió / Szabadtér", "Retusált képek"],
    image: "/images/_MG_0315-2.webp", 
    link: "/portre",
    // Nagy álló kártya bal oldalt
    gridClass: "col-span-1 md:col-span-4 lg:col-span-3 row-span-1 md:row-span-2",
  },
  {
    id: "csalad",
    title: "Családi Pillanatok",
    description: "A nevetés és az ölelések emléke örök. Spontán, őszinte pillanatok a szeretteiddel.",
    tags: ["1-2 óra", "Gyerekbarát"],
    image: "/images/_MG_4795.webp",
    link: "/family-sessions",
    // Széles fekvő kártya felül
    gridClass: "col-span-1 md:col-span-8 lg:col-span-5 row-span-1",
  },
  {
    id: "kismama",
    title: "Kismama",
    description: "A várakozás csodája.",
    tags: ["Kismama ruhák", "Meghitt"],
    image: "/images/kata_kismama/_47A9158-2.jpg",
    link: "/kismama",
    // Közepes kártya
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
  },
  {
    id: "autok",
    title: "Autó Fotózás",
    description: "Prémium járművek, művészi szögek.",
    tags: ["Rolling shot", "Részletfotók"],
    image: "/images/_MG_7633.webp",
    link: "/autok",
    // Szélesebb kártya alul középen
    gridClass: "col-span-1 md:col-span-6 lg:col-span-5 row-span-1",
  },
  {
    id: "kutyus",
    title: "Kutyusok",
    description: "A legjobb barátod.",
    tags: ["Játékos", "Türelem-garancia"],
    image: "/images/_MG_5347.webp",
    link: "/kutyusok",
    // Kisebb kártya a jobb szélen vagy alul
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",
  },
];

export default function ServicesGrid() {
  return (
    <section className="pt-10 px-4 md:px-8 max-w-[1600px] mx-auto bg-white">
      
      {/* Fejléc: Balra igazítva, modernebb hatásért */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4 font-akaya text-[#5A4A42]"
          >
            Szolgáltatásaim
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed"
          >
            Válaszd ki a hozzád illő kategóriát. Minden fotózás egyedi történet, 
            ahol a főszereplő Te vagy.
          </motion.p>
        </div>
        
        {/* Dekoratív gomb vagy statisztika (Space filler) */}
        <div className="hidden md:block">
           <Link href="/contact" className="group flex items-center gap-2 text-[#C79C8D] font-bold uppercase tracking-widest hover:text-[#a87b6d] transition-colors">
             Időpontfoglalás <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
           </Link>
        </div>
      </div>

      {/* Rácsrendszer: 12 oszlopos grid a maximális kitöltésért */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[380px] gap-4 md:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative group overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${service.gridClass}`}
          >
            <Link href={service.link} className="block w-full h-full relative z-0">
              
              {/* Kép */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={index < 2}
              />
              
              {/* Sötét Overlay - erősebb, hogy a szöveg mindig olvasható legyen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
              
              {/* Tartalom Konténer */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start text-white">
                
                {/* Címkék (Tags) - Felül lebegnek mobilon, vagy alul a cím felett */}
                <div className="mb-3 flex flex-wrap gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-4 md:group-hover:translate-y-0">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Fő Cím és Leírás */}
                <div className="w-full transform transition-transform duration-300 md:translate-y-2 md:group-hover:-translate-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold font-akaya tracking-wide mb-2 drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base font-medium line-clamp-2 max-w-[90%] opacity-90">
                    {service.description}
                  </p>
                </div>

                {/* Abszolút pozícionált nyíl a jobb sarokban */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/20 hover:bg-[#C79C8D] backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110">
                  <ArrowUpRight className="text-white w-6 h-6" />
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
        
        {/* Opcionális: "Még több" kártya, ha maradna üres hely, vagy CTA */}
        <div className="col-span-1 md:col-span-12 row-span-1 h-[150px] md:h-[190px] bg-[#F9F5F1] rounded-3xl p-6 flex flex-col justify-center items-center text-center border-2 border-dashed border-[#C79C8D]/30 hover:border-[#C79C8D] transition-colors group">
            <h3 className="text-xl font-bold text-[#5A4A42] mb-2">Nem találod?</h3>
            <p className="text-sm text-gray-500 mb-4">Egyedi elképzelésed van?</p>
            <Link href="/contact" className="bg-[#C79C8D] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md group-hover:bg-[#b3897b] transition-colors">
                Írj nekem!
            </Link>
        </div>

      </div>
    </section>
  );
}