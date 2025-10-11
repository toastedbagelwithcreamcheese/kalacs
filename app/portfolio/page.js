// app/portfolio/page.js
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const inter = Inter({ subsets: ['latin'] })

// --- PORTFOLIO DATA (az általad küldött szerkezet alapján) ---
const portfolioData = {
  sunsetPortraits: {
    title: 'Elegancia a Naplementében: Festetics Kastély',
    description:
      'Egyedi hangulatú portrék, kihasználva a természeti fényeket és a helyszín karakterét.',
    images: [
      ...Array.from({ length: 4 }, (_, i) => `/images/portfolio/portre_dorka/${i + 1}.webp`),
      ...Array.from({ length: 7 }, (_, i) => `/images/portfolio/portre_dorka/${i + 5}.webp`),
    ],
  },
  nightPortraits: {
    title: 'Éjszakai Portrék: Budapest Fényei',
    description:
      'Hangulatos éjszakai sorozatok, mély tónusokkal — ide szeretnénk sötét háttérbe átmenni.',
    images: [
      ...Array.from({ length: 6 }, (_, i) => `/images/portfolio/portre_virag/${i + 1}.webp`),
      ...Array.from({ length: 5 }, (_, i) => `/images/portfolio/portre_virag/${i + 8}.webp`),
      ...Array.from({ length: 5 }, (_, i) => `/images/portfolio/portre_virag/${i + 13}.jpg`),
    ],
  },
  // ÚJ SZEKCIÓ ADATAI
  cherryBlossom: {
    title: 'Tavaszi Ébredés: Cseresznyevirág Portrék',
    description: 'A tavasz első virágai között készült portrésorozat, amely a természet újjászületését és a finom eleganciát örökíti meg.',
    images: [
      ...Array.from({ length: 6 }, (_, i) => `/images/portfolio/portre_dorka2/${i + 1}.png`)
    ],
  },
  // ÚJ SZEKCIÓ ADATAI
  lavenderFamily: {
    title: 'Varázslat a Levendulamezőn',
    description: 'Meghitt családi pillanatok egy csodálatos levendulás kertben, ahol a színek és az érzelmek összefonódnak.',
    images: [
      '/images/_MG_8620.webp',
      '/images/_MG_8634.webp',
      '/images/_MG_8762.webp',
      '/images/_MG_8775.webp',
      '/images/_MG_8842.webp',
      '/images/_MG_8890.webp',
      '/images/_MG_8932.webp',
      '/images/_MG_9335.webp',
      '/images/_MG_8653.webp',
      '/images/_MG_8876.webp',
      '/images/_MG_8992.webp',
      '/images/_MG_9219.webp',
      '/images/_MG_9237.webp',
      '/images/_MG_9381.webp',
    ],
  },
  offroadEvents: {
    title: 'Rendezvényfotózás: Az Offroad Világa',
    description:
      'Gyors, dinamikus eseményfotók — fókuszban a mozgás és a történetmesélés.',
    images: [
      '/images/portfolio/offroad/_MG_0214.jpeg',
      '/images/portfolio/offroad/_MG_0512.jpg',
      '/images/portfolio/offroad/_MG_0483.jpg',
      '/images/portfolio/offroad/_MG_0231.jpeg',
      '/images/portfolio/offroad/_MG_0670.jpg',
      '/images/portfolio/offroad/_MG_0962.jpg',
      '/images/portfolio/offroad/_MG_0951.jpg',
      '/images/portfolio/offroad/_MG_0588.jpg',
      '/images/portfolio/offroad/_MG_0604.jpg',
      '/images/portfolio/offroad/_MG_0467.jpg',
      '/images/portfolio/offroad/_MG_0856.jpg',
      '/images/portfolio/offroad/_MG_0098.jpg',
      '/images/portfolio/offroad/_MG_0103.jpg',
    ],
  },
  carPortraits: {
        title: 'Dinamika és Forma: Autóportrék',
        description: 'Az autók világának megörökítése, ahol a fém és a fény találkozik. A cél a formák és a karakter kiemelése.',
        images: [
            ...Array.from({ length: 12 }, (_, i) => `/images/portfolio/autok/${i + 1}.png`)
        ],
    },
  versatility: {
  title: 'A Természet Hívása: Madarak és Tájak',
  description: 'Válogatás a legkedvesebb madár- és tájfotóimból, melyek a természet csendjét és szépségét örökítik meg.',
  images: [
    '/images/portfolio/termeszet/allat1.png',
    '/images/portfolio/termeszet/birb1.png',
    '/images/portfolio/termeszet/birb2.png',
    '/images/portfolio/termeszet/birb3.png',
    '/images/portfolio/termeszet/birb4.png',
    '/images/portfolio/termeszet/birb5.png',
    '/images/portfolio/termeszet/birb6.png',
    '/images/portfolio/termeszet/birb7.png',
    '/images/portfolio/termeszet/hold1.png',
    '/images/portfolio/termeszet/hold2.png',
    '/images/portfolio/termeszet/taj1.png',
    '/images/portfolio/termeszet/taj2.png',
    '/images/portfolio/termeszet/taj3.png',
    '/images/portfolio/termeszet/taj4.png',
    '/images/portfolio/termeszet/taj5.png',
    '/images/portfolio/termeszet/taj6.png',
    '/images/portfolio/termeszet/taj7.png',
    '/images/portfolio/termeszet/taj8.png',
    '/images/portfolio/termeszet/taj9.png',
    '/images/portfolio/termeszet/taj10.png',
  ],
},
  // ÚJ SZEKCIÓ ADATAI
  lakesideFamily: {
    title: 'Tóparti Varázslat Alkonyatkor',
    description: 'Felszabadult családi pillanatok a lemenő nap arany fényében, a vízpart nyugalmával övezve.',
    images: [
      ...Array.from({ length: 8 }, (_, i) => `/images/portfolio/csaladi/csalad${i + 1}.png`),
      '/images/_MG_1136.webp',
      '/images/_MG_0017-2.webp',
      '/images/_MG_0114-2.webp',
      '/images/_MG_0097-2.webp',
      '/images/_MG_0281-2-Edit.webp',
      '/images/_MG_0066-2.webp',
      '/images/_MG_0148-2-2.webp',
    ],
  }
}

