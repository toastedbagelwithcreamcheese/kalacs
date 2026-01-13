"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Images,
  Camera,
  Settings2,
  Mail,
  IdCard,
  Menu,
  Flower2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Fontos: Image importálása
import ModernMobileMenu from '@/components/ModernMobileMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState({ munkak: false, szolgaltatasok: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, display: "none" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      display: "block",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95, 
      transition: { duration: 0.15, ease: "easeIn" },
      transitionEnd: { display: "none" }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- LOGÓ SZEKCIÓ --- */}
          <Link href="/" className="group flex items-center gap-2 relative z-50 shrink-0 select-none">
            {/* Ikon rész - KÉP */}
            <div className="relative w-10 h-10 transform group-hover:rotate-6 transition-transform duration-300">
              <Image
                src="/images/logo2.png"
                alt="Kovács Bálint Logó"
                fill
                className="object-contain"
                priority // Mivel ez a navbarban van, fontos, hogy azonnal betöltődjön
              />
            </div>
            
            {/* Szöveg rész */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold font-akaya text-[#5A4A42] tracking-wide group-hover:text-[#C79C8D] transition-colors">
                Bálint
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C79C8D] font-medium group-hover:text-[#5A4A42] transition-colors">
                Portfolio
              </span>
            </div>
          </Link>
          {/* -------------------- */}

          {/* ASZTALI MENÜ */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-6 font-medium text-gray-700">
            
            <li>
              <Link href="/" className="px-3 py-2 hover:text-[#C79C8D] transition-colors flex items-center gap-1 text-sm xl:text-base">
                <Home size={18} /> Kezdőlap
              </Link>
            </li>

            {/* MUNKÁIM DROPDOWN */}
            <li 
              className="relative group"
              onMouseEnter={() => setMenuOpen(prev => ({ ...prev, munkak: true }))}
              onMouseLeave={() => setMenuOpen(prev => ({ ...prev, munkak: false }))}
            >
              <button className="px-3 py-2 flex items-center gap-1 hover:text-[#C79C8D] transition-colors text-sm xl:text-base">
                <Images size={18} /> Galériák <ChevronDown size={16} className={`transition-transform duration-300 ${menuOpen.munkak ? "rotate-180" : ""}`}/>
              </button>
              
              <AnimatePresence>
                {menuOpen.munkak && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-0 w-56 pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {[
                        { href: "/portre-galeria", label: "Portrék" },
                        { href: "/autok-galeria", label: "Autók" },
                        { href: "/csaladi-galeria", label: "Család & Kismama" },
                      ].map((item, idx) => (
                        <Link key={idx} href={item.href} className="block px-6 py-3 hover:bg-[#F9F5F1] hover:text-[#C79C8D] transition-colors text-sm">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* SZOLGÁLTATÁSOK DROPDOWN */}
            <li 
              className="relative group"
              onMouseEnter={() => setMenuOpen(prev => ({ ...prev, szolgaltatasok: true }))}
              onMouseLeave={() => setMenuOpen(prev => ({ ...prev, szolgaltatasok: false }))}
            >
              <button className="px-3 py-2 flex items-center gap-1 hover:text-[#C79C8D] transition-colors text-sm xl:text-base">
                <Camera size={18} /> Szolgáltatások <ChevronDown size={16} className={`transition-transform duration-300 ${menuOpen.szolgaltatasok ? "rotate-180" : ""}`}/>
              </button>

              <AnimatePresence>
                {menuOpen.szolgaltatasok && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full -left-10 mt-0 w-[320px] pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      
                      {/* SZEZONÁLIS KIEMELT DOBOZ */}
                      <div className="bg-[#F7E7CE] p-4 border-b border-[#e6d0b3]">
                        <p className="text-xs font-bold text-[#C79C8D] uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Sparkles size={12} /> Aktuális Ajánlat
                        </p>
                        <Link href="/mini-fotozasok/husvet" className="flex items-center gap-3 group/mini">
                          <div className="bg-white p-2 rounded-full text-[#C79C8D] group-hover/mini:scale-110 transition-transform">
                            <Flower2 size={20} />
                          </div>
                          <div>
                            <span className="block font-bold text-[#5A4A42]">Húsvéti Mini Fotózás</span>
                            <span className="text-xs text-[#5A4A42]/80">Foglalj időpontot most!</span>
                          </div>
                        </Link>
                      </div>

                      {/* TÖBBI SZOLGÁLTATÁS */}
                      <div className="p-2">
                        {[
                          { href: "/portre", label: "Portré Fotózás" },
                          { href: "/autok", label: "Autó Fotózás" },
                          { href: "/family-sessions", label: "Családi Fotózás" },
                          { href: "/kismama", label: "Kismama Fotózás" },
                          { href: "/kutyusok", label: "Kutyusok" },
                        ].map((item, idx) => (
                          <Link key={idx} href={item.href} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#F9F5F1] hover:text-[#C79C8D] transition-colors text-sm font-medium">
                            {item.label}
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* SZEZONÁLIS DIREKT LINK */}
            <li>
              <Link 
                href="/mini-fotozasok/husvet" 
                className="flex items-center gap-2 px-4 py-2 bg-[#F7E7CE] text-[#5A4A42] rounded-full font-bold text-sm hover:bg-[#e6d0b3] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Flower2 size={18} className="text-[#C79C8D]" /> 
                <span>Húsvéti Fotózás</span>
              </Link>
            </li>

            <li>
              <Link href="/velemenyek" className="px-3 py-2 hover:text-[#C79C8D] transition-colors flex items-center gap-1 text-sm xl:text-base">
                <Settings2 size={18} /> Vélemények
              </Link>
            </li>
            
            <li>
              <Link href="/about" className="px-3 py-2 hover:text-[#C79C8D] transition-colors flex items-center gap-1 text-sm xl:text-base">
                <IdCard size={18} /> Rólam
              </Link>
            </li>

            {/* CTA GOMB */}
            <li className="ml-2">
              <Link href="/contact" className="bg-[#5A4A42] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#4a3c35] transition-transform hover:scale-105 shadow-md flex items-center gap-2">
                <Mail size={16} /> Kapcsolat
              </Link>
            </li>

          </ul>

          {/* MOBIL MENÜ GOMB */}
          <button
            className="lg:hidden text-[#5A4A42] hover:text-[#C79C8D] transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menü megnyitása"
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* MOBIL MENÜ KOMPONENS */}
      <ModernMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}