"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

// --- AZ ÖSSZES KÉRDÉS EGY HELYEN, KATEGORIZÁLVA ---
const allFaqs = [
  // Általános Kérdések
  { category: 'Általános', question: "Mikor kapom meg a kész képeket?", answer: "A fotózás után 1-2 napon belül küldök egy online válogató galériát. A kiválasztott kedvenceidet általában 7-10 munkanapon belül retusálom és adom át digitálisan, nagy felbontásban." },
  { category: 'Általános', question: "Mi történik, ha rossz az idő a szabadtéri fotózáson?", answer: "Az időjárás kiszámíthatatlan. Ha az előrejelzés rossz időt jósol (pl. eső, vihar), akkor közösen, díjmentesen keresünk egy új, megfelelő időpontot. A ti kényelmetek a legfontosabb!" },
  { category: 'Általános', question: "Hol zajlik a fotózás?", answer: "A helyszín teljesen rugalmas! Lehet kedvenc szabadtéri helyetek Zalaegerszegen, egy hangulatos kávézó, a saját otthonotok, vagy akár stúdiót is bérelhetünk (ennek díja külön tétel lehet). A lényeg, hogy olyan környezetet válasszunk, ami illik a koncepcióhoz és ahol komfortosan érzitek magatokat." },
  { category: 'Általános', question: "Mit tegyek, ha izgulok a fotózás miatt?", answer: "Teljesen természetes egy kis izgalom! A célom, hogy a fotózás egy kellemes, felszabadult élmény legyen. Sokat fogunk beszélgetni, és segítek a pózokban, hogy a lehető legtermészetesebb és legelőnyösebb képek szülessenek." },
  { category: 'Általános', question: "Szükséges sminkes/fodrász?", answer: "Egy profi smink és frizura sokat hozzáadhat a képekhez, de nem kötelező. Ha szeretnéd, tudok ajánlani szakembereket Zalaegerszegen, akikkel együtt dolgozom." },

  // Kismama
  { category: 'Kismama', question: "Mikor érdemes kismama fotózást készíteni?", answer: "A legideálisabb időszak a 28-34. hét között van, amikor a pocak már szépen kerekedik, de még nem okoz túl nagy kényelmetlenséget." },
  { category: 'Kismama', question: "Milyen ruhát érdemes hozni kismama fotózásra?", answer: "Ajánlott világos, pasztell színű, testhezálló vagy lágy esésű ruhákat választani, amelyek kiemelik a pocak szépségét. Kényelmes, elegáns viselet ajánlott. Természetesen segítek a választásban!" },
  { category: 'Kismama', question: "Lehet-e a párom és a nagyobb gyermekem is a képeken?", answer: "Természetesen, sőt, bátorítalak is rá! A fotózás során lehetőség van közös képek készítésére is, hogy az egész család megörökíthesse ezt a különleges időszakot." },

  // Családi
  { category: 'Családi', question: "Mit vegyünk fel családi fotózásra?", answer: "A legfontosabb a kényelem! Válasszatok egymással harmonizáló, de nem teljesen egyforma ruhákat. A pasztell és földszínek mindig jól működnek. Kerüljük a nagy feliratokat és az apró, zavaró mintákat." },
  { category: 'Családi', question: "Mi történik, ha a gyerekek nyűgösek a fotózáson?", answer: "Semmi gond, ez a legtermészetesebb dolog! A fotózás egy közös játék, ahol mindig a gyerekek tempójához igazodom. A legjobb képek általában pont a spontán, felszabadult pillanatokban születnek." },
  { category: 'Családi', question: "Hozhatjuk a kutyánkat is a családi fotózásra?", answer: "Természetesen! A háziállatok a család teljes jogú tagjai, így őket is szeretettel várom a fotózáson." },

  // Kutyus
  { category: 'Kutyus', question: "Hogyan készüljünk fel a kutyafotózásra?", answer: "A fotózás előtt érdemes a kutyust megsétáltatni, hogy energikus, de ne túlpörgött legyen. Hozz magaddal kedvenc játékait, jutalomfalatkáit és vizet. Az alap vezényszavak ismerete segít, de nem feltétel!" },
  { category: 'Kutyus', question: "Hozhatok több kutyát is a fotózásra?", answer: "Persze! Ha több kutyussal érkeznél, kérlek, ezt jelezd előre az időpontfoglaláskor, hogy megfelelően tudjunk tervezni és elég időt szánni mindenkire." },
  { category: 'Kutyus', question: "A kutyám nagyon energikus / félénk, lehet így is jó képeket készíteni?", answer: "Minden kutyus egyedi személyiség! Legyen szó extra energikus vagy visszahúzódóbb kedvencről, türelemmel és a kutyus igényeihez alkalmazkodva fogunk csodás képeket készíteni." },

  // Autó
  { category: 'Autó', question: "Milyen típusú autókat lehet fotózni?", answer: "Bármilyen autót szívesen fotózok, legyen az sportautó, veterán, tuningolt vagy akár egy szeretett hétköznapi autó." },
  { category: 'Autó', question: "Milyen időjárás ideális autófotózáshoz?", answer: "A legjobb fényviszonyokat naplementekor ('golden hour') vagy enyhén felhős időben lehet elérni, mert ilyenkor lágyak a fények és szépek a tükröződések. De esőben is lehet különleges, drámai képeket készíteni." },
  { category: 'Autó', question: "Lehet-e éjszakai vagy mozgás közbeni ('rolling shots') fotókat készíteni?", answer: "Természetesen! Ezek speciális technikát és előkészületet igényelnek, ezért kérlek, ezt az igényedet jelezd előre az ajánlatkéréskor." },
];

