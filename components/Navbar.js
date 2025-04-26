"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Images,
  Camera,
  Gift,
  Mail,
  IdCard,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// 1. Közös menüstruktúra definiálása
const menuItems = [
  { label: "Kezdőlap", href: "/", icon: Home },
  {
    label: "Munkáim",
    icon: Images,
    children: [
      { href: "/portfolio", label: "Portfólió" },
      { href: "/wedding", label: "Esküvők" },
      { href: "/portraits", label: "Portrék" },
      { href: "/autokfoto", label: "Autók" },
    ],
  },
  {
    label: "Szolgáltatásaim",
    icon: Camera,
    children: [
      { href: "/portre", label: "Portré fotózás" },
      { href: "/kismama", label: "Kismama fotózás" },
      { href: "/wedding-packages", label: "Esküvői csomagok" },
      { href: "/family-sessions", label: "Családi fotózás" },
      { href: "/paros_jegyes", label: "Páros/jegyes fotózás" },
      { href: "/autok", label: "Autó fotózás" },
    ],
  },
  { label: "Ajándékutalvány", href: "/gift-card", icon: Gift },
  { label: "Kapcsolat", href: "/contact", icon: Mail },
  { label: "Rólam", href: "/about", icon: IdCard },
];

const Navbar = () => {
  const [desktopSubMenuOpen, setDesktopSubMenuOpen] = useState({}); // State a desktop almenükhöz (hover)
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({}); // State a mobil almenükhöz (kattintás)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Nincs szükség az isMobile state-re, mert a Tailwind lg: prefixével kezeljük a nézeteket

  // --- Desktop Almenü Kezelés ---
  const handleMouseEnter = (label) => {
    setDesktopSubMenuOpen((prev) => ({ ...prev, [label]: true }));
  };

  const handleMouseLeave = (label) => {
    setDesktopSubMenuOpen((prev) => ({ ...prev, [label]: false }));
  };

  // --- Mobil Almenü Kezelés ---
  const toggleMobileSubMenu = (label) => {
    setMobileSubMenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // --- Mobil Menü Zárása Navigációkor ---
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileSubMenuOpen({}); // Zárd be az almenüket is, ha a főmenüt bezárják
  };

  // --- Dinamikus Menüelem Renderelés ---
  const renderMenuItem = (item, index, isMobileView = false) => {
    const IconComponent = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isSubMenuOpen = isMobileView
      ? mobileSubMenuOpen[item.label]
      : desktopSubMenuOpen[item.label];

    // Kattintás kezelő linkekhez (mobil nézetben bezárja a menüt)
    const linkClickHandler = isMobileView ? closeMobileMenu : undefined;

    if (hasChildren) {
      return (
        <li
          key={index}
          className="relative"
          onMouseEnter={
            !isMobileView ? () => handleMouseEnter(item.label) : undefined
          }
          onMouseLeave={
            !isMobileView ? () => handleMouseLeave(item.label) : undefined
          }
        >
          {/* Gomb az almenü nyitásához/zárásához */}
          <button
            onClick={
              isMobileView ? () => toggleMobileSubMenu(item.label) : undefined
            }
            className={`flex items-center w-full space-x-2 font-semibold transition transform hover:scale-105 relative ${
              isMobileView ? "py-3 px-4 justify-between" : "hover:text-gray-600"
            }`}
            aria-expanded={isSubMenuOpen}
            aria-controls={`submenu-${item.label
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <span className="flex items-center space-x-2">
              {IconComponent && <IconComponent size={22} />}
              <span
                className={
                  !isMobileView
                    ? "relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                    : ""
                }
              >
                {item.label}
              </span>
            </span>
            {/* Nyíl ikon */}
            <span className="transition-transform duration-300">
              {isMobileView ? (
                isSubMenuOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </button>

          {/* Almenü */}
          <AnimatePresence>
            {isSubMenuOpen && (
              <motion.ul
                id={`submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, height: 0, y: isMobileView ? 0 : -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: isMobileView ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className={`bg-white text-gray-900 ${
                  isMobileView
                    ? "pl-6 static shadow-none border-none"
                    : "absolute left-0 mt-2 w-52 rounded shadow-md border border-gray-300"
                }`}
              >
                {item.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className={`group relative ${
                      isMobileView ? "border-l border-gray-200" : ""
                    }`}
                  >
                    <Link
                      href={child.href}
                      onClick={linkClickHandler} // Mobil nézetben bezárja a menüt
                      className={`flex items-center px-4 py-2 transition relative overflow-hidden hover:bg-gray-100 ${
                        isMobileView ? "text-base" : ""
                      }`}
                    >
                      {!isMobileView && (
                        <span className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                      )}
                      <span className={`${!isMobileView ? "ml-2" : "ml-3"}`}>
                        {child.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      );
    } else {
      // Egyszerű menüelem (nincs almenü)
      return (
        <li key={index}>
          <Link
            href={item.href}
            onClick={linkClickHandler} // Mobil nézetben bezárja a menüt
            className={`flex items-center space-x-2 font-semibold transition transform hover:scale-105 relative ${
              isMobileView ? "py-3 px-4" : "hover:text-gray-600"
            }`}
          >
            {IconComponent && <IconComponent size={22} />}
            <span
              className={
                !isMobileView
                  ? "relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  : ""
              }
            >
              {item.label}
            </span>
          </Link>
        </li>
      );
    }
  };

  return (
    <nav className="bg-white text-gray-900 py-4 px-6 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo vagy Brand név helye (opcionális) */}
        <div className="text-xl font-bold">
          <Image
            src="/images/logo2.png"
            width={40} // Adj meg egy konkrét szélességet pixelben
            height={40} // Adj meg egy konkrét magasságot pixelben
            alt="Cég Logó" // Fontos az akadálymentesség miatt!
          />
        </div>

        {/* Desktop menü */}
        <ul className="hidden lg:flex justify-center items-center space-x-6">
          {menuItems.map((item, index) => renderMenuItem(item, index, false))}
        </ul>

        {/* Mobil menü ikon (Hamburger/X) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü megnyitása/bezárása"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobil menü (Slide-in panel) */}
     {/* Mobil menü (Slide-in panel - MOST TELJES KÉPERNYŐS) */}
     <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            // Választhatsz animációt, pl. fade-in vagy slide-in
            // Slide-in balról (az eredetihez hasonló, de most teljes szélességben):
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            // Vagy egy egyszerű fade-in:
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // A className-ből eltávolítjuk a max-w-xs-t és finomítjuk a többit:
            className="lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto flex flex-col" // Teljes képernyős, flex konténer
          >
            {/* Bezáró gomb a mobil menüben (marad a jobb felső sarokban) */}
             <div className="w-full flex justify-end p-4 pt-6"> {/* Biztosítja, hogy a gomb a konténer szélén legyen */}
                <button onClick={closeMobileMenu} aria-label="Menü bezárása">
                    <X size={28} className="text-gray-900" /> {/* Szín explicit beállítása, ha kell */}
                </button>
             </div>

            {/* Mobil menü lista (középre igazítva vagy balra, ahogy szeretnéd) */}
            {/* Példa: Lista középre igazítva, némi paddinggel */}
            <div className="flex-grow flex flex-col items-center justify-center px-4 pb-6"> {/* items-center és justify-center a középre igazításhoz */}
                <ul className="flex flex-col space-y-4 text-center w-full max-w-md"> {/* space-y növelve, text-center */}
                   {menuItems.map((item, index) => renderMenuItem(item, index, true))}
                </ul>
            </div>
             {/* Vagy ha balra igazított listát szeretnél, mint a side-drawerben volt:
             <div className="px-4 pb-6 pt-8"> // Pl. felső padding
                 <ul className="flex flex-col space-y-1">
                   {menuItems.map((item, index) => renderMenuItem(item, index, true))}
                 </ul>
             </div>
             */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Háttér overlay mobil menü nyitva állapotában (ez maradhat) */}
       <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" // A menü mögött, de a tartalom felett
                    onClick={closeMobileMenu} // Kattintásra bezárja a menüt
                />
            )}
        </AnimatePresence>
    </nav>
  );
};

export default Navbar;
