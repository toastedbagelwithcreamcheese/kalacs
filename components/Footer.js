"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // VÁLTOZÁS: Sötétebb háttérszín (#261F1D) a kontrasztért + felső elválasztó vonal
    <footer className="bg-[#261F1D] text-white pt-20 pb-10 border-t border-[#C79C8D]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* 1. Brand & Bemutatkozás */}
        <div className="space-y-6">
           <Link href="/" className="text-3xl font-bold font-akaya text-white tracking-wide block">
            Kovács Bálint<span className="text-[#C79C8D]">.Fotó</span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm">
            Őszinte pillanatok, természetes fények, maradandó emlékek. 
            Zalaegerszeg és környéke.
          </p>
          
          {/* Social Ikonok */}
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61577861518379" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/5 p-3 rounded-full hover:bg-[#C79C8D] hover:scale-110 transition-all text-gray-300 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/k_balintfoto/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/5 p-3 rounded-full hover:bg-[#C79C8D] hover:scale-110 transition-all text-gray-300 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            {/* E-mail gomb */}
            <a 
              href="/contact" 
              className="bg-white/5 p-3 rounded-full hover:bg-[#C79C8D] hover:scale-110 transition-all text-gray-300 hover:text-white"
              aria-label="Kapcsolat"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* 2. Galériák */}
        <div>
          <h4 className="text-xl font-bold font-akaya text-[#C79C8D] mb-6 flex items-center gap-2">
            Galériák
          </h4>
          <ul className="space-y-3">
            <li><Link href="/portre-galeria" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Portrék</Link></li>
            <li><Link href="/csaladi-galeria" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Család & Kismama</Link></li>
            <li><Link href="/autok-galeria" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Autók</Link></li>
          </ul>
        </div>

        {/* 3. Szolgáltatások */}
        <div>
          <h4 className="text-xl font-bold font-akaya text-[#C79C8D] mb-6">Szolgáltatások</h4>
          <ul className="space-y-3">
             <li><Link href="/portre" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Portré Fotózás</Link></li>
             <li><Link href="/family-sessions" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Családi Fotózás</Link></li>
             <li><Link href="/kismama" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Kismama Fotózás</Link></li>
             <li><Link href="/autok" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Autó Fotózás</Link></li>
             <li><Link href="/kutyusok" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Kutyusok</Link></li>
             {/* Kiemelt szezonális link */}
             <li><Link href="/mini-fotozasok/husvet" className="text-[#F7E7CE] hover:text-white hover:translate-x-1 transition-all font-bold inline-block">🐰 Húsvéti Mini</Link></li>
          </ul>
        </div>

        {/* 4. Információk & Jogi */}
        <div>
          <h4 className="text-xl font-bold font-akaya text-[#C79C8D] mb-6">Információk</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Rólam</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Kapcsolat</Link></li>
            <li><Link href="/velemenyek" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Vélemények</Link></li>
            <li><Link href="/faq" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Gyakori Kérdések</Link></li>
            
            <li className="pt-4 border-t border-white/5 mt-4">
                <Link href="/adatvedelem" className="text-gray-500 text-sm hover:text-white transition-colors block mb-2">Adatkezelési Tájékoztató</Link>
                <Link href="/aszf" className="text-gray-500 text-sm hover:text-white transition-colors block">ÁSZF</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Sáv */}
      <div className="border-t border-white/5 pt-8 text-center">
        <p className="text-gray-500 text-sm mb-2">
          &copy; {currentYear} Kovács Bálint Fotográfia. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}