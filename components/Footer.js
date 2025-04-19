"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  // A többi ikont itt hagytam, hátha szükséged lesz rájuk később
  Home,
  Images,
  Camera,
  Gift,
  Mail,
  IdCard,
} from "lucide-react";

const Footer = () => {
  // Csak egy state szükséges a lenyíló menük kezeléséhez
  const [openDropdown, setOpenDropdown] = useState(null); // null, 'works', vagy 'services'

  const toggleDropdown = (menu) => {
    // Ha a már nyitott menüre kattintunk, bezárja, különben a kattintottat nyitja
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <footer className="bg-white text-black py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1. Logo szekció */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/images/logo2.png"
            alt="Kovács Bálint"
            width={400}
            height={400}
            className="rounded-full shadow-lg" // Megfontolandó kisebb méret a footerben
          />
        </div>

        {/* 2. Közösségi média */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold font-anton mb-4">
            Kövess az oldalaimon
          </h4>
          <div className="flex justify-center md:justify-start space-x-4">
            {/* Social media linkek változatlanul */}
            <Link href="https://facebook.com" target="_blank">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={32}
                height={32}
              />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Image src="/youtube.svg" alt="YouTube" width={32} height={32} />
            </Link>
            <Link href="https://tiktok.com" target="_blank">
              <Image src="/tiktok.svg" alt="TikTok" width={32} height={32} />
            </Link>
          </div>
        </div>

        {/* 3. Gyors linkek */}
        <div>
          <h4 className="text-xl font-semibold font-anton mb-4">
            Gyors linkek
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-500 transition">Kezdőlap</Link>
            </li>

            {/* MUNKÁIM Legördülő menü */}
            <li className="relative">
              <button
                className="w-full text-left text-black hover:text-gray-500 transition flex items-center justify-between"
                onClick={() => toggleDropdown("works")}
              >
                <span>Munkáim</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    openDropdown === "works" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === "works" && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    // Frissített stílusok: fehér háttér, fekete szöveg, árnyék, keret, z-index
                    className="absolute left-0 mt-1 bg-white text-black w-48 py-2 rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    {/* !! FONTOS: A href értékeket cseréld le a megfelelő útvonalakra !! */}
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/portfolio">Portfolio</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/weddings">Esküvők</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/portraits">Portrék</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/cars">Autók</Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* SZOLGÁLTATÁSAIM Legördülő menü */}
            <li className="relative">
              <button
                className="w-full text-left text-black hover:text-gray-500 transition flex items-center justify-between"
                onClick={() => toggleDropdown("services")}
              >
                <span>Szolgáltatásaim</span>
                 <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    openDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === "services" && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                     // Frissített stílusok: fehér háttér, fekete szöveg, árnyék, keret, z-index
                    className="absolute left-0 mt-1 bg-white text-black w-48 py-2 rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    {/* !! FONTOS: A href értékeket cseréld le a megfelelő útvonalakra !! */}
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/portre">Portré fotózás</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/kismama">Kismama fotózás</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/eskuvok">Esküvő fotózás</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/paros_jegyes">Páros/Jegyes fotózás</Link>
                    </li>
                     <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/autok">Autó fotózás</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition">
                      <Link href="/csaladi">Családi fotózás</Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* További linkek változatlanul */}
            <li>
              <Link href="/gift-card" className="hover:text-gray-500 transition">Ajándékutalvány fotózásra</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-500 transition">Kapcsolat</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-500 transition">Rólam</Link>
            </li>
          </ul>
        </div>

        {/* 4. Hasznos linkek */}
        <div>
          <h4 className="text-xl font-semibold font-anton mb-4">
            Hasznos linkek
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-gray-500 transition">Adatvédelmi irányelvek</Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-gray-500 transition">
                Általános szerződési feltételek
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-gray-500 transition">Gyakori kérdések</Link>
            </li>
          </ul>
        </div>
      </div>
       {/* Hozzáadhatsz egy copyright sort is ide, ha szeretnél */}
       <div className="text-center text-gray-500 mt-12 pt-8 border-t border-gray-200">
         © {new Date().getFullYear()} Kovács Bálint Fotográfia. Minden jog fenntartva.
       </div>
    </footer>
  );
};

export default Footer;