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
  X,
  Snowflake,
  Flower2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModernMobileMenu from '@/components/ModernMobileMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState({
    munkak: false,
    szolgaltatasok: false,
  });
  const [miniMenuOpen, setMiniMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Figyeli a képernyő méretét
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className="bg-white text-gray-900 py-6 px-6 shadow-md fixed top-0 w-full z-50">
      {/* Mobilmenü ikon */}
      <button
        className="lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className="hidden lg:flex justify-center space-x-8 font-semibold">
        {/* Kezdőlap */}
        <li>
          <Link
            href="/"
            className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative"
          >
            <Home size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Kezdőlap
            </span>
          </Link>
        </li>

        {/* Munkáim Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setMenuOpen({ ...menuOpen, munkak: true })}
          onMouseLeave={() => setMenuOpen({ ...menuOpen, munkak: false })}
        >
          <button className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
            <Images size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Munkáim
            </span>
            <ChevronDown size={18} className={`transition-transform duration-300 ${menuOpen.munkak ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {menuOpen.munkak && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-48 bg-white text-gray-900 rounded shadow-md border border-gray-300"
              >
                {[
                  { href: "/portre-galeria", label: "Portré galéria" },
                  { href: "/autok-galeria", label: "Autók galéria" },
                  { href: "/csaladi-galeria", label: "Családi galéria" },
                  { href: "/kismama-galeria", label: "Kismama galéria" },
                ].map((item, index) => (
                  <li key={index} className="group relative">
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 transition relative overflow-hidden hover:bg-gray-100"
                    >
                      <span className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Szolgáltatások Dropdown */}
        <li
  className="relative"
  onMouseEnter={() => setMenuOpen(prev => ({ ...prev, szolgaltatasok: true }))}
  onMouseLeave={() => {
    setMenuOpen(prev => ({ ...prev, szolgaltatasok: false }));
    setMiniMenuOpen(false);
  }}
>
  <button className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 ">
    <Camera size={22} />
    <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
      Szolgáltatásaim
    </span>
    <ChevronDown size={18} className={`transition-transform duration-300 ${menuOpen.szolgaltatasok ? 'rotate-180' : ''}`} />
  </button>

  <AnimatePresence>
    {menuOpen.szolgaltatasok && (
      <motion.ul
        initial={{ opacity: 0, y: 5 }} // Kisebb elmozdulás a stabilitásért
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        // Fontos: a menü teteje érjen hozzá a szülőhöz (top-full), 
        // a pt-2 pedig biztosítja a vizuális távolságot a tartalomnak
        className="absolute left-0 top-full pt-2 w-56 z-[60]" 
      >
        <div className="bg-white rounded shadow-xl border border-gray-300 overflow-visible">
          {[
            { href: "/portre", label: "Portré fotózás" },
            { href: "/autok", label: "Autó fotózás" },
            { href: "/kutyusok", label: "Kutya fotózás" },
            { href: "/kismama", label: "Kismama fotózás" },
            { href: "/family-sessions", label: "Családi fotózás" },
            { 
              label: "Mini fotózások", 
              hasSub: true,
              subItems: [
                { href: "/mini-fotozasok/karacsony", label: "Karácsonyi", icon: <Snowflake size={14} className="text-blue-400" /> },
                { href: "/mini-fotozasok/husvet", label: "Húsvéti", icon: <Flower2 size={14} className="text-pink-400" /> }
              ]
            },
          ].map((item, index) => (
            <li 
              key={index} 
              className="group relative"
              onMouseEnter={() => item.hasSub && setMiniMenuOpen(true)}
              onMouseLeave={() => item.hasSub && setMiniMenuOpen(false)}
            >
              {item.hasSub ? (
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 transition relative">
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="ml-2">{item.label}</span>
                  <ChevronRight size={16} className="ml-auto" />
                  
                  {/* ALMENÜ - szintén top-0 és egy kis bal oldali padding a hídhoz */}
                  <AnimatePresence>
                    {miniMenuOpen && (
                      <motion.ul
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="absolute left-full top-0 pl-1 w-48 z-[70]"
                      >
                        <div className="bg-white rounded shadow-lg border border-gray-300 py-1">
                          {item.subItems.map((sub, sIndex) => (
                            <li key={sIndex}>
                              <Link
                                href={sub.href}
                                className="flex items-center px-4 py-3 hover:bg-gray-50 transition"
                              >
                                {sub.icon}
                                <span className="ml-2 text-sm">{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 transition relative hover:bg-gray-100"
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="ml-2">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </div>
      </motion.ul>
    )}
  </AnimatePresence>
</li>

        {/* További menüpontok */}
        <li>
          <Link
            href="/velemenyek"
            className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative"
          >
            <Settings2 size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Vélemények
            </span>
          </Link>
        </li> 

        <li>
          <Link href="/contact" className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
            <Mail size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Kapcsolat
            </span>
          </Link>
        </li>

        <li>
          <Link href="/about" className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
            <IdCard size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Rólam
            </span>
          </Link>
        </li>
      </ul>

      {/* Mobil menü */}
      <ModernMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </nav>
  );
};

export default Navbar;