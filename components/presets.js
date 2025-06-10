"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, CheckCircle, Download, Palette, Film, X } from 'lucide-react';

// --- Új, JAVÍTOTT Before/After Csúszka Komponens ---
function BeforeAfterSlider({ beforeSrc, afterSrc, width, height, alt }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  };

  const afterImageStyle = {
    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none group"
      style={{ aspectRatio: `${width} / ${height}` }} // A konténer kapja meg a képarányt a `width`/`height` adatokból
    >
      {/* Alsó réteg: "Before" kép */}
      <Image
        src={beforeSrc}
        alt={alt + " (Before)"}
        fill // Az új, javasolt 'fill' prop
        style={{ objectFit: 'cover' }} // Az objectFit a style prop-ba kerül
        // A width és height attribútumokat INNEN TÖRÖLTÜK
      />
      {/* Felső réteg: "After" kép, amit vágunk */}
      <div style={afterImageStyle} className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={alt + " (After)"}
          fill // Az új, javasolt 'fill' prop
          style={{ objectFit: 'cover' }} // Az objectFit a style prop-ba kerül
          // A width és height attribútumokat INNEN TÖRÖLTÜK
        />
      </div>
      {/* A csúszka és a vonal */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full cursor-ew-resize opacity-0 z-10" // Láthatatlan csúszka, de a legfelső rétegen
      />
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white/70 backdrop-blur-sm pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-20" // A vonal a csúszka alatt van
        style={{ left: `calc(${sliderPosition}% - 3px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-5 bg-white rounded-full p-2 shadow-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="5" x2="7" y2="19"></line><polyline points="17 19 7 19 7 9"></polyline><polyline points="7 5 17 5 17 15"></polyline></svg>
        </div>
      </div>
    </div>
  );
}


// --- PRESET CSOMAGOK ADATAI ---
const presetPacks = [
  {
    id: 'pack1',
    name: "Zala Aranyóra Kollekció",
    description: "Meleg, filmszerű tónusok tájképekhez és szabadtéri portrékhoz. Tökéletes naplemente és napfelkelte fotókhoz.",
    tagline: "Meleg, filmszerű tónusok",
    price: "7.990 Ft",
    itemCount: "8 db (Desktop + Mobil)",
    // !!! FONTOS: Ezeket a méreteket használtuk a képarány beállításához. Cseréld a valós méretekre!
    beforeImage: "/images/presets/Screenshot 2025-06-06 at PM 1.42.38.png",
    afterImage: "/images/presets/att.ZtHmz8CppHobAsvyjxVtyJq17uzalIYGEtw_t45onmI.jpg",
    width: 1600, // Placeholder
    height: 900, // Placeholder
    buyUrl: "https://[TE_GUMROAD_LINKED]/zala-aranyora",
  },
  {
    id: 'pack2',
    name: "Portré Varázs Presetek",
    description: "Lágy, bőrbarát tónusok, kiemelt részletek. Professzionális megjelenés portréidnak.",
    tagline: "Lágy, professzionális portrék",
    price: "6.490 Ft",
    itemCount: "6 db (Desktop + Mobil)",
    beforeImage: "/images/presets/Screenshot 2025-06-06 at PM 1.42.38.png",
    afterImage: "/images/presets/att.ZtHmz8CppHobAsvyjxVtyJq17uzalIYGEtw_t45onmI.jpg",
    width: 900, // Placeholder
    height: 1200, // Placeholder
    buyUrl: "https://[TE_GUMROAD_LINKED]/portre-varazs",
  },
  {
    id: 'pack3',
    name: "Moody Urbex Preset Csomag",
    description: "Drámai, kontrasztos és hangulatos presetek elhagyatott helyszínek és városi témák fotózásához.",
    tagline: "Drámai, kontrasztos hangulat",
    price: "5.990 Ft",
    itemCount: "5 db (Desktop)",
    beforeImage: "/images/presets/Screenshot 2025-06-06 at PM 1.42.38.png",
    afterImage: "/images/presets/att.ZtHmz8CppHobAsvyjxVtyJq17uzalIYGEtw_t45onmI.jpg",
    width: 1600, // Placeholder
    height: 900, // Placeholder
    buyUrl: "https://[TE_GUMROAD_LINKED]/moody-urbex",
  }
];
// --------------------


export default function PresetsPage() {
  const [selectedPack, setSelectedPack] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
       if (event.key === 'Escape') {
        setSelectedPack(null);
       }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Profi Fotós Presetek – [A Te Neved Ide]</title> {/* CSERÉLD LE! */}
        <meta name="description" content="Emeld fotóidat új szintre egyedi Lightroom preseteimmel! Gyorsabb munkafolyamat, lenyűgöző, egységes stílus." />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen">
        
        {/* HERO SZEKCIÓ */}
        <section className="py-20 md:py-32 text-center bg-white relative">
          <div className="container mx-auto px-6 z-10 relative">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}>
              <Sparkles className="w-16 h-16 text-[#C79C8D] mx-auto mb-6" strokeWidth={1}/>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900"
                style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
              >
                Alakítsd Át Fotóidat. Azonnal.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                Fedezd fel az általam gondosan kidolgozott Lightroom preset kollekciókat, és add meg képeidnek azt az egységes, professzionális stílust, amire mindig is vágytál.
              </p>
              <Link href="#preset-kollekciok" legacyBehavior>
                <a className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
                  Fedezd Fel a Csomagokat
                </a>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PRESET KOLLEKCIÓK */}
        <section id="preset-kollekciok" className="py-16 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Válassz Kollekciót</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Minden csomag egyedi hangulatot és stílust képvisel. Kattints a részletekért!</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {presetPacks.map((pack) => (
                <motion.div 
                  key={pack.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-gray-200 hover:border-[#C79C8D] hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedPack(pack)}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.6 }}
                >
                  <div className="relative" style={{ aspectRatio: `${pack.width} / ${pack.height}`}}>
                    <Image src={pack.afterImage} alt={`${pack.name} - After`} layout="fill" objectFit="cover" className="transition-transform duration-400 group-hover:scale-105"/>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{pack.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{pack.tagline}</p>
                    <span className="inline-block w-full text-center bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg group-hover:bg-[#C79C8D] transition duration-300">
                      Részletek & Before/After
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESET RÉSZLETEZŐ MODAL */}
        <AnimatePresence>
          {selectedPack && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPack(null)} // Bezárás a háttérre kattintva
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bal oldal: Before/After csúszka */}
                <div className="w-full lg:w-3/5 bg-gray-100 flex-shrink-0">
                  <BeforeAfterSlider
                    beforeSrc={selectedPack.beforeImage}
                    afterSrc={selectedPack.afterImage}
                    width={selectedPack.width}
                    height={selectedPack.height}
                    alt={selectedPack.name}
                  />
                </div>

                {/* Jobb oldal: Részletek */}
                <div className="w-full lg:w-2/5 p-8 flex flex-col overflow-y-auto">
                   <button 
                      onClick={() => setSelectedPack(null)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors z-10 bg-white/50 rounded-full p-1"
                      aria-label="Bezárás"
                    >
                      <X size={24} />
                    </button>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>{selectedPack.name}</h2>
                  <p className="text-gray-600 mb-6">{selectedPack.description}</p>
                  
                  <div className="text-sm space-y-2 mb-6">
                    <p><strong>Csomag tartalma:</strong> {selectedPack.itemCount}</p>
                    <p><strong>Kompatibilitás:</strong> Lightroom Desktop & Mobil, Photoshop</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <p className="text-4xl font-extrabold text-gray-900 mb-4">{selectedPack.price}</p>
                    <a
                      href={selectedPack.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-auto block bg-gray-900 text-white text-center font-bold py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105"
                    >
                      Megvásárolom
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-center py-10 border-t border-gray-200 mt-16">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} [A Te Neved Ide] – Minden jog fenntartva.</p>
        </footer>

      </div>
    </>
  );
}