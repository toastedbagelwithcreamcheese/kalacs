"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronLeft, Instagram, Facebook, Flower2, ArrowRight } from "lucide-react";

// Menüpontok
const galleryItems = [
  { href: "/portre-galeria", label: "Portré Galéria" },
  { href: "/autok-galeria", label: "Autós Galéria" },
  { href: "/csaladi-galeria", label: "Családi Galéria" },
];

const services = [
  { href: "/portre", label: "Portré" },
  { href: "/autok", label: "Autók" },
  { href: "/family-sessions", label: "Családi Fotózás" },
  { href: "/kismama", label: "Kismama Fotózás" },
  { href: "/kutyusok", label: "Kutyusok" },
];

export default function ModernMobileMenu({ isOpen, setIsOpen }) {
  const [view, setView] = useState("main"); // 'main', 'munkáim', 'szolgaltatasaim'

  const handleBack = () => setView("main");

  const handleLinkClick = () => {
    setIsOpen(false);
    setTimeout(() => setView("main"), 300); 
  };

  // --- Animációk ---
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="fixed inset-0 z-[60] flex justify-end"
        >
          {/* Sötét háttér (overlay) */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Menü panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-hidden"
          >
            {/* FEJLÉC */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <span className="font-bold text-xl font-akaya text-[#5A4A42]">Menü</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* TARTALOM */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col">
              <AnimatePresence mode="wait">
                
                {/* --- FŐMENÜ NÉZET --- */}
                {view === "main" && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* SZEZONÁLIS KIEMELT GOMB (MOBILON IS!) */}
                    <Link 
                      href="/mini-fotozasok/husvet" 
                      onClick={handleLinkClick}
                      className="flex items-center justify-between p-4 bg-[#F7E7CE] rounded-xl text-[#5A4A42] font-bold shadow-sm hover:shadow-md transition-shadow mb-6 border border-[#e6d0b3]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-[#C79C8D]">
                          <Flower2 size={20} />
                        </div>
                        <span>Húsvéti Fotózás</span>
                      </div>
                      <ArrowRight size={20} />
                    </Link>

                    {/* Normál menüpontok */}
                    <Link href="/" onClick={handleLinkClick} className="block text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Kezdőlap
                    </Link>
                    
                    <button onClick={() => setView("munkáim")} className="flex items-center justify-between w-full text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Munkáim <ArrowRight size={20} className="text-gray-300" />
                    </button>

                    <button onClick={() => setView("szolgaltatasaim")} className="flex items-center justify-between w-full text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Szolgáltatásaim <ArrowRight size={20} className="text-gray-300" />
                    </button>

                    <Link href="/velemenyek" onClick={handleLinkClick} className="block text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Vélemények
                    </Link>

                    <Link href="/about" onClick={handleLinkClick} className="block text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Rólam
                    </Link>

                    <Link href="/contact" onClick={handleLinkClick} className="block text-2xl font-bold text-[#5A4A42] py-2 hover:text-[#C79C8D] transition-colors font-akaya">
                      Kapcsolat
                    </Link>

                  </motion.div>
                )}

                {/* --- MUNKÁIM ALMENÜ --- */}
                {view === "munkáim" && (
                   <motion.div key="munkáim" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                     <button onClick={handleBack} className="flex items-center text-sm font-semibold text-gray-500 mb-6 hover:text-[#C79C8D]">
                       <ChevronLeft size={16} className="mr-1"/> Vissza a menübe
                     </button>
                     <h3 className="text-xl font-bold text-[#C79C8D] mb-4 font-akaya">Galériák</h3>
                     <ul className="space-y-4">
                        {galleryItems.map(item => (
                           <li key={item.href}>
                               <Link href={item.href} onClick={handleLinkClick} className="block text-lg font-medium text-[#5A4A42] hover:text-[#C79C8D] py-1">{item.label}</Link>
                           </li>
                        ))}
                     </ul>
                   </motion.div>
                )}

                {/* --- SZOLGÁLTATÁSOK ALMENÜ --- */}
                {view === "szolgaltatasaim" && (
                   <motion.div key="szolgaltatasaim" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                     <button onClick={handleBack} className="flex items-center text-sm font-semibold text-gray-500 mb-6 hover:text-[#C79C8D]">
                       <ChevronLeft size={16} className="mr-1"/> Vissza a menübe
                     </button>
                     <h3 className="text-xl font-bold text-[#C79C8D] mb-4 font-akaya">Szolgáltatások</h3>
                     <ul className="space-y-4">
                        {/* Itt is megjeleníthetjük a szezonálist, ha akarjuk */}
                        <li>
                           <Link href="/mini-fotozasok/husvet" onClick={handleLinkClick} className="flex items-center gap-2 text-lg font-bold text-[#C79C8D] py-1">
                             <Flower2 size={18} /> Húsvéti Mini
                           </Link>
                        </li>
                        {services.map(item => (
                           <li key={item.href}>
                               <Link href={item.href} onClick={handleLinkClick} className="block text-lg font-medium text-[#5A4A42] hover:text-[#C79C8D] py-1">{item.label}</Link>
                           </li>
                        ))}
                     </ul>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* LÁBLÉC: Social Ikonok */}
            <div className="p-6 border-t border-gray-100 flex justify-center gap-6">
              <a href="https://www.facebook.com/profile.php?id=61577861518379" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook size={24}/></a>
              <a href="https://www.instagram.com/k_balintfoto/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors"><Instagram size={24}/></a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}