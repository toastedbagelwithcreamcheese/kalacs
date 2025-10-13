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
      '/images/portfolio/offroad/_MG_8379.JPG',
      '/images/portfolio/offroad/_MG_8214.JPG',
      '/images/portfolio/offroad/_MG_8143.JPG',
      '/images/portfolio/offroad/_MG_8138.JPG',
      '/images/portfolio/offroad/_MG_7882.JPG',
      '/images/portfolio/offroad/_MG_7812.JPG',
      '/images/portfolio/offroad/_MG_7671.JPG',

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
    '/images/portfolio/termeszet/taj11.JPG',
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

// --- Color helpers ---
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
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

// --- UI Components ---
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
        >
          <Image
            src={src}
            alt={`Portfolio kép ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={80}
          />
        </motion.button>
      ))}
    </div>
  )
}

// --- MAIN PAGE ---
export default function PortfolioPage() {
  const [bgTop, setBgTop] = useState('#faf9f7')
  const [bgBottom, setBgBottom] = useState('#e5e7eb')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSlides, setLightboxSlides] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nightRef = useRef(null)
  const carRef = useRef(null)
  const cherryRef = useRef(null)
  const lavenderRef = useRef(null)
  const lakesideRef = useRef(null)
  const natureRef = useRef(null)

  const openLightboxWith = useCallback((images, idx) => {
    setLightboxSlides(images.map((s) => ({ src: s })))
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }, [])

  // --- ✅ Optimalizált scroll handler ---
    useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateBackground()
          ticking = false
        })
        ticking = true
      }
    }

    const updateBackground = () => {
      const winH = window.innerHeight
      const rects = {
        night: nightRef.current?.getBoundingClientRect(),
        car: carRef.current?.getBoundingClientRect(),
        cherry: cherryRef.current?.getBoundingClientRect(),
        lavender: lavenderRef.current?.getBoundingClientRect(),
        lake: lakesideRef.current?.getBoundingClientRect(),
        nature: natureRef.current?.getBoundingClientRect(),
      }

      const getProgress = (rect) => {
        if (!rect) return 0
        const tRaw = (winH * 0.9 - rect.top) / (winH * 0.75)
        return Math.min(1, Math.max(0, tRaw))
      }

      const progresses = Object.fromEntries(
        Object.entries(rects).map(([key, rect]) => [key, getProgress(rect)])
      )

      // --- Színpaletta ---
      const colors = {
        offwhite: '#faf9f7',
        gray: '#d1d5db',
        black: '#111111',
        pink: '#fecdd3',
        lavender: '#d8cbed',
        warm: '#f3eade',
        green: '#c7d1b8',
      }

      // --- Alap színek ---
      let top = colors.offwhite
      let bottom = colors.gray

      // --- Színt váltunk az alapján, melyik progress a legnagyobb ---
      const maxKey = Object.keys(progresses).reduce((a, b) =>
        progresses[a] > progresses[b] ? a : b
      )

      switch (maxKey) {
        case 'night':
          top = lerpHex(colors.offwhite, colors.black, progresses.night)
          bottom = lerpHex(colors.gray, colors.black, progresses.night)
          break
        case 'car':
          top = lerpHex(colors.offwhite, colors.gray, progresses.car)
          bottom = lerpHex(colors.offwhite, colors.gray, progresses.car)
          break
        case 'cherry':
          top = lerpHex(colors.black, colors.pink, progresses.cherry)
          bottom = lerpHex(colors.black, colors.pink, progresses.cherry)
          break
        case 'lavender':
          top = lerpHex(colors.pink, colors.lavender, progresses.lavender)
          bottom = lerpHex(colors.pink, colors.lavender, progresses.lavender)
          break
        case 'lake':
          top = lerpHex(colors.lavender, colors.warm, progresses.lake)
          bottom = lerpHex(colors.lavender, colors.warm, progresses.lake)
          break
        case 'nature':
          top = lerpHex(colors.warm, colors.green, progresses.nature)
          bottom = lerpHex(colors.warm, colors.green, progresses.nature)
          break
      }

      setBgTop(top)
      setBgBottom(bottom)
    }

    updateBackground()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const bgStyle = { background: `linear-gradient(180deg, ${bgTop}, ${bgBottom})`, transition: 'background 0.1s ease' }
  const bgGradient = `linear-gradient(180deg, ${bgTop}, ${bgBottom})`


  return (
    <motion.main
    animate={{ background: bgGradient }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    className={`${inter.className} min-h-screen transition-colors duration-500`}
    style={{
      background: bgGradient,
      willChange: 'background',
    }}
  >
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-24">
      <SectionHeader title={portfolioData.offroadEvents.title} description={portfolioData.offroadEvents.description} />
      <ImageGrid
        images={portfolioData.offroadEvents.images}
        onOpen={(idx) => openLightboxWith(portfolioData.offroadEvents.images, idx)}
      />

      <section ref={nightRef}>
        <SectionHeader title={portfolioData.nightPortraits.title} description={portfolioData.nightPortraits.description} inverted />
        <ImageGrid
          images={portfolioData.nightPortraits.images}
          onOpen={(idx) => openLightboxWith(portfolioData.nightPortraits.images, idx)}
        />
      </section>

      <section ref={carRef}>
        <SectionHeader title={portfolioData.carPortraits.title} description={portfolioData.carPortraits.description} />
        <ImageGrid
          images={portfolioData.carPortraits.images}
          onOpen={(idx) => openLightboxWith(portfolioData.carPortraits.images, idx)}
        />
      </section>

      <section ref={cherryRef}>
        <SectionHeader title={portfolioData.cherryBlossom.title} description={portfolioData.cherryBlossom.description} inverted />
        <ImageGrid
          images={portfolioData.cherryBlossom.images}
          onOpen={(idx) => openLightboxWith(portfolioData.cherryBlossom.images, idx)}
        />
      </section>

      <section ref={lavenderRef}>
        <SectionHeader title={portfolioData.lavenderFamily.title} description={portfolioData.lavenderFamily.description} inverted />
        <ImageGrid
          images={portfolioData.lavenderFamily.images}
          onOpen={(idx) => openLightboxWith(portfolioData.lavenderFamily.images, idx)}
        />
      </section>

      <section ref={lakesideRef}>
        <SectionHeader title={portfolioData.lakesideFamily.title} description={portfolioData.lakesideFamily.description} />
        <ImageGrid
          images={portfolioData.lakesideFamily.images}
          onOpen={(idx) => openLightboxWith(portfolioData.lakesideFamily.images, idx)}
        />
      </section>

      <section ref={natureRef}>
        <SectionHeader title={portfolioData.versatility.title} description={portfolioData.versatility.description} />
        <ImageGrid
          images={portfolioData.versatility.images}
          onOpen={(idx) => openLightboxWith(portfolioData.versatility.images, idx)}
        />
      </section>
    </div>

    <footer className="py-12">
      <div className="max-w-6xl mx-auto px-6 text-center"></div>
    </footer>

    <Lightbox
      open={lightboxOpen}
      close={() => setLightboxOpen(false)}
      slides={lightboxSlides}
      index={lightboxIndex}
      controller={{ closeOnBackdropClick: true }}
    />
  </motion.main>
  )
}