const categories = ['Általános', 'Kismama', 'Családi', 'Kutyus', 'Autó']; // A kategória gombok sorrendje

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('Általános');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter(faq => {
      const categoryMatch = activeCategory === 'Általános' ? true : faq.category === activeCategory;
      const searchTermMatch = searchTerm.length < 2 ? true : 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchTermMatch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <Head>
        <title>Gyakori Kérdések – Kovács Bálint Fotó</title>
        <meta name="description" content="Válaszok a leggyakrabban felmerülő kérdésekre fotózásaimmal kapcsolatban. Tudj meg többet a folyamatról, az árakról és a lehetőségekről." />
      </Head>

      <div className="bg-white min-h-screen">
        {/* FEJLÉC */}
        <section className="bg-gray-100 py-16 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Gyakran Ismételt Kérdések</h1>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Minden, amit tudni szeretnél a közös munkáról. Ha nem találod a választ, keress bátran!</p>
            </motion.div>
        </section>

        <div className="container mx-auto px-6 py-12 max-w-4xl">
            {/* KERESŐ ÉS KATEGÓRIA SZŰRŐ */}
            <div className="sticky top-16 sm:top-20 bg-white/80 backdrop-blur-sm z-30 py-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Keress a kérdések között..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] outline-none transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                                activeCategory === category 
                                ? 'bg-gray-800 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* GYIK LISTA */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFaqs.map((item, index) => (
                  <motion.div 
                    key={item.question + item.category} 
                    className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <button
                      className="w-full flex justify-between items-center text-left p-5 font-semibold text-gray-800 hover:bg-gray-100/70 focus:outline-none"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    >
                      <span className="text-md sm:text-lg">{item.question}</span>
                      <ChevronDown
                        size={24}
                        className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${openFaqIndex === index ? "rotate-180" : "rotate-0"} text-[#C79C8D]`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-5 pb-5 text-gray-600"
                        >
                          <p className="border-l-2 border-[#C79C8D] pl-4 pt-2 text-base">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredFaqs.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-gray-500">
                  <p>Nincs találat. Próbálj meg más kulcsszót vagy válassz másik kategóriát!</p>
                </motion.div>
              )}
            </div>
            
            {/* CTA SZEKCIÓ */}
            <div className="text-center py-16 mt-12 bg-gray-100 rounded-lg">
                <HelpCircle className="mx-auto w-12 h-12 text-[#C79C8D] mb-4"/>
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>Nem találtad a választ?</h3>
                <p className="text-gray-600 mb-6">Ha további kérdésed van, ne habozz felvenni velem a kapcsolatot!</p>
                <Link href="/contact" legacyBehavior>
                    <a className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 transition duration-300">
                        Kapcsolatfelvétel
                    </a>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
}