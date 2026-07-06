"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, CheckCircle, Sun, Smile, Users, Download, 
  X, ArrowRight, Calendar, Camera, ClipboardCheck, Mail, Sparkles, Phone 
} from "lucide-react";

// --- ADATOK ---

const galleryImages = [
  { src: "/images/husvet_1.webp", alt: "Vidám tavaszi hangulat" },
  { src: "/images/husvet_2.webp", alt: "Portré a szabadban" },
  { src: "/images/husvet_3.webp", alt: "Közös kép" },
];

const steps = [
  {
    icon: <Calendar size={28} />,
    title: "Időpontfoglalás",
    text: "Egyeztetünk egy délelőttöt, ami megfelel az intézménynek."
  },
  {
    icon: <Camera size={28} />,
    title: "A Fotózás Napja",
    text: "Saját dekorációval érkezünk, és játékosan lefotózzuk a gyerekeket."
  },
  {
    icon: <Mail size={28} />,
    title: "Online Választás",
    text: "A szülők névre szóló galériát kapnak, ahol kényelmesen válogathatnak."
  },
  {
    icon: <Sparkles size={28} />,
    title: "Kézbesítés",
    text: "A kész képeket digitálisan vagy papír alapon juttatjuk el."
  }
];

const schoolBenefits = [
  {
    icon: <Users size={32} />,
    title: "Zéró Adminisztráció",
    text: "Nem kell pénzt gyűjteni, borítékozni vagy listázni. Mindent az online rendszerünk kezel.",
  },
  {
    icon: <Download size={32} />,
    title: "Ingyenes az Intézménynek",
    text: "A fotózás kitelepülése és lebonyolítása teljesen díjmentes az óvoda vagy iskola számára.",
  },
  {
    icon: <Smile size={32} />,
    title: "Pedagógus Ajándék",
    text: "Hálánk jeléül a pedagógusokról profi portrét készítünk, és csoportképet is adunk ajándékba.",
  },
];

const packages = [
  {
    title: "Alap Csomag",
    price: "0 Ft",
    priceSuffix: "Az intézménynek",
    description: "A szülők egyéni igény szerint vásárolnak.",
    features: [
      "Teljes tavaszi dekoráció",
      "Egyéni és testvérképek készítése",
      "Jelszóval védett online galéria",
      "Digitális és papírkép opciók",
      "Ügyfélszolgálat a szülőknek",
    ],
    highlight: false,
  },
  {
    title: "Komplett Megoldás",
    price: "Egyedi",
    priceSuffix: "megállapodás",
    description: "Ideális választás ballagási vagy ünnepi szezonra.",
    features: [
      "Minden, ami az alap csomagban van",
      "Csoportképek minden osztálynak",
      "Tablófotózás lehetősége",
      "Kiemelt kedvezmény a szülőknek",
      "Gyorsított retusálási határidő",
    ],
    highlight: true,
  },
];

const faqData = [
  { 
    question: "Mennyi munkával jár ez az óvónőknek?", 
    answer: "Gyakorlatilag semmivel. Mi hozzuk a dekorációt, mi kezeljük a rendeléseket és a fizetést. Az óvónőknek csak a gyerekek bekísérésében kell segíteniük, minden mást mi intézünk." 
  },
  { 
    question: "Hogyan jutnak el a képek a szülőkhöz?", 
    answer: "Minden gyermek kap egy egyedi kódot. Ezzel a szülő belép a weboldalunkra, ahol csak a saját gyermeke képeit látja. Itt tud rendelni és fizetni is." 
  },
  { 
    question: "Milyen hátteret használtok?", 
    answer: "Kerüljük a művi, digitális háttereket. Valódi, prémium minőségű tavaszi kiegészítőkkel (fa elemek, virágok, kosarak) építünk fel egy kis stúdiót a helyszínen." 
  },
  { 
    question: "Biztonságosak az adatok?", 
    answer: "Igen, rendszerünk GDPR kompatibilis. A képek zárt szerveren vannak, és csak az adott kód birtokában tekinthetők meg." 
  },
];

