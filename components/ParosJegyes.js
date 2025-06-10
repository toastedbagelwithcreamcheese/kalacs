"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ParosGallery from "@/components/parosjegyesgallery";
import Link from "next/link";
import { ChevronDown, CheckCircle, ArrowRight } from "lucide-react";

// --- CSOMAGOK ÉS GYIK ADATOK (VÁLTOZATLAN TARTALOMMAL) ---
const couplePackages = [
    { title: "Kezdetek Varázsa", price: "19.900 Ft", duration: "kb. 45 perc", features: ["Tökéletes választás egy rövid, hangulatos fotózáshoz", "8 db profi, gondosan retusált digitális fotó", "Minden további retusált kép: 1.990 Ft/db", "1 választott helyszín Zalaegerszegen", "Online, jelszóval védett válogató galéria"], popular: false },
    { title: "Romantikus Kaland", price: "29.900 Ft", duration: "kb. 60-90 perc", features: ["A legnépszerűbb választás jegyes- és páros fotózásra", "20 db profi, művészi retusálású digitális fotó", "Minden további retusált kép: 1.790 Ft/db", "Akár 2 közeli helyszín a változatosabb képekért", "Lehetőség 1-2 átöltözésre", "Online galéria válogatáshoz és letöltéshez"], popular: true },
    { title: "Örökké Ti Prémium", price: "44.900 Ft", duration: "kb. 90-120 perc", features: ["Egy teljeskörű, prémium élményfotózás", "35 db prémium, magazin minőségű retusált digitális fotó", "<strong>✨ 10 db prémium 10x15 cm-es nyomtatott kép elegáns díszdobozban</strong>", "Segítség a tökéletes ruhák és kiegészítők kiválasztásában", "Prémium online galéria, egyszerű megosztási lehetőséggel"], popular: false },
];

const faqData = [
    { question: "Mi a különbség a páros és a jegyesfotózás között?", answer: "A jegyesfotózás kifejezetten az esküvő előtti időszakhoz kötődik, a képeket gyakran használják meghívókhoz, dekorációhoz. Ez egy remek 'főpróba' az esküvői fotózás előtt. A páros fotózás ezzel szemben bármikor, bármilyen apropóból (vagy apropó nélkül) kérhető, hogy megünnepeljétek a szerelmeteket." },
    { question: "Mit viseljünk a fotózáson?", answer: "Válasszatok olyan ruhákat, amikben jól érzitek magatokat és harmonizálnak egymással stílusban és színvilágban. Nem kell egyformának lenni! A földszínek és pasztell árnyalatok mindig jó választások. Általában 1-2 szett bőven elég a változatos képekhez." },
    { question: "Hol legyen a fotózás? Tudsz segíteni helyszínt választani?", answer: "Abszolút! Zalaegerszeg és környéke tele van csodás helyekkel, a Gébárti-tó romantikus stégjeitől kezdve az Azáleás-völgy virágain át a belváros hangulatos utcáiig. Megbeszéljük, milyen stílust szeretnétek, és közösen megtaláljuk a tökéletes helyszínt." },
    { question: "Izgulunk a kamera előtt, mit tegyünk?", answer: "A legtöbb pár izgul egy kicsit, ez teljesen természetes! Az én feladatom, hogy egy laza, baráti hangulatot teremtsek. Sokat fogunk beszélgetni, sétálni, és apró, játékos instrukciókkal segítek, hogy a végeredmény ne mesterkélt, hanem őszinte és természetes legyen." },
];
// --------------------

// HERO SZEKCIÓ KÉPEI A SLIDESHOW-HOZ - CSERÉLD LE SAJÁT KÉPEIDRE!
const heroImages = [
    "/images/_MG_4693.webp",
    "/images/_MG_4795.webp",
    "/images/_MG_4764.webp",
];

