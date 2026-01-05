"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Camera, Car, Dog, Baby, Home } from "lucide-react";

// --- Kiemelt Szolgáltatások Adatbázisa (FRISSÍTVE) ---
const featuredServices = [
  {
    icon: <Users size={28} className="text-amber-600" />,
    title: "Családok",
    description: "Játékos, élettel teli pillanatok, amik örökre szólnak.",
    link: "/family-sessions", 
  },
  {
    icon: <Heart size={28} className="text-amber-600" />,
    title: "Párok & Jegyesek",
    description: "A közös történetetek legszebb fejezetei, őszintén.",
    link: "/paros_jegyes",
  },
  {
    icon: <Baby size={28} className="text-amber-600" />,
    title: "Kismamák",
    description: "A várandósság varázsa finom, meghitt fotókon.",
    link: "/kismama",
  },
  {
    icon: <Camera size={28} className="text-amber-600" />,
    title: "Portrék",
    description: "Egyedi portrék, amik valóban téged tükröznek.",
    link: "/portre",
  },
  {
    icon: <Car size={28} className="text-amber-600" />,
    title: "Autók",
    description: "Lenyűgöző formák és dinamikus részletek, profi tálalásban.",
    link: "/autok",
  },
  {
    icon: <Dog size={28} className="text-amber-600" />,
    title: "Kutyusok",
    description: "A négylábú családtagok legmókásabb pillanatai.",
    link: "/kutyusok",
  },
];


export default function AboutSectionModernized() {
  return (
    <section className="bg-stone-50 py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">


          {/* JOBB OLDAL: SZÖVEG */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
              Szia, Bálint vagyok!
              <span className="block text-2xl text-amber-600 font-medium mt-1">
                A te történeted, az én lencsémen keresztül.
              </span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl">
              Zalaegerszegi fotósként a célom, hogy elkapjam azokat az őszinte, megismételhetetlen pillanatokat, amik valóban titeket tükröznek. Legyen szó családi összejövetelről, a nagy napról, vagy akár egy ingatlan bemutatásáról, minden megbízásban a maximumra törekszem. Engedd, hogy segítsek maradandó emléket alkotni!
            </p>
          </motion.div>
        </div>

        {/* SZOLGÁLTATÁSOK GALÉRIA (FRISSÍTVE) */}
        <motion.div 
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Miben segíthetek?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {featuredServices.map((service, index) => (
                    <Link key={index} href={service.link} legacyBehavior>
                        <a className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/80 text-center group">
                            <div className="mb-3 text-amber-600">
                                {service.icon}
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base">{service.title}</h4>
                            <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">{service.description}</p>
                        </a>
                    </Link>
                ))}
            </div>
             <div className="text-center mt-12">
              <Link href="/about" legacyBehavior>
                <a className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-700 transition-colors group">
                  Tudj meg többet rólam és a munkáimról 
                  <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </div>
        </motion.div>
      </div>
    </section>
  );
}