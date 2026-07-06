"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, Sparkles, Flower2, ChevronRight, X, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SERVICES_DATA } from "@/constants/services";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);

  // Kiszűrjük az esküvőt a dropdownból, mert az külön linket kap
  const serviceLinks = Object.values(SERVICES_DATA).filter(s => s.slug !== 'eskuvo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); 
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Görgetés letiltása, ha nyitva a mobil menü
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, display: "none" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      display: "block",
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.98, 
      transition: { duration: 0.2, ease: "easeIn" },
      transitionEnd: { display: "none" }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: "-100%", 
      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } 
    }
  };

  return (
    <>
      {/* JAVÍTVA: z-[60]-ra emelve. Ha nyitva a mobil menü, mindig kap hátteret */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-in-out ${
          isScrolled || mobileMenuOpen
            ? "bg-[#F9F5F1]/95 backdrop-blur-lg shadow-sm py-3 border-b border-[#5A4A42]/5" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <Link href="/" className="group flex items-center gap-3 relative shrink-0 select-none" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative w-10 h-10 transform group-hover:-rotate-6 transition-transform duration-500">
              <Image src="/images/logo2.webp" alt="Kovács Bálint Logó" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold font-akaya text-[#5A4A42] tracking-wide group-hover:text-[#C79C8D] transition-colors">
                Bálint
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C79C8D] font-bold group-hover:text-[#5A4A42] transition-colors mt-0.5">
                Fotográfia
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-[#5A4A42]">
            <li>
              <Link href="/" className="text-sm xl:text-base hover:text-[#C79C8D] transition-colors relative group">
                Kezdőlap
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C79C8D] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link href="/szolgaltatasok/eskuvo" className="text-sm xl:text-base font-bold text-[#C79C8D] hover:text-[#5A4A42] transition-colors relative group flex items-center gap-1.5">
                <Sparkles size={14} className="mb-0.5" />
                Esküvő
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C79C8D] transition-all duration-300 group-hover:bg-[#5A4A42] scale-x-50 group-hover:scale-x-100 origin-left"></span>
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-sm xl:text-base hover:text-[#C79C8D] transition-colors relative group">
                Portfólió
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C79C8D] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li 
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm xl:text-base hover:text-[#C79C8D] transition-colors py-2">
                Szolgáltatások
                <ChevronDown size={14} className={`transition-transform duration-300 ${menuOpen ? "rotate-180 text-[#C79C8D]" : ""}`}/>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full -left-4 mt-0 w-64 pt-2"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
                      {serviceLinks.map((item, idx) => (
                        <Link key={idx} href={`/szolgaltatasok/${item.slug}`} className="group/link flex items-center justify-between px-6 py-3 hover:bg-[#F9F5F1] transition-colors">
                          <span className="text-sm font-medium text-[#5A4A42] group-hover/link:text-[#C79C8D] transition-colors">
                            {item.title}
                          </span>
                          <ChevronRight size={14} className="text-[#C79C8D] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-gray-50 px-4">
                        <Link href="/velemenyek" className="block text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#C79C8D] py-2 transition-colors">
                          Ügyfélvélemények
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            
              <li>
              <Link href="/about" className="text-sm xl:text-base hover:text-[#C79C8D] transition-colors relative group">
                Rólam
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C79C8D] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
{/*
            <li>
              <Link href="/mini-fotozasok/husvet" className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C79C8D]/10 text-[#C79C8D] rounded-full text-xs xl:text-sm font-bold hover:bg-[#C79C8D] hover:text-white transition-colors">
                <Flower2 size={14} /> Húsvéti Mini
              </Link>
            </li>
  */}
            <li className="ml-4">
              <Link href="/contact" className="btn-glass text-white px-6 py-2.5 rounded-full font-bold text-sm inline-block">
                Kapcsolat
              </Link>
            </li>
          </ul>

          {/* JAVÍTVA: X gomb, ha nyitva van a menü */}
          <button
            className={`lg:hidden relative p-2 rounded-full transition-colors ${
              mobileMenuOpen ? "text-white btn-glass" : "text-[#5A4A42] hover:text-[#C79C8D]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü megnyitása"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* JAVÍTVA: Mobil menü z-[50], hogy a Navbar z-[60] felette maradjon */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[50] bg-[#F9F5F1] flex flex-col justify-center px-8 pt-24 pb-10 overflow-y-auto"
          >
            <ul className="flex flex-col gap-6 text-[#5A4A42]">
              
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya hover:text-[#C79C8D] transition-colors">
                  Kezdőlap
                </Link>
              </motion.li>

              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/szolgaltatasok/eskuvo" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya text-[#C79C8D] hover:text-[#5A4A42] transition-colors flex items-center gap-3">
                  Esküvő <Sparkles size={24} />
                </Link>
              </motion.li>

              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="text-4xl font-akaya flex items-center gap-3 hover:text-[#C79C8D] transition-colors"
                >
                  Szolgáltatások 
                  <ChevronDown size={24} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-[#C79C8D]" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 pl-4 flex flex-col gap-4 border-l-2 border-[#C79C8D]/30"
                    >
                      {serviceLinks.map((item, idx) => (
                        <Link 
                          key={idx} 
                          href={`/szolgaltatasok/${item.slug}`} 
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xl font-medium text-[#5A4A42]/80 hover:text-[#C79C8D]"
                        >
                          {item.title}
                        </Link>
                      ))}
                      <Link href="/velemenyek" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest text-[#C79C8D] mt-2">
                        Vélemények
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya hover:text-[#C79C8D] transition-colors">
                  Portfólió
                </Link>
                </motion.li>
                

              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya hover:text-[#C79C8D] transition-colors">
                  Kapcsolat
                </Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya hover:text-[#C79C8D] transition-colors">
                  Rólam
                </Link>
              </motion.li>
{/*
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Link href="/mini-fotozasok/husvet" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-akaya hover:text-[#C79C8D] transition-colors flex items-center gap-3">
                  Húsvéti Mini <Flower2 size={24} />
                </Link>
              </motion.li>
                  */}
            </ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="mt-auto pt-12"
            >
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-glass block w-full text-center text-white py-4 rounded-full font-bold text-xl mb-8"
              >
                Kapcsolatfelvétel
              </Link>

              <div className="flex justify-center gap-6">
                 <a href="https://www.instagram.com/k_balintfoto/" target="_blank" rel="noopener noreferrer" className="text-[#5A4A42] hover:text-[#C79C8D] transition-colors"><Instagram size={28} /></a>
                 <a href="https://www.facebook.com/profile.php?id=61577861518379" target="_blank" rel="noopener noreferrer" className="text-[#5A4A42] hover:text-[#C79C8D] transition-colors"><Facebook size={28} /></a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}