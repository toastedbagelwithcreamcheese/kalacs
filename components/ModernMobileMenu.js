"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronLeft,  Instagram, Facebook } from "lucide-react";

// Töltsd fel a szolgáltatásaid és galériáid listájával
const galleryItems = [
  { href: "/portre-galeria", label: "Portré Galéria" },
  { href: "/autok-galeria", label: "Autós Galéria" },
];

const services = [
  { href: "/kismama", label: "Kismama Fotózás" },
  { href: "/family-sessions", label: "Családi Fotózás" },
  { href: "/paros_jegyes", label: "Páros & Jegyes" },
  { href: "/portre", label: "Portré" },
  { href: "/autok", label: "Autók" },
  { href: "/kutyusok", label: "Kutyusok" },
];

export default function ModernMobileMenu({ isOpen, setIsOpen }) {
  const [view, setView] = useState("main"); // 'main', 'munkáim', 'szolgaltatasaim'

  // Visszalépés a főmenübe és a dropdown bezárása
  const handleBack = () => {
    setView("main");
  };

  // Linkre kattintáskor bezárja a teljes menüt
  const handleLinkClick = () => {
    setIsOpen(false);
    // Kis késleltetés, hogy a bezárás animáció után váltson vissza a nézet
    setTimeout(() => {
      setView("main");
    }, 300); 
  };

  // Animációs variánsok
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.08, // A menüpontok lépcsőzetes megjelenése
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren", // Előbb a gyerekek tűnnek el
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, y: -20 },
  };

  const subMenuVariants = {
    enter: { opacity: 0, x: '100%' },
    center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: '-100%', transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-slate-900 text-gray-200 flex flex-col p-6 z-50"
        >
          {/* Felső sáv: Logó (opcionális) és Bezárás gomb */}
          <div className="flex justify-between items-center mb-10">
            <Link href="/" onClick={handleLinkClick}>
              <span className="font-bold text-lg">Kovács Bálint Fotó</span>
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Menü bezárása">
              <X size={32} className="text-gray-400 hover:text-white transition-colors" />
            </button>
          </div>

          {/* Menü nézetek konténere */}
          <div className="relative flex-grow flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {view === "main" && (
                <motion.ul
                  key="main"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-3xl font-semibold w-full"
                  style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}
                >
                  <motion.li variants={menuItemVariants}>
                    <Link href="/" onClick={handleLinkClick} className="hover:text-[#C79C8D] transition-colors">Kezdőlap</Link>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <button onClick={() => setView("munkáim")} className="hover:text-[#C79C8D] transition-colors w-full text-center">Munkáim</button>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <button onClick={() => setView("szolgaltatasaim")} className="hover:text-[#C79C8D] transition-colors w-full text-center">Szolgáltatásaim</button>
                  </motion.li>
                   <motion.li variants={menuItemVariants}>
                    <Link href="/about" onClick={handleLinkClick} className="hover:text-[#C79C8D] transition-colors">Rólam</Link>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <Link href="/contact" onClick={handleLinkClick} className="hover:text-[#C79C8D] transition-colors">Kapcsolat</Link>
                  </motion.li>
                </motion.ul>
              )}

              {view === "munkáim" && (
                 <motion.div key="munkáim" variants={subMenuVariants} initial="enter" animate="center" exit="exit" className="absolute w-full">
                   <button onClick={handleBack} className="flex items-center text-lg font-semibold mb-8 text-gray-400 hover:text-white transition-colors">
                     <ChevronLeft size={24} className="mr-2"/> Vissza
                   </button>
                   <ul className="space-y-4 text-2xl font-medium">
                      {galleryItems.map(item => (
                         <li key={item.href}>
                             <Link href={item.href} onClick={handleLinkClick} className="hover:text-[#C79C8D] transition-colors">{item.label}</Link>
                         </li>
                      ))}
                   </ul>
                 </motion.div>
              )}

              {view === "szolgaltatasaim" && (
                 <motion.div key="szolgaltatasaim" variants={subMenuVariants} initial="enter" animate="center" exit="exit" className="absolute w-full">
                   <button onClick={handleBack} className="flex items-center text-lg font-semibold mb-8 text-gray-400 hover:text-white transition-colors">
                     <ChevronLeft size={24} className="mr-2"/> Vissza
                   </button>
                   <ul className="space-y-4 text-2xl font-medium">
                      {services.map(item => (
                         <li key={item.href}>
                             <Link href={item.href} onClick={handleLinkClick} className="hover:text-[#C79C8D] transition-colors">{item.label}</Link>
                         </li>
                      ))}
                   </ul>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Alsó sáv: Social media linkek (opcionális) */}
          <div className="flex justify-center space-x-6 text-gray-500 mt-10">
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20}/></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20}/></a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}