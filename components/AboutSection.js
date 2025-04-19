"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-100 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        {/* Kép - kör alakú, nagyobb */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg">
          <img
            src="/images/zsirii-2212.jpg" // Cseréld ki a saját képedre
            alt="Dobó Imre fotós"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Szöveg rész */}
        <div className="max-w-lg text-center md:text-left">
          {/* Cím és alcím */}
          <h2 className="text-4xl font-bold text-[#9A9A9A] mb-2">
            Kovács Bálint fotós Zalaegerszeg
          </h2>
          <p className="text-xl font-bold text-[#9A9A9A] mb-6">
            Rólam a lencse túloldalán
          </p>

          {/* Kiemelt szöveg */}
          <p className="text-lg font-bold text-[#646C5E] mb-4">
            Éld át újra a legszebb pillanatokat!
          </p>

          {/* Üdvözlő szöveg */}
          <p className="text-base text-[#646C5E] mb-6">
            Örömmel köszöntelek a <strong>balintfoto.hu</strong> oldalán! A
            célom, hogy minden fotózási igényedet a lehető legmagasabb szinten,
            mégis barátságos és közvetlen légkörben valósítsam meg. Legyen szó
            esküvőkről, családi eseményekről vagy épp üzleti projektről, minden
            alkalommal arra törekszem, hogy a képek ne csak jól sikerüljenek, de
            igazán tükrözzék is a személyiségedet és a hangulatot.
          </p>
        </div>
      </motion.div>

      {/* Szolgáltatások szekciója */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Kis késleltetés az animációhoz
        className="container mx-auto px-6 mt-16"
      >
        <div className="max-w-5xl mx-auto">
          {/* Cím balra igazítva */}
          <h3
            className="text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Szolgáltatásaim – minden, ami fotózás!
          </h3>

          <ul
            className="list-disc list-inside space-y-1 text-[#646C5E] text-base font-serif"
            style={{ fontFamily: "Noto Serif, sans-serif" }}
          >
            <li>
              <strong>Esküvői és jegyesfotózás:</strong> Örökítsük meg a Nagy
              Napod legmeghittebb és legvidámabb pillanatait.
            </li>
            <li>
              <strong>Családi fotózás (gyerek- és kismama fotózás):</strong>{" "}
              Vidám, szívből jövő képek, melyeket öröm lesz évekkel később is
              elővenni.
            </li>
            <li>
              <strong>Rendezvényfotózás:</strong> Legyen az céges konferencia,
              workshop, családi ünnep vagy koncert, minden fontos momentumot
              megörökítek.
            </li>
            <li>
              <strong>Üzleti–céges fotózás:</strong> Profi portrék, csapatképek
              és image fotók a vállalkozásodhoz, hogy hiteles és vonzó online
              megjelenésed legyen.
            </li>
            <li>
              <strong>Termék– és reklámfotózás:</strong> Ha olyan képekre
              vágysz, amelyek kiemelik a termékeid minőségét és segítenek a
              marketingben.
            </li>
            <li>
              <strong>Ingatlanfotózás:</strong> Stílusos, profi képek
              lakásokról, házakról vagy irodákról, amelyekkel igazán
              felkeltheted az érdeklődők figyelmét.
            </li>
            <li>
              <strong>Óvodai és iskolai fotózás:</strong> Kedves, játékos vagy
              épp komolyabb tabló- és csoportképek, hogy az óvodai és iskolai
              évekre örökre szép emlékek maradjanak.
            </li>
            <li>
              <strong>Tablófotózás:</strong> Tökéletes megoldás végzős
              osztályoknak, akik szeretnének egy stílusos, mégis a
              személyiségüket tükröző tablót a ballagásra.
            </li>
            <li>
              <strong>Selfiebox szolgáltatás:</strong> Hozz egy csipet extra
              szórakozást az esküvődre, születésnapi bulidra vagy céges
              rendezvényedre! A selfiebox garantáltan feldobja a hangulatot, és
              fergeteges emlékeket ad a vendégeknek.
            </li>
          </ul>
        </div>
      </motion.div>
      {/*Hogyan dolgozom*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Kis késleltetés az animációhoz
        className="container mx-auto px-6 mt-5"
      >
        <div className="max-w-5xl mx-auto">
          {/* Cím balra igazítva */}
          <h3
            className="text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Hogyan dolgozom?
          </h3>
          <p className="text-base text-[#646C5E] mb-6">
            Az első beszélgetéstől a képek átadásáig a rugalmasság és a
            közvetlenség jellemez. Mindig meghallgatom az elképzeléseidet, és
            igyekszem a fotózás során is biztosítani azt a felszabadult
            környezetet, amelyben a legjobb, legőszintébb pillanatok születnek.
            A fotók utómunkájára is nagy hangsúlyt fektetek, hogy a végeredmény
            a lehető leginkább tükrözze a valódi élményt – ugyanakkor
            esztétikus, stílusos és minőségi legyen.
          </p>
        </div>
      </motion.div>
      {/*Vedd fel velem a kapcsolatot*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="container mx-auto px-6 mt-5"
      >
        <div className="max-w-5xl mx-auto">
          {/* Cím balra igazítva */}
          <h3
            className="text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Vedd fel velem a kapcsolatot!
          </h3>
          <p
            className="text-base text-[#646C5E] mb-6"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Ha felkeltettem az érdeklődésed, és szeretnéd megtudni, hogyan
            tudunk együtt dolgozni a Te elképzeléseiden, keress bátran! Akár
            Debrecenben, Hajdúszoboszlón, Nyíregyházán, Miskolcon, Egerben,
            Tiszafüreden, Hajdúböszörmény, Balmazújvárosban, Hajdúnánáson,
            Hajdúdorogon vagy Tiszaújvárosban, akár az ország más pontján (vagy
            határon túl) keresel esküvői fotóst, jegyesfotóst, rendezvényfotóst
            vagy portréfotóst, én örömmel útra kelek, hogy elkészítsem a
            legszebb képeket számodra! Várom a hívásod vagy{" "}
            <Link href="/contact">
              <span className="font-bold text-[#C79C8D] hover:underline cursor-pointer">
                üzeneted
              </span>
            </Link>
            , hogy egy személyre szabott ajánlattal segítsem megvalósítani a
            terveidet!
          </p>

          {/* H2 és gomb elrendezés */}
          <div className="flex flex-col gap-4">
            <h2
              className="text-lg font-bold text-[#646C5E]"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
              Kovács Bálint fotós Zalaegerszeg a pillanatok hiteles
              megörökítéséért, barátságos és professzionális hozzáállással.
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center px-4 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105 max-w-[210px]"
            >
              Tudj meg többet rólam
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
