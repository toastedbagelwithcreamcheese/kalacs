"use client";

import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Ikonok (példa, lucide-react alapján)
import { Sparkles, CheckCircle, Download, Palette, Film, Users, MessageSquare } from 'lucide-react';

// --- PRESET CSOMAGOK ADATAI ---
// CSERÉLD LE EZEKET A SAJÁT PRESET CSOMAGJAIDRA!
// A 'buyUrl' a Gumroad (vagy más platform) terméklapjának URL-je legyen.
// A 'beforeImage' és 'afterImage' a hatás bemutatásához kulcsfontosságú.
const presetPacks = [
  {
    id: 'pack1',
    name: "Zala Aranyóra Kollekció",
    description: "Meleg, filmszerű tónusok tájképekhez és szabadtéri portrékhoz. Tökéletes naplemente és napfelkelte fotókhoz.",
    price: "7.990 Ft",
    itemCount: "8 db (Desktop + Mobil)",
    beforeImage: "/images/presets/zala_aranyora_before.jpg", // CSERÉLD LE!
    afterImage: "/images/presets/zala_aranyora_after.jpg",   // CSERÉLD LE!
    buyUrl: "https://[TE_GUMROAD_LINKED]/zala-aranyora", // CSERÉLD LE!
    features: ["Meleg, aranyló fények", "Filmszerű hangulat", "Tájképekhez ideális", "Könnyen telepíthető"],
  },
  {
    id: 'pack2',
    name: "Portré Varázs Presetek",
    description: "Lágy, bőrbarát tónusok, kiemelt részletek. Professzionális megjelenés portréidnak.",
    price: "6.490 Ft",
    itemCount: "6 db (Desktop + Mobil)",
    beforeImage: "/images/presets/portre_varazs_before.jpg", // CSERÉLD LE!
    afterImage: "/images/presets/portre_varazs_after.jpg",   // CSERÉLD LE!
    buyUrl: "https://[TE_GUMROAD_LINKED]/portre-varazs", // CSERÉLD LE!
    features: ["Természetes bőrtónusok", "Éles részletek", "Stúdió & Szabadtéri", "Univerzális portré stílus"],
  },
  {
    id: 'pack3',
    name: "Moody Urbex Preset Csomag",
    description: "Drámai, kontrasztos és hangulatos presetek elhagyatott helyszínek és városi témák fotózásához.",
    price: "5.990 Ft",
    itemCount: "5 db (Desktop)",
    beforeImage: "/images/presets/moody_urbex_before.jpg", // CSERÉLD LE!
    afterImage: "/images/presets/moody_urbex_after.jpg",   // CSERÉLD LE!
    buyUrl: "https://[TE_GUMROAD_LINKED]/moody-urbex", // CSERÉLD LE!
    features: ["Kontrasztos, sötét tónusok", "Ipari és városi témákhoz", "Egyedi atmoszféra", "Haladó felhasználóknak is"],
  }
];
// --------------------

