"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Images,
  Camera,
  Settings2,
  Mail,
  IdCard,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModernMobileMenu from '@/components/ModernMobileMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState({
    munkak: false,
    szolgaltatasok: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Figyeli a képernyő méretét
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Almenük megnyitása / zárása
  const toggleSubMenu = (menu) => {
    setMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const services = [
    { href: "/portre", label: "Portré fotózás" },
    { href: "/autok", label: "Autó fotózás" },
    { href: "/kutyusok", label: "Kutyus fotózás" },
    { href: "/kismama", label: "Kismama fotózás" },
    { href: "/wedding-packages", label: "Esküvői csomagok" },
    { href: "/family-sessions", label: "Családi fotózás" },
  ];

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  
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
            <ChevronDown
              size={18}
              className="transition-transform duration-300"
            />
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
        <li
          className="relative"
          onMouseEnter={() =>
            setMenuOpen({ ...menuOpen, szolgaltatasok: true })
          }
          onMouseLeave={() =>
            setMenuOpen({ ...menuOpen, szolgaltatasok: false })
          }
        >
          <button className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
            <Camera size={22} />
            <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Szolgáltatásaim
            </span>
            <ChevronDown
              size={18}
              className="transition-transform duration-300"
            />
          </button>

          <AnimatePresence>
            {menuOpen.szolgaltatasok && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-52 bg-white text-gray-900 rounded shadow-md border border-gray-300"
              >
                {/* 🔹 Dropdown menüelemek hover effekttel */}
                {[
                  { href: "/portre", label: "Portré fotózás" },
                  { href: "/autok", label: "Autó fotózás" },
                  { href: "/kutyusok", label: "Kutya fotózás" },
                  { href: "/kismama", label: "Kismama fotózás" },
                  { href: "/family-sessions", label: "Családi fotózás" },
                ].map((item, index) => (
                  <li key={index} className="group relative">
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 transition relative overflow-hidden hover:bg-gray-100"
                    >
                      {/* Bal oldali animált vonal hoverre */}
                      <span className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

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
          <Link href="/contact" legacyBehavior>
            <a className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
              <Mail size={22} />
              <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                Kapcsolat
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about" legacyBehavior>
            <a className="flex items-center space-x-2 hover:text-gray-600 transition transform hover:scale-105 relative">
              <IdCard size={22} />
              <span className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                Rólam
              </span>
            </a>
          </Link>
        </li>
      </ul>
      {/* Mobil menü (hamburger) */}
      <ModernMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </nav>
  );
};

export default Navbar;