// --- UTILS: szín-interpoláció hex között ---
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}
function rgbToHex({ r, g, b }) {
  const toHex = (v) => v.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}
function lerpHex(c1, c2, t) {
  const rgb1 = hexToRgb(c1)
  const rgb2 = hexToRgb(c2)
  return rgbToHex({
    r: lerp(rgb1.r, rgb2.r, t),
    g: lerp(rgb1.g, rgb2.g, t),
    b: lerp(rgb1.b, rgb2.b, t),
  })
}

// --- Reusable components ---
function SectionHeader({ title, description, inverted = false }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-3 ${inverted ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      <p className={`${inverted ? 'text-gray-200' : 'text-gray-600'} text-lg max-w-3xl mx-auto`}>{description}</p>
    </div>
  )
}

function ImageGrid({ images, onOpen }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((src, idx) => (
        <motion.button
          key={src + idx}
          onClick={() => onOpen(idx)}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src={src}
            alt={`Portfolio kép ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={80}
            priority={idx < 6}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
        </motion.button>
      ))}
    </div>
  )
}

// --- MAIN PAGE ---
export default function PortfolioPage() {
  const nightRef = useRef(null)
  const cherryBlossomRef = useRef(null);
  const carRef = useRef(null); // ÚJ
  const sunsetPortraitsRef = useRef(null); // ÚJ
  const lakesideRef = useRef(null);
  const lavenderRef = useRef(null)
  const natureRef = useRef(null);
  const containerRef = useRef(null)
  const [bgTop, setBgTop] = useState('#faf9f7') // törtfehér
  const [bgBottom, setBgBottom] = useState('#e5e7eb') // világos szürke alap
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSlides, setLightboxSlides] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // prepare a helper to open lightbox with a given image list and start index
  const openLightboxWith = useCallback((images, idx) => {
    // yet-another-react-lightbox expects slides: [{ src: '/...' }, ...]
    setLightboxSlides(images.map((s) => ({ src: s })))
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }, [])

  // MÓDOSÍTOTT: Scroll handler, többlépcsős színváltással
useEffect(() => {
    function onScroll() {
      // Minden ref-et ellenőrzünk
      if (!carRef.current || !sunsetPortraitsRef.current || !nightRef.current || !cherryBlossomRef.current || !lavenderRef.current || !lakesideRef.current || !natureRef.current) return;

      const carRect = carRef.current.getBoundingClientRect();
      const sunsetRect = sunsetPortraitsRef.current.getBoundingClientRect();
      const nightRect = nightRef.current.getBoundingClientRect();
      const cherryRect = cherryBlossomRef.current.getBoundingClientRect();
      const lavenderRect = lavenderRef.current.getBoundingClientRect();
      const lakesideRect = lakesideRef.current.getBoundingClientRect();
      const natureRect = natureRef.current.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;

      // Színpaletta bővítése
      const offwhite = '#faf9f7'; const midGray = '#d1d5db'; const black = '#111111';
      const carTop = '#d4d4d8'; const carBottom = '#a1a1aa'; // ÚJ: Autós szürke színek
      const cherryTop = '#fee2e2'; const cherryBottom = '#fecdd3';
      const lavenderTop = '#e6e0f5'; const lavenderBottom = '#d8cbed';
      const warmTop = '#fdf6e3'; const warmBottom = '#f3eade';
      const natureTop = '#e0e7d4'; const natureBottom = '#c7d1b8';

      const getProgress = (rect) => {
        const triggerStart = winH * 0.9; const triggerEnd = winH * 0.15;
        const tRaw = (triggerStart - rect.top) / (triggerStart - triggerEnd);
        return Math.min(1, Math.max(0, tRaw));
      };
      
      const tCar = getProgress(carRect);
      const tSunset = getProgress(sunsetRect);
      const tDark = getProgress(nightRect);
      const tCherry = getProgress(cherryRect);
      const tLavender = getProgress(lavenderRect);
      const tWarm = getProgress(lakesideRect);
      const tNature = getProgress(natureRect);

      let topColor, bottomColor;

      if (tNature > 0) {
        topColor = lerpHex(warmTop, natureTop, tNature);
        bottomColor = lerpHex(warmBottom, natureBottom, tNature);
      } else if (tWarm > 0) {
        topColor = lerpHex(lavenderTop, warmTop, tWarm);
        bottomColor = lerpHex(lavenderBottom, warmBottom, tWarm);
      } else if (tLavender > 0) {
        topColor = lerpHex(cherryTop, lavenderTop, tLavender);
        bottomColor = lerpHex(cherryBottom, lavenderBottom, tLavender);
      } else if (tCherry > 0) {
        topColor = lerpHex(black, cherryTop, tCherry);
        bottomColor = lerpHex(black, cherryBottom, tCherry);
      } else if (tDark > 0) {
          // MÓDOSÍTOTT: Kétlépcsős sötétedés
          if (tDark < 0.5) {
            const local = tDark / 0.5;
            topColor = lerpHex(offwhite, midGray, local);
            bottomColor = lerpHex('#f3f4f6', '#9ca3af', local);
          } else {
            const local = (tDark - 0.5) / 0.5;
            topColor = lerpHex(midGray, black, local);
            bottomColor = lerpHex('#9ca3af', black, local);
          }
      } else if (tSunset > 0) {
        // ÚJ ÁTMENET: Szürkéből vissza világosra
        topColor = lerpHex(carTop, offwhite, tSunset);
        bottomColor = lerpHex(carBottom, '#f3f4f6', tSunset);
      } else if (tCar > 0) {
        // ÚJ ÁTMENET: Világosból szürkére
        topColor = lerpHex(offwhite, carTop, tCar);
        bottomColor = lerpHex('#f3f4f6', carBottom, tCar);
      } else {
        // Alap háttérszín
        topColor = offwhite;
        bottomColor = '#e5e7eb';
      }

      setBgTop(topColor);
      setBgBottom(bottomColor);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
}, []);

  const bgStyle = { background: `linear-gradient(180deg, ${bgTop} 0%, ${bgBottom} 100%)`, transition: 'background 200ms linear' }
  const sectionVariant = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <main ref={containerRef} className={`${inter.className} min-h-screen`} style={bgStyle}>
{/* HERO V2: Modern és Személyes */}
<section className="overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 md:gap-12 lg:gap-16 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Kép */}
      <div className="md:col-span-1 flex justify-center md:justify-end">
        <div className="w-48 h-48 md:w-60 md:h-60 relative rounded-full overflow-hidden shadow-2xl mb-8 md:mb-0 transform hover:scale-105 transition-transform duration-300">
          <Image src="/images/profilkep.jpg" alt="Profilkép" fill style={{ objectFit: 'cover' }} priority />
        </div>
      </div>
      
      {/* Szöveg */}
      <div className="md:col-span-2 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
          Kovács Bálint
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Két éve a természetfotózás világában fedeztem fel a szenvedélyem, ami megtanított a fények és a kompozíció fontosságára. Azonban az igazi hivatásom az emberek egyedi karakterének és az autók dinamikus formavilágának megörökítése. Engem a valódi történetek inspirálnak.
        </p>
      </div>
    </motion.div>
  </div>
</section>

      <div className="max-w-6xl mx-auto px-6 space-y-20 pb-24">
        {/* OFFROAD / RENDEZVÉNY - priority */}
        <motion.section
          id="rendezveny"
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader title={portfolioData.offroadEvents.title} description={portfolioData.offroadEvents.description} />
          <ImageGrid
            images={portfolioData.offroadEvents.images}
            onOpen={(idx) => openLightboxWith(portfolioData.offroadEvents.images, idx)}
          />
        </motion.section>

        {/* Naplementés portrék (sunset) - still light background */}
        <motion.section
          id="portre-naplemente"
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader title={portfolioData.sunsetPortraits.title} description={portfolioData.sunsetPortraits.description} />
          <ImageGrid
            images={portfolioData.sunsetPortraits.images}
            onOpen={(idx) => openLightboxWith(portfolioData.sunsetPortraits.images, idx)}
          />
        </motion.section>

        {/* --- ÉJSZAKAI PORTRÉ: ide kell sötét hatás --- */}
        <motion.section
          id="portre-ejjel"
          ref={nightRef}
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Make header text light when background is darkening */}
          <SectionHeader title={portfolioData.nightPortraits.title} description={portfolioData.nightPortraits.description} inverted />
          <ImageGrid
            images={portfolioData.nightPortraits.images}
            onOpen={(idx) => openLightboxWith(portfolioData.nightPortraits.images, idx)}
          />
        </motion.section>

        {/* ÚJ SZEKCIÓ: CSERESZNYEVIRÁG PORTRÉK */}
        <motion.section
          id="cseresznye"
          ref={cherryBlossomRef}
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* A fejléc "inverted", mert sötét háttérből jön elő */}
          <SectionHeader title={portfolioData.cherryBlossom.title} description={portfolioData.cherryBlossom.description} inverted />
          <ImageGrid
            images={portfolioData.cherryBlossom.images}
            onOpen={(idx) => openLightboxWith(portfolioData.cherryBlossom.images, idx)}
          />
        </motion.section>

        {/* ÚJ SZEKCIÓ: LEVENDULÁS CSALÁDI FOTÓZÁS */}
        <motion.section
          id="levendula"
          ref={lavenderRef} // Ref hozzárendelése
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* A fejléc "inverted", mert sötét háttérből jön */}
          <SectionHeader title={portfolioData.lavenderFamily.title} description={portfolioData.lavenderFamily.description} inverted />
          <ImageGrid
            images={portfolioData.lavenderFamily.images}
            onOpen={(idx) => openLightboxWith(portfolioData.lavenderFamily.images, idx)}
          />
        </motion.section>

        {/* ÚJ SZEKCIÓ: TÓPARTI CSALÁDI FOTÓZÁS */}
        <motion.section
          id="topart"
          ref={lakesideRef} // ÚJ: A ref hozzárendelése a szekcióhoz
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader title={portfolioData.lakesideFamily.title} description={portfolioData.lakesideFamily.description} />
          <ImageGrid
            images={portfolioData.lakesideFamily.images}
            onOpen={(idx) => openLightboxWith(portfolioData.lakesideFamily.images, idx)}
          />
        </motion.section>

        {/* ÚJ SZEKCIÓ: AUTÓPORTRÉK */}
        <motion.section
          id="autok"
          ref={carRef}
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader title={portfolioData.carPortraits.title} description={portfolioData.carPortraits.description} />
          <ImageGrid
            images={portfolioData.carPortraits.images}
            onOpen={(idx) => openLightboxWith(portfolioData.carPortraits.images, idx)}
          />
        </motion.section>

        {/* További munkák - madarak, természet */}
        <motion.section
          id="tovabbiak"
          ref={natureRef} // MÓDOSÍTOTT: Ez a ref indítja a zöld színt
          className="py-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader title={portfolioData.versatility.title} description={portfolioData.versatility.description} />
          <ImageGrid
            images={portfolioData.versatility.images}
            onOpen={(idx) => openLightboxWith(portfolioData.versatility.images, idx)}
          />
        </motion.section>
      </div>

      {/* FOOTER */}
      <footer className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-700">Köszönöm a figyelmet — készen állok, hogy a Ti történeteteket is megörökítsem.</p>
        </div>
      </footer>

      {/* --- Lightbox (yet-another-react-lightbox) --- */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        // keyboard navigation and arrows are default; the component is modern and animated.
        controller={{ closeOnBackdropClick: true }}
      />
    </main>
  )
}