export default function PresetsPage() {
  return (
    <>
      <Head>
        <title>Profi Fotós Presetek – [A Te Neved Ide]</title> {/* CSERÉLD LE! */}
        <meta name="description" content="Emeld fotóidat új szintre egyedi Lightroom preseteimmel! Gyorsabb munkafolyamat, lenyűgöző, egységes stílus." />
      </Head>

      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
        
        {/* HERO SZEKCIÓ */}
        <motion.section 
          className="relative py-28 md:py-40 text-center overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        >
          {/* Háttérkép (opcionális, lehet egy videó is) */}
          <Image 
            src="/images/presets/hero_background_presets.jpg" // CSERÉLD LE EGY LÁTVÁNYOS "AFTER" KÉPRE!
            alt="Presetekkel szerkesztett lenyűgöző fotó"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-30"
            quality={80}
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Sötétítő réteg */}
          
          <motion.div 
            className="relative z-10 container mx-auto px-6"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
          >
            <Sparkles className="w-16 h-16 text-[#C79C8D] mx-auto mb-6" strokeWidth={1.5}/>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
              style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
            >
              Alakítsd Át Fotóidat Egy Kattintással!
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Fedezd fel az általam gondosan kidolgozott Lightroom preset kollekciókat, és add meg képeidnek azt az egységes, professzionális stílust, amire mindig is vágytál.
            </p>
            <Link href="#preset-kollekciok" legacyBehavior>
              <a className="inline-block bg-[#C79C8D] text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-[#b3897b] transition duration-300 transform hover:scale-105 shadow-lg">
                Preset Kollekciók Megtekintése
              </a>
            </Link>
          </motion.div>
        </motion.section>

        {/* MIÉRT EZEK A PRESETEK? */}
        <section className="py-16 sm:py-20 bg-gray-800/50">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Miért fogod imádni ezeket a preseteket?</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Több mint filterek – eszközök a kreatív önkifejezéshez és a hatékony munkához.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <CheckCircle className="w-10 h-10 text-[#C79C8D] mb-3"/>, title: "Azonnali Profi Eredmény", text: "Egyetlen kattintással drámaian javíthatod képeid minőségét és hangulatát." },
                { icon: <Palette className="w-10 h-10 text-[#C79C8D] mb-3"/>, title: "Egységes Vizuális Stílus", text: "Teremts konzisztens megjelenést portfóliódnak, Instagramodnak vagy blogodnak." },
                { icon: <Download className="w-10 h-10 text-[#C79C8D] mb-3"/>, title: "Könnyű Használat", text: "Egyszerű telepítés mobilon és asztali gépen is. Részletes útmutató minden csomaghoz." },
                { icon: <Film className="w-10 h-10 text-[#C79C8D] mb-3"/>, title: "Sokoldalú Kompatibilitás", text: "Lightroom Classic, CC, és Mobil verziókhoz, valamint Photoshop Camera Raw-hoz." }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg text-center"
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.5, delay: index * 0.1 }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESET KOLLEKCIÓK */}
        <section id="preset-kollekciok" className="py-16 sm:py-24">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Fedezd Fel a Kollekciókat</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Minden csomagot úgy alkottam meg, hogy egyedi hangulatot és stílust kölcsönözzön fotóidnak.</p>
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {presetPacks.map((pack) => (
                <motion.div 
                  key={pack.id}
                  className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col group"
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.6 }}
                >
                  <div className="relative aspect-video_or_custom_for_before_after"> {/* Before/After kép konténer */}
                    {/* IDE JÖHETNE EGY BEFORE/AFTER SLIDER KOMPONENS, VAGY KÉT KÉP EGYMÁS MELLETT/ALATT */}
                    {/* Most egy egyszerű "After" képet jelenítek meg placeholderként */}
                    <Image src={pack.afterImage} alt={`${pack.name} - After`} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute top-4 right-4 bg-[#C79C8D] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">{pack.itemCount}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>{pack.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{pack.description}</p>
                    <ul className="text-xs text-gray-500 mb-4 space-y-1">
                        {pack.features.map(feature => (
                            <li key={feature} className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-400 flex-shrink-0"/> {feature}
                            </li>
                        ))}
                    </ul>
                    <p className="text-3xl font-bold text-[#C79C8D] mb-6">{pack.price}</p>
                    <a 
                      href={pack.buyUrl} 
                      target="_blank" // Fontos, hogy új lapon nyíljon meg a Gumroad (vagy más) oldal
                      rel="noopener noreferrer" // Biztonsági okokból
                      className="w-full mt-auto inline-block bg-[#C79C8D] text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-[#b3897b] transition duration-300 transform hover:scale-105"
                    >
                      Megvásárolom
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TELEPÍTÉSI ÚTMUTATÓ / GYIK SZEKCIÓ */}
        <section className="py-16 sm:py-20 bg-gray-800/30">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                <motion.div
                    initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6 }}
                >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Hogyan használd a preseteket?</h3>
                    <p className="text-gray-300 mb-3">A telepítés és használat gyerekjáték! Minden csomaghoz részletes, lépésről-lépésre útmutatót biztosítok (PDF és/vagy videó), hogy pillanatok alatt elkezdhesd a varázslatot.</p>
                    <p className="text-gray-400 text-sm mb-5">Kompatibilis: Lightroom Desktop (Classic & CC), Lightroom Mobile (ingyenes és fizetős verzió), Photoshop Camera Raw.</p>
                    <Link href="/presets-gyik-telepites" legacyBehavior> {/* Készíts egy oldalt a részletes GYIK-nak */}
                        <a className="text-[#C79C8D] font-semibold hover:text-[#b3897b] transition-colors group">
                            Részletes GYIK és Telepítési Segédlet <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                    </Link>
                </motion.div>
                <motion.div
                    className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
                    initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, delay:0.1 }}
                >
                    {/* Ide jöhetne egy rövid bemutató videó a presetek használatáról, vagy egy illusztratív kép */}
                    <Image 
                        src="/images/presets/presets_tutorial_placeholder.jpg" // CSERÉLD LE!
                        alt="Preset telepítési útmutató"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.div>
            </div>
        </section>

        {/* ZÁRÓ CTA */}
        <section className="py-20 md:py-28 text-center">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7 }}
                >
                    <Users className="w-16 h-16 text-[#C79C8D] mx-auto mb-6" strokeWidth={1.5}/>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Csatlakozz a Kreatív Közösséghez!</h2>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">Kérdésed van a presetekkel kapcsolatban, vagy csak megosztanád velünk az alkotásaidat? Lépj velem kapcsolatba!</p>
                    <Link href="/contact?subject=Presetekkel_kapcsolatos_kerdes" legacyBehavior>
                        <a className="inline-block bg-transparent border-2 border-[#C79C8D] text-[#C79C8D] font-bold py-4 px-10 rounded-full text-lg hover:bg-[#C79C8D] hover:text-white transition duration-300 transform hover:scale-105">
                            Kérdezz bátran!
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>


        <footer className="text-center py-10 border-t border-gray-700/50">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} [A Te Neved Ide] – Minden jog fenntartva.</p>
        </footer>

      </div>
    </>
  );
}