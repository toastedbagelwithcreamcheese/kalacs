"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { ChevronRight } from "lucide-react"; // Ezt a komponenst nem használod a kódban, de itt hagyom kikommentelve

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Csak akkor animáljon, ha bekerül a nézetbe
        if (entry.isIntersecting) {
          setIsInView(true);
          // Opcionális: Ha csak egyszer szeretnéd animálni, kapcsold ki a figyelést
          // observer.unobserve(entry.target);
        }
        // Opcionális: Ha azt szeretnéd, hogy eltűnéskor visszaálljon az alaphelyzetbe
        // else {
        //   setIsInView(false);
        // }
      },
      {
        threshold: 0.3, // Kisebb threshold, hogy hamarabb induljon az animáció (pl. 30%)
      }
    );

    const currentRef = sectionRef.current; // Ref érték mentése a cleanup funkcióhoz

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Tisztítás
      }
    };
  }, []); // Az üres függőségi tömb biztosítja, hogy csak mountkor fusson le

  return (
    // Külső padding csökkentése kisebb képernyőkön, növelése nagyobbakon
    <div ref={sectionRef} className="bg-gray-100 py-12 md:py-16 overflow-hidden"> {/* overflow-hidden hozzáadva a vízszintes görgetés elkerülése érdekében */}
      {/* Első szekció: Bemutatkozás */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // Container padding kisebb képernyőkön, és flex irány/rés beállítások
        className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
      >
        {/* Kép: Méretek finomhangolása különböző töréspontokon, középre igazítás mobilon */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-lg flex-shrink-0 mx-auto md:mx-0"> {/* flex-shrink-0 hozzáadva, hogy ne zsugorodjon */}
          <img
            src="/images/zsirii-2212.jpg" // Cseréld ki a saját képedre
            alt="Dobó Imre fotós" // Fontos az alt text! Javasolt a név javítása (Kovács Bálint?)
            className="w-full h-full object-cover"
          />
        </div>

        {/* Szöveg rész: Betűméretek finomhangolása */}
        <div className="max-w-lg text-center md:text-left mt-6 md:mt-0"> {/* Kis margó mobilon a kép és szöveg között */}
          {/* Cím és alcím: Kisebb méret mobilon */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#9A9A9A] mb-2">
            Kovács Bálint fotós Zalaegerszeg
          </h2>
          <p className="text-lg sm:text-xl font-bold text-[#9A9A9A] mb-4 sm:mb-6">
            Rólam a lencse túloldalán
          </p>

          {/* Kiemelt szöveg: Kisebb méret mobilon */}
          <p className="text-base sm:text-lg font-bold text-[#646C5E] mb-3 sm:mb-4">
            Éld át újra a legszebb pillanatokat!
          </p>

          {/* Üdvözlő szöveg: Kisebb méret mobilon */}
          <p className="text-sm sm:text-base text-[#646C5E] mb-6">
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
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        // Padding és felső margó beállítása
        className="container mx-auto px-4 sm:px-6 mt-12 md:mt-16"
      >
        {/* Maximális szélesség beállítása, hogy nagy képernyőn se legyen túl széles */}
        <div className="max-w-5xl mx-auto">
          {/* Cím: Kisebb méret mobilon */}
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }} // Fontos: Ellenőrizd, hogy ezek a betűtípusok be vannak-e töltve globálisan
          >
            Szolgáltatásaim – minden, ami fotózás!
          </h3>

          {/* Lista: Kisebb betűméret és térköz mobilon */}
          <ul
            className="list-disc list-inside space-y-1 sm:space-y-2 text-[#646C5E] text-sm sm:text-base font-serif"
            style={{ fontFamily: "Noto Serif, sans-serif" }} // Ellenőrizd a betűtípus betöltését
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

      {/* Hogyan dolgozom szekció */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // Késleltetés finomhangolása
        className="container mx-auto px-4 sm:px-6 mt-8 md:mt-12" // Margó beállítása
      >
        <div className="max-w-5xl mx-auto">
          {/* Cím: Kisebb méret mobilon */}
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Hogyan dolgozom?
          </h3>
          {/* Szöveg: Kisebb méret mobilon */}
          <p className="text-sm sm:text-base text-[#646C5E] mb-6">
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

      {/* Vedd fel velem a kapcsolatot szekció */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} // Késleltetés finomhangolása
        className="container mx-auto px-4 sm:px-6 mt-8 md:mt-12" // Margó beállítása
      >
        <div className="max-w-5xl mx-auto">
          {/* Cím: Kisebb méret mobilon */}
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#646C5E] mb-4 text-left font-serif"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
          >
            Vedd fel velem a kapcsolatot!
          </h3>
          {/* Szöveg: Kisebb méret mobilon */}
          <p
            className="text-sm sm:text-base text-[#646C5E] mb-6"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif" }} // Itt lehet, hogy a Noto Serif jobb lenne, mint az Armenian? Vagy a normál sans-serif?
          >
            Ha felkeltettem az érdeklődésed, és szeretnéd megtudni, hogyan
            tudunk együtt dolgozni a Te elképzeléseiden, keress bátran! Akár
            Debrecenben, Hajdúszoboszlón, Nyíregyházán, Miskolcon, Egerben,
            Tiszafüreden, Hajdúböszörmény, Balmazújvárosban, Hajdúnánáson,
            Hajdúdorogon vagy Tiszaújvárosban, akár az ország más pontján (vagy
            határon túl) keresel esküvői fotóst, jegyesfotóst, rendezvényfotóst
            vagy portréfotóst, én örömmel útra kelek, hogy elkészítsem a
            legszebb képeket számodra! Várom a hívásod vagy{" "}
            <Link href="/contact" legacyBehavior> {/* legacyBehavior Next.js 13+ esetén javasolt, ha a Link-en belül van egy <a> vagy hasonló tag */}
              <a className="font-bold text-[#C79C8D] hover:underline cursor-pointer">
                üzeneted
              </a>
            </Link>
            , hogy egy személyre szabott ajánlattal segítsem megvalósítani a
            terveidet!
          </p>

          {/* Alsó szekció: Kiemelt szöveg és gomb */}
          {/* Flex container, hogy a szöveg és gomb egymás alatt legyen, de a gomb igazítása változhasson */}
          <div className="flex flex-col items-center md:items-start gap-4 mt-6 md:mt-8"> {/* Középre igazítás mobilon, balra igazítás md-től */}
            {/* Szöveg: Kisebb méret mobilon, igazítás */}
            <h2
              className="text-base sm:text-lg font-bold text-[#646C5E] text-center md:text-left"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }} // Betűtípus ellenőrzése
            >
              Kovács Bálint fotós Zalaegerszeg a pillanatok hiteles
              megörökítéséért, barátságos és professzionális hozzáállással.
            </h2>
            {/* Gomb: Megtartja a max szélességet, de igazodik a containerhez */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-4 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105 max-w-[210px] w-full sm:w-auto" // w-full mobilon, auto nagyobb méreten, justify-center a szöveg középre igazításához
            >
              Tudj meg többet rólam
              {/* Opcionális: Ikon hozzáadása
               <ChevronRight className="ml-2 h-4 w-4" />
               */}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}