export default function EasterSchoolPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white text-[#5A4A42] font-sans selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. HERO SZEKCIÓ */}
      <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/husvet_hero.webp" // Cseréld le a fő képre
            alt="Húsvéti fotózás"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#5A4A42]/50 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-20 px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-6 border border-white/50 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase backdrop-blur-md">
              Prémium Óvodai és Iskolai Fotózás
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Húsvéti Örömök <br/> <span className="text-[#C79C8D]">Gondok Nélkül</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Vigyen tavaszi hangulatot az intézménybe! Modern, online rendelési rendszerrel levesszük az adminisztrációs terhet a pedagógusok válláról.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#ajanlatkeres" 
                className="bg-[#C79C8D] hover:bg-[#b3897b] text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ClipboardCheck size={20} /> Ajánlatkérés Intézménynek
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FOLYAMAT (Step-by-step) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5A4A42]">Hogyan dolgozunk?</h2>
            <div className="w-16 h-1 bg-[#C79C8D] mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 bg-[#F9F5F1] text-[#C79C8D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#C79C8D]/10">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#5A4A42]/70">{step.text}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-[#C79C8D]/20 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ELŐNYÖK */}
      <section className="py-24 bg-[#F9F5F1] rounded-[3rem] mx-4">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {schoolBenefits.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="text-[#C79C8D] mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-[#5A4A42]/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALÉRIA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-[#5A4A42]">Tavaszi Hangulat</h2>
              <p className="text-[#5A4A42]/60 mt-2">Ízelítő korábbi húsvéti fotózásaink dekorációjából.</p>
            </div>
            <Link href="/galeria" className="text-[#C79C8D] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Összes kép megtekintése <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CSOMAGOK */}
      <section id="csomagok" className="py-24 bg-[#5A4A42] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Együttműködési Formák</h2>
            <p className="text-white/60">Válassza az intézményének legmegfelelőbb opciót.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`p-10 rounded-[2.5rem] border ${
                  pkg.highlight ? 'bg-white text-[#5A4A42] border-white' : 'border-white/20 text-white'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`text-4xl font-bold ${pkg.highlight ? 'text-[#C79C8D]' : 'text-white'}`}>{pkg.price}</span>
                  <span className="text-sm opacity-60 uppercase tracking-wider">{pkg.priceSuffix}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle size={18} className={pkg.highlight ? 'text-[#C79C8D]' : 'text-white/40'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#ajanlatkeres"
                  className={`block text-center py-4 rounded-full font-bold transition-all ${
                    pkg.highlight ? 'bg-[#5A4A42] text-white hover:bg-[#C79C8D]' : 'bg-white text-[#5A4A42] hover:bg-gray-100'
                  }`}
                >
                  Részletek egyeztetése
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GYIK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Gyakori Kérdések</h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left font-bold text-[#5A4A42] hover:text-[#C79C8D] transition-colors"
                >
                  <span className="text-lg">{item.question}</span>
                  <ChevronDown className={`transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#5A4A42]/70 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA / AJÁNLATKÉRÉS */}
      <section id="ajanlatkeres" className="py-24 bg-[#F9F5F1]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-[#C79C8D]/10">
            <h2 className="text-4xl font-bold mb-6">Szeretne húsvéti fotózást?</h2>
            <p className="text-[#5A4A42]/70 mb-10">
              Kérjen ingyenes tájékoztatót vagy foglaljon időpontot telefonon! <br/>
              A tavaszi szabad helyeink gyorsan telnek.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                href="mailto:kapcsolat@kovacsbalintfoto.hu" 
                className="bg-[#5A4A42] text-white px-8 py-4 rounded-full font-bold hover:bg-[#463932] transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} /> Írjon nekünk
              </Link>
              <Link 
                href="tel:+36301234567" 
                className="border-2 border-[#C79C8D] text-[#C79C8D] px-8 py-4 rounded-full font-bold hover:bg-[#C79C8D] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} /> +36 30 872 3777
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#5A4A42]/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white"><X size={40} /></button>
            <div className="relative w-full max-w-4xl h-[80vh]">
              <Image src={selectedImage} alt="Kép" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}