"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import CarPhotography from "@/components/CarPhotography";
import KismamaSection from "@/components/KismamaSection.js";
import PortreSection from "@/components/PortreSection";
import ParosSection from "@/components/ParosSection";
import Link from "next/link";
import KutyusSection from "@/components/KutyusSection";

const slides = [
  {
    image: "/images/_MG_4462.webp",
    text: "Stílusos portrék, amelyek megmutatják egyéniséged.",
    buttonText: "Részletek",
    link: "/portre",
  },
  {
    image: "/images/_MG_4693.webp",
    text: "Természetes fények és tökéletes pillanatok.",
    buttonText: "Részletek",
    link: "/kismama",
  },
  {
    image: "/images/_MG_4795.webp",
    text: "Tökéletes páros képek.",
    buttonText: "Részletek",
    link: "/paros_jegyes",
  },
  {
    image: "/images/audi_tel-1198.webp",
    text: "Autós fotózás prémium minőségben.",
    buttonText: "Részletek",
    link: "/autok",
  },
  {
    image: "/images/_MG_5347.webp",
    text: "Képek rólad, és kiskedvencedről.",
    buttonText: "Részletek",
    link: "/kutyusok",
  },
];

export default function PortfolioHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute",
      transition: {
        x: { type: "spring", stiffness: 60, damping: 20 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute",
      transition: {
        x: { type: "spring", stiffness: 60, damping: 20 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#C79984]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Háttér blur minden nézetben */}
            <img
              src={slides[currentIndex].image}
              alt="blurred bg"
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 z-0"
            />

            {/* ----- Mobilos verzió (háttérkép + szöveg) ----- */}
            <div
              className="sm:hidden absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <motion.div
                key={currentIndex + "-text-mobile"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="w-full max-w-xs"
              >
                <p className="text-white text-lg font-semibold drop-shadow-md mb-3">
                  {slides[currentIndex].text}
                </p>
                <Link
                  href={slides[currentIndex].link}
                  className="inline-block border-2 border-[#C79984] bg-[#C79984] bg-opacity-50 text-white px-5 py-2 rounded-md font-semibold
                       hover:bg-opacity-75 hover:border-[#C79984] hover:scale-105
                       transition-all duration-300 transform"
                >
                  {slides[currentIndex].buttonText}
                </Link>
              </motion.div>
            </div>

            {/* ----- Desktop verzió (éles kép külön) ----- */}
            <div className="hidden sm:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center justify-center text-center px-4">
              {/* Előtér éles kép */}
              <img
                src={slides[currentIndex].image}
                alt={`Slide ${currentIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain mb-0"
              />

              {/* Szöveg + gomb */}
              <motion.div
                key={currentIndex + "-text-desktop"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="w-full max-w-md"
              >
                <p className="text-white text-xl md:text-2xl font-semibold drop-shadow-md mb-1">
                  {slides[currentIndex].text}
                </p>
                <Link
                  href={slides[currentIndex].link}
                  className="inline-block border-2 border-[#C79984] bg-[#C79984] bg-opacity-50 text-white px-5 py-2 rounded-md font-semibold
                       hover:bg-opacity-75 hover:border-[#C79984] hover:scale-105
                       transition-all duration-300 transform"
                >
                  {slides[currentIndex].buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔹 ABOUT SECTION */}
      <AboutSection />
      <CarPhotography
        title="Autó fotózás"
        description="Az autófotózás világában minden pillanat különleges, a járművünket nemcsak gépként látjuk, hanem egy részét az életünknek, amely történeteinket és útjainkat követi. Minőségi fényképekkel örökítem meg azt a speciális kapcsolatot, amelyet az autódhoz építettél fel. A finom részletek, a hangulatos színek és az elkaptatott szögek segítségével biztosítom, hogy az autód legjobb oldalait láthatóságra hozzuk, mintegy új életet szúrva neki a képen.
              Célom, hogy minden kép egyedi és személyre szabott legyen, mert az autód több, mint csak egy jármű – egy része vagyok belőle. Ezek a fényképek nemcsak anyagi értéket képviselnek, hanem érzéseket is tartogatnak, amelyek mindig emlékeztetnek arra, miért szereted és értékeszed azt. Az általam készített autófényképek segítenek abban, hogy az eddigi utazásaidat, a memóriáidat és a boldogság pillanatait megőrizzük, miközben újabb történeteket írunk az útjain."
        images={[
          {
            src: "/images/audi_tel-1198.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6506.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6310.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6330_2.webp",
            title: "",
            alt: "",
          },
        ]}
        extraImages={[

          {
            src: "/images/_MG_6305-Enhanced-NR.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/audi_tel--5.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6508.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6519.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_6531.webp",
            title: "",
            alt: "",
          },
        ]}
      />
      <KismamaSection
        title="Kismama fotózás"
        description="A várandósság egy varázslatos időszak, tele izgalommal és új élményekkel. Kismama fotózásaim célja, hogy meghitt, természetes környezetben örökítsük meg ezt a különleges pillanatot. Fontos számomra, hogy felszabadultan érezd magad, hiszen így születnek a legőszintébb és legszebb emlékek. A letisztult, harmonikus képek évekkel később is felidézik a várandósság szépségét és a bennetek formálódó erős köteléket."
        images={[
          {
            src: "/images/_MG_4693.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4731.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4764.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4795.webp",
            title: "",
            alt: "",
          },
        ]}
        extraImages={[
          {
            src: "/images/_MG_4931.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_4971.webp",
            alt: "",
            title: "",
          },
        ]}
      />
      <PortreSection
        title="Portré fotózás"
        description="A portréfotózás célja, hogy kiemelje a legjobb éned. Legyen szó üzleti, kreatív vagy emlékezetes portréról, segítek, hogy a képek hűen tükrözzék személyiséged és stílusod. Profi szemlélettel és kellemes légkörben alkotunk meg egy fotót, ami igazán téged reprezentál."
        images={[
          {
            src: "/images/bigycv-1.jpg",
            title: "",
            alt: "",
          },
          {
            src: "/images/BogyoCv2FF-1-2.jpg",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4270festettV5.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4462.webp",
            title: "",
            alt: "",
          },
        ]}
        extraImages={[
          {
            src: "/images/Evoto-(3 of 3).webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_4619.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_4523.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_4521.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_4486.webp",
            alt: "",
            title: "",
          },
        ]}
      />
      <ParosSection
        title="Páros/jegyes fotózás"
        description="Hiszem, hogy minden szerelem egyedi és megismételhetetlen történet. A páros vagy jegyes fotózás tökéletes alkalom arra, hogy megálljunk egy pillanatra a rohanó hétköznapokban, és csak egymásra figyelve megörökítsük azt a különleges köteléket, ami összeköt Titeket. Egy felszabadult, vidám hangulatú fotózás, ahol nincsenek erőltetett pózok, csak Ti ketten és az őszinte érzelmeitek. Legyen szó egy romantikus sétáról a kedvenc helyeteken, egy meghitt összebújásról a naplementében, vagy egy közös nevetésről – a célom, hogy olyan képek szülessenek, amelyek valóban Rólatok mesélnek. Ez a fotózás remek lehetőség az eljegyzés megünneplésére, évfordulós ajándékként, vagy csak úgy, mert minden nap egy jó alkalom arra, hogy megörökítsük a szerelmeteket. Együtt megtaláljuk a Hozzátok leginkább illő helyszínt és stílust, hogy a végeredmény igazán személyes és időtálló legyen. Engedjétek meg, hogy megörökítsem a történetetek egyik legszebb fejezetét!"
        images={[
          {
            src: "/images/_MG_4795.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4931.jpg",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4971.jpg",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4986.jpg",
            title: "",
            alt: "",
          },
        ]}
        extraImages={[
          {
            src: "/images/_MG_4805.jpg",
            alt: "",
            title: "",
          },
        ]}
      />
      <KutyusSection
        title="Kutyus fotózás"
        description="A kutyafotózás célja, hogy megmutassa, milyen különleges a kutyád – úgy, ahogy ő igazán. Legyen szó játékos, bújós vagy komoly pillanatokról, a fotókon visszaköszön a személyisége. A szabadban, kellemes hangulatban fotózunk, hogy minden kép őszinte és természetes legyen – pont olyan, amilyen ő maga is."
        images={[
          {
            src: "/images/_MG_5347.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/59957F6B-2DAA-4D9D-AB69-3B47B1F7216F_1_105_c.jpeg",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_5324.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_5351.webp",
            title: "",
            alt: "",
          },
        ]}
        extraImages={[
          {
            src: "/images/_MG_5375.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_5415.webp",
            alt: "",
            title: "",
          },
        ]}
      />
    </div>
  );
}
