"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import CarPhotography from "@/components/CarPhotography";
import KismamaSection from "@/components/KismamaSection.js";
import PortreSection from "@/components/PortreSection";
import ParosSection from "@/components/ParosSection";
import KutyusSection from "@/components/KutyusSection";
import FamilySection from "@/components/FamilySection";
import Velemenyek from "@/components/HomePageReviews";

// --- SLIDE ADATOK (FRISSÍTVE DESKTOP KÉPEKKEL) ---
// !!! FIGYELEM: AZ ALÁBBI MÉRETEK CSAK PLACEHOLDEREK! CSERÉLD ŐKET A VALÓS KÉPEID MÉRETEIRE!
const slides = [
  {
    image: "/images/_MG_4462.webp",         // Mobil kép
    width: 1200, height: 800,              // Mobil kép méretei
    desktopImage: "/images/PortreKollazs.png", // Desktop kép
    desktopWidth: 1920, desktopHeight: 1080, // Desktop kép méretei
    title: "Portrék",
    text: "Stílusos portrék, amelyek megmutatják egyéniséged.",
    buttonText: "Részletek",
    link: "/portre",
  },
  {
    image: "/images/_MG_4693.webp",
    width: 1200, height: 800,
    desktopImage: "/images/KismamaKollazs.png",
    desktopWidth: 1920, desktopHeight: 1080,
    title: "Kismama",
    text: "A várandósság varázsa finom, meghitt pillanatokban.",
    buttonText: "Részletek",
    link: "/kismama",
  },
  {
    image: "/images/audi_tel-1198.webp",
    width: 1600, height: 900,
    desktopImage: "/images/AutoKollazs.png",
    desktopWidth: 1920, desktopHeight: 1080,
    title: "Autó Fotózás",
    text: "Lenyűgöző formák és dinamikus részletek, prémium minőségben.",
    buttonText: "Részletek",
    link: "/autok",
  },
  {
    image: "/images/_MG_5347.webp",
    width: 1200, height: 800,
    desktopImage: "/images/KutyusKollazs.png",
    desktopWidth: 1920, desktopHeight: 1080,
    title: "Kutyus Fotózás",
    text: "Játékos kalandok és felejthetetlen emlékek a négylábú barátodról.",
    buttonText: "Részletek",
    link: "/kutyusok",
  },
  // A Páros/Jegyes dia eltávolítva a kérésnek megfelelően.
];
// --------------------

export default function PortfolioHomeFinal() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Alapértelmezetten desktop, a kliens oldalon frissül
  const timeoutRef = useRef(null);

  const slideDuration = 5000; // 5 másodperc

  // Képernyőméret figyelése
  useEffect(() => {
    const handleResize = () => {
      // A Tailwind 'md' töréspontja (768px) alapján döntünk
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Első ellenőrzés betöltődéskor
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Automatikus lapozás logikája
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isHovered) {
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          ),
        slideDuration
      );
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [index, isHovered]);

  const goToSlide = (slideIndex) => setIndex(slideIndex);
  const nextSlide = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const currentSlide = slides[index];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div 
        className="relative w-full h-screen overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1.05,
              transition: {
                opacity: { duration: 1, ease: "easeInOut" },
                scale: { duration: slideDuration / 1000, ease: "linear" }
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 1,
              transition: { opacity: { duration: 0.8, ease: "easeInOut" }}
            }}
          >
            <Image
              src={isDesktop ? currentSlide.desktopImage : currentSlide.image}
              alt={currentSlide.title}
              layout="fill"
              objectFit="cover"
              quality={90}
              priority={index === 0}
              // A next/image-nek nem kell a width/height, ha `fill` van,
              // de a placeholder generáláshoz és a jó gyakorlathoz fontos, hogy az adatstruktúrában meglegyenek.
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* --- Szöveges Tartalom és Gomb --- */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-widest text-white/80 mb-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
                    {currentSlide.title}
                </h2>
                <p className="text-3xl md:text-5xl font-bold max-w-2xl mb-6" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
                    {currentSlide.text}
                </p>
                <Link href={currentSlide.link} legacyBehavior>
                    <a className="inline-block bg-[#C79C8D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#b3897b] transition duration-300 transform hover:scale-105 shadow-lg">
                    {currentSlide.buttonText}
                    </a>
                </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Navigációs Nyilak --- */}
        <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm" aria-label="Előző dia">
            <ArrowLeft className="text-white"/>
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm" aria-label="Következő dia">
            <ArrowRight className="text-white"/>
        </button>

        {/* --- Paginációs Pontok --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="p-1"
              aria-label={`Ugrás a(z) ${slideIndex + 1}. diára`}
            >
              <div className="w-8 h-1 rounded-full overflow-hidden bg-white/20">
                {index === slideIndex && (
                  <motion.div 
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: slideDuration / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 ABOUT SECTION */}
      <AboutSection />
      <Velemenyek />
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
            src: "/images/_MG_4958.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4931.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4731.webp",
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
            src: "/images/_MG_7123.webp",
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
            src: "/images/_MG_8992.webp",
            alt: "",
            title: "",
          },
          {
            src: "/images/_MG_8890.webp",
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
      <FamilySection
        title="Családi fotózás"
        description="Örökítsük meg a jelent, mielőtt emlékké válik! A családi fotózás nálam egy felszabadult élmény, ahol az őszinte pillanatok és a köztetek lévő kötelék a legfontosabb. Olyan képeket készítek, amik a ti egyedi történeteteket mesélik el – zajosan, vidáman és szeretettel telien."
        images={[
          {
            src: "/images/_MG_4795.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_8762.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_8653.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4764.webp",
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
      {/* Páros/Jegyes szekció eltávolítva a kérésnek megfelelően. 
      <ParosSection
        title="Páros, jegyes fotózás"
        description="Hiszem, hogy minden szerelem egyedi és megismételhetetlen történet. A páros vagy jegyes fotózás tökéletes alkalom arra, hogy megálljunk egy pillanatra a rohanó hétköznapokban, és csak egymásra figyelve megörökítsük azt a különleges köteléket, ami összeköt Titeket. Egy felszabadult, vidám hangulatú fotózás, ahol nincsenek erőltetett pózok, csak Ti ketten és az őszinte érzelmeitek. Legyen szó egy romantikus sétáról a kedvenc helyeteken, egy meghitt összebújásról a naplementében, vagy egy közös nevetésről – a célom, hogy olyan képek szülessenek, amelyek valóban Rólatok mesélnek. Ez a fotózás remek lehetőség az eljegyzés megünneplésére, évfordulós ajándékként, vagy csak úgy, mert minden nap egy jó alkalom arra, hogy megörökítsük a szerelmeteket. Együtt megtaláljuk a Hozzátok leginkább illő helyszínt és stílust, hogy a végeredmény igazán személyes és időtálló legyen. Engedjétek meg, hogy megörökítsem a történetetek egyik legszebb fejezetét!"
        images={[
          {
            src: "/images/_MG_4795.webp",
            title: "",
            alt: "",
          },
          {
            src: "/images/_MG_4931.webp",
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
      */}
      </main>
  );
}