export default function ParosJegyesPageUnique() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Hero slideshow effekt
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5 másodpercenként vált képet
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 text-gray-200"> {/* Új, sötét alapszín */}

      {/* HERO SZEKCIÓ - ÚJ, SLIDESHOW DIZÁJN */}
      <section className="relative h-screen flex items-end justify-start text-white overflow-hidden">
        <AnimatePresence>
            <motion.div
                key={currentHeroIndex}
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <Image
                    src={heroImages[currentHeroIndex]}
                    alt={`Szerelmes pár, kép ${currentHeroIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority={currentHeroIndex === 0}
                />
            </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        
        <motion.div
          className="relative z-20 p-8 sm:p-12 md:p-16 max-w-2xl text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
            style={{ fontFamily: "Noto Serif Armenian, sans-serif", textShadow: "1px 1px 10px rgba(0,0,0,0.5)" }}
          >
            A Ti Történetetek.
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-light text-gray-200" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
            Jegyes- és páros fotózás, ami nem a pózokról, hanem a valódi, megismételhetetlen pillanatokról szól.
          </p>
          <Link href="/contact?subject=Paros_Jegyes_Fotozas" legacyBehavior>
            <a className="inline-flex items-center mt-8 bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 transform hover:scale-105 shadow-lg">
              Kezdjük el a tervezést <ArrowRight className="ml-2" size={20}/>
            </a>
          </Link>
        </motion.div>
      </section>

      {/* BEVEZETŐ SZEKCIÓ - ÚJ, ASZIMMETRIKUS ELRENDEZÉS */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
                    Több, mint fotózás. <span className="text-amber-400">Együtt töltött idő.</span>
                </h2>
                <div className="space-y-4 text-lg text-gray-400">
                    <p>Felejtsétek el a feszengést! A célom, hogy egy olyan laza, vidám kalandot teremtsek számotokra, ahol teljesen önmagatok lehettek. Együtt fedezünk fel gyönyörű helyszíneket, sokat nevetünk, és közben én észrevétlenül elkapom azokat a pillanatokat, amik igazán Rólatok szólnak.</p>
                    <p>Legyen szó az esküvő előtti izgalmakról vagy egy meghitt évfordulóról, ezek a képek a ti közös történetetek egy fejezetét fogják elmesélni – őszintén és művészien.</p>
                </div>
            </motion.div>
            <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src="/images/_MG_4764.webp" // CSERÉLD LE EGY JÓ MINŐSÉGŰ KÉPRE
                    alt="Szerelmes pár nevetgél egy fotózáson"
                    width={500}
                    height={600}
                    className="rounded-lg shadow-2xl object-cover"
                />
            </motion.div>
        </div>
      </section>
      
      {/* GALÉRIA KIEMELŐ */}
      <section className="py-20 sm:py-24 bg-slate-800/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Szerelmes Levelek, Képekben</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">Merítsetek ihletet korábbi páros és jegyesfotózásaim hangulatából.</p>
          <div className="mb-10 rounded-lg overflow-hidden">
            <ParosGallery />
          </div>
        </div>
      </section>

      {/* CSOMAGAJÁNLATOK - ÚJ, SÖTÉT DIZÁJN */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Csomagajánlatok</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto mb-16">Találjátok meg a Hozzátok leginkább illő csomagot a közös kalandotok megörökítéséhez.</p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
          {couplePackages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative bg-slate-800 p-8 rounded-lg flex flex-col transition-all duration-300 border border-slate-700 ${pkg.popular ? 'border-amber-400 shadow-2xl shadow-amber-500/10' : 'hover:border-slate-600'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {pkg.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Népszerű</div>}
              
              <h3 className="text-2xl font-semibold text-white mb-3">{pkg.title}</h3>
              <p className="text-4xl font-extrabold text-amber-400 mb-1">{pkg.price}</p>
              <p className="text-sm text-gray-400 mb-6">{pkg.duration}</p>
              
              <ul className="text-gray-300 space-y-3 text-sm sm:text-base mb-8 text-left flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start" dangerouslySetInnerHTML={{ __html: `<svg class="w-4 h-4 mr-3 mt-1 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${feature}</span>` }}></li>
                ))}
              </ul>

              <Link href={`/contact?subject=${encodeURIComponent(pkg.title)}`} legacyBehavior>
                <a className={`w-full inline-block font-semibold py-3 px-6 rounded-lg text-md transition duration-300 transform hover:scale-105 ${pkg.popular ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                  Érdekel
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GYIK - ÚJ, SÖTÉT DIZÁJN */}
      <section className="py-20 sm:py-32 bg-slate-800/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
            Gyakori Kérdések
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700"
                initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true, amount:0.3 }} transition={{ duration:0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left p-5 sm:p-6 font-semibold text-gray-200 hover:bg-slate-700/50 focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-md sm:text-lg">{item.question}</span>
                  <ChevronDown
                    size={24}
                    className={`transform transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : "rotate-0"} text-amber-400`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-5 sm:px-6 pb-5 text-gray-400 text-base"
                    >
                      <div className="border-l-2 border-amber-400 pl-4" dangerouslySetInnerHTML={{ __html: item.answer }}/>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}