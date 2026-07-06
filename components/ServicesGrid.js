"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera } from "lucide-react";
import { SERVICES_DATA } from "@/constants/services";
import TiltCard from "@/components/TiltCard";

// VIZUÁLIS ELRENDEZÉS (Bento Grid)
// Itt adjuk meg keménykódolva az osztályokat, hogy a Tailwind biztosan lefordítsa őket!
const bentoLayouts = {
  "eskuvo": "col-span-1 md:col-span-12 lg:col-span-8 row-span-1 md:row-span-2", // Hatalmas fő kártya
  "portre": "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",               // Mellette felül
  "kismama": "col-span-1 md:col-span-6 lg:col-span-4 row-span-1",              // Mellette alul
  "family-sessions": "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",      // Alsó sor 1/3
  "autok": "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",                // Alsó sor 2/3
  "kutyusok": "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",             // Alsó sor 3/3
};

export default function ServicesGrid() {
  const servicesArray = Object.values(SERVICES_DATA);

  return (
    <section className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto bg-white">
      
      {/* Fejléc */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C79C8D] mb-4"
          >
            <Camera size={18} /> Portfólió
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
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
            Minden fotózás egyedi történet. Válaszd ki azt a kategóriát, amelyik a legközelebb áll hozzád, és alkossunk valami maradandót.
          </motion.p>
        </div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="hidden md:block pb-2"
        >
           <Link href="/contact" className="group flex items-center gap-2 text-[#5A4A42] font-bold uppercase tracking-widest hover:text-[#C79C8D] transition-colors border-b-2 border-transparent hover:border-[#C79C8D] pb-1">
             Időpontfoglalás <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
           </Link>
        </motion.div>
      </div>

      {/* Rácsrendszer (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[350px] md:auto-rows-[400px] gap-4 md:gap-6">
        {servicesArray.map((service, index) => {
          // Ha véletlenül nincs megadva layout, kap egy alapértelmezettet
          const gridClass = bentoLayouts[service.slug] || "col-span-1 md:col-span-4 row-span-1";

          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`overflow-hidden rounded-[2.5rem] shadow-md hover:shadow-2xl transition-shadow duration-500 ${gridClass}`}
              style={{ perspective: 1000 }}
            >
              <TiltCard tiltStrength={4} className="w-full h-full">
                <Link href={`/szolgaltatasok/${service.slug}`} className="block w-full h-full relative z-0 cursor-pointer">

                  {/* Kép */}
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0} // Az első (esküvő) kap prioritást
                  />

                  {/* Sötétítő réteg a tökéletes olvashatóságért */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#261F1D]/90 via-[#261F1D]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Tartalom */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end items-start text-white">

                    {/* Címkék */}
                    <div className="mb-4 flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {service.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Szövegek */}
                    <div className="w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-3xl md:text-5xl font-bold font-akaya tracking-wide mb-2 drop-shadow-md">
                        {service.title}
                      </h3>
                      <p className="text-gray-200 text-sm md:text-base font-medium line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {service.heroSubtitle}
                      </p>
                    </div>

                    {/* Nyíl ikon */}
                    <div className="absolute top-8 right-8 bg-white text-[#5A4A42] hover:bg-[#C79C8D] hover:text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 shadow-lg">
                      <ArrowUpRight strokeWidth={2.5} size={24} />
                    </div>

                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}