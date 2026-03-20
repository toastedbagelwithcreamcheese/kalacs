"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, ArrowRight } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#261F1D] text-[#F9F5F1] pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FELSŐ SZEKCIÓ: Elegáns CTA (Call to Action) */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-16">
          <h2 className="text-3xl md:text-5xl font-akaya font-bold mb-8 md:mb-0 text-white">
            A pillanat <span className="text-[#C79C8D] italic">művészete.</span>
          </h2>
          <Link 
            href="/contact" 
            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:text-[#C79C8D] transition-colors"
          >
            Kérj ajánlatot 
            <span className="bg-[#C79C8D] text-[#261F1D] p-3 rounded-full group-hover:bg-white transition-colors shadow-lg">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        {/* KÖZÉPSŐ SZEKCIÓ: Linkek és Infók */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* 1. Brand & Bemutatkozás (Nagyobb oszlop) */}
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="block mb-6">
              <span className="text-4xl font-bold font-akaya tracking-wide block text-white">
                Kovács Bálint
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C79C8D] font-bold">
                Fotográfia
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm max-w-sm mb-8 font-light">
              Természetes fények, őszinte érzelmek és időtálló emlékek. 
              Zalaegerszegen és az ország egész területén.
            </p>
            
            {/* Social Ikonok - Finomított, letisztult stílus */}
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/profile.php?id=61577861518379" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C79C8D] hover:-translate-y-1 transition-all duration-300">
                <Facebook size={22} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/k_balintfoto/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C79C8D] hover:-translate-y-1 transition-all duration-300">
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a href="/contact" className="text-white/60 hover:text-[#C79C8D] hover:-translate-y-1 transition-all duration-300">
                <Mail size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* 2. Portfólió (Egyesítve a Galériák és Szolgáltatások) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C79C8D] mb-8">Portfólió</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/szolgaltatasok/eskuvo" className="text-white/90 font-medium hover:text-[#C79C8D] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C79C8D]"></span> Esküvő
                </Link>
              </li>
              <li><Link href="/szolgaltatasok/portre" className="text-white/60 hover:text-white transition-colors text-sm">Portré</Link></li>
              <li><Link href="/szolgaltatasok/family-sessions" className="text-white/60 hover:text-white transition-colors text-sm">Család</Link></li>
              <li><Link href="/szolgaltatasok/kismama" className="text-white/60 hover:text-white transition-colors text-sm">Kismama</Link></li>
              <li><Link href="/szolgaltatasok/autok" className="text-white/60 hover:text-white transition-colors text-sm">Autó</Link></li>
              <li><Link href="/szolgaltatasok/kutyusok" className="text-white/60 hover:text-white transition-colors text-sm">Kutyusok</Link></li>
              <li className="pt-2">
                <Link href="/mini-fotozasok/husvet" className="text-[#C79C8D] hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                  Húsvéti Mini
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Információk */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C79C8D] mb-8">Információk</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">Rólam</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">Kapcsolat</Link></li>
              <li><Link href="/velemenyek" className="text-white/60 hover:text-white transition-colors text-sm">Vélemények</Link></li>
              {/* Ha a FAQ külön oldal, maradhat, de a szolgáltatásokba beépítettük! */}
            </ul>
          </div>

          {/* 4. Jogi */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C79C8D] mb-8">Jogi</h4>
            <ul className="space-y-4">
              <li><Link href="/adatvedelem" className="text-white/60 hover:text-white transition-colors text-sm">Adatvédelem</Link></li>
              <li><Link href="/aszf" className="text-white/60 hover:text-white transition-colors text-sm">ÁSZF</Link></li>
            </ul>
          </div>
          
        </div>

        {/* ALSÓ SZEKCIÓ: Copyright Sáv */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-light tracking-wide">
            &copy; {currentYear} Kovács Bálint Fotográfia. Minden jog fenntartva.
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
            Készült szenvedéllyel Zalaegerszegen
          </p>
        </div>

      </div>
    </footer>
  );
}