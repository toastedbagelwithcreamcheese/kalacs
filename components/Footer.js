"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook, Instagram, Mail, Phone, ArrowRight,
  Heart, Camera, Users, Baby, Car, Dog,
  User, Star, Shield, Cookie, FileText, Info,
} from "lucide-react";

const dot = "w-1.5 h-1.5 rounded-full bg-[#C79C8D] shrink-0";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* 1. Brand, bemutatkozás és elérhetőség */}
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 shrink-0 rounded-full bg-white/5 border border-white/10 p-1.5 group-hover:border-[#C79C8D]/40 transition-colors">
                <Image src="/images/logo2-transparent.webp" alt="Kovács Bálint Fotó logó" fill className="object-contain invert p-1" />
              </div>
              <div>
                <span className="text-3xl font-bold font-akaya tracking-wide block text-white leading-none">
                  Kovács Bálint
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C79C8D] font-bold">
                  Fotográfia
                </span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm max-w-sm mb-6 font-light">
              Természetes fények, őszinte érzelmek és időtálló emlékek.
              Budapesten, Zalaegerszegen és az ország egész területén.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/60 text-sm font-light">
                <Mail size={15} className="text-[#C79C8D] shrink-0" />
                <a href="mailto:kapcsolat@kovacsbalintfoto.hu" className="hover:text-white transition-colors">kapcsolat@kovacsbalintfoto.hu</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm font-light">
                <Phone size={15} className="text-[#C79C8D] shrink-0" />
                <a href="tel:+36308723777" className="hover:text-white transition-colors">+36 30 872 3777</a>
              </li>
            </ul>

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
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C79C8D] mb-8">Portfólió</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/szolgaltatasok/eskuvo" className="text-white/90 font-medium hover:text-[#C79C8D] transition-colors text-sm flex items-center gap-2.5">
                  <Heart size={14} className="text-[#C79C8D] shrink-0" /> Esküvő
                </Link>
              </li>
              <li><Link href="/szolgaltatasok/portre" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Camera size={14} className="text-white/30 shrink-0" /> Portré</Link></li>
              <li><Link href="/szolgaltatasok/family-sessions" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Users size={14} className="text-white/30 shrink-0" /> Család</Link></li>
              <li><Link href="/szolgaltatasok/kismama" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Baby size={14} className="text-white/30 shrink-0" /> Kismama</Link></li>
              <li><Link href="/szolgaltatasok/autok" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Car size={14} className="text-white/30 shrink-0" /> Autó, motoros</Link></li>
              <li><Link href="/szolgaltatasok/kutyusok" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Dog size={14} className="text-white/30 shrink-0" /> Kutyusok</Link></li>
              {/*<li className="pt-2"><Link href="/mini-fotozasok/husvet" className="text-[#C79C8D] hover:text-white transition-colors text-sm font-bold flex items-center gap-2">Húsvéti Mini</Link></li>*/}
            </ul>
          </div>

          {/* 3. Információk */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C79C8D] mb-8">Információk</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><User size={14} className="text-white/30 shrink-0" /> Rólam</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Mail size={14} className="text-white/30 shrink-0" /> Kapcsolat</Link></li>
              <li><Link href="/velemenyek" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2.5"><Star size={14} className="text-white/30 shrink-0" /> Vélemények</Link></li>
            </ul>
          </div>

        </div>

        {/* JOGI SÁV */}
        <div className="border-t border-white/10 pt-8 mb-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/adatvedelem" className="flex items-center gap-2 text-white/40 hover:text-[#C79C8D] transition-colors text-xs">
            <Shield size={14} /> Adatvédelmi Irányelvek
          </Link>
          <Link href="/cookie" className="flex items-center gap-2 text-white/40 hover:text-[#C79C8D] transition-colors text-xs">
            <Cookie size={14} /> Cookie Szabályzat
          </Link>
          <Link href="/aszf" className="flex items-center gap-2 text-white/40 hover:text-[#C79C8D] transition-colors text-xs">
            <FileText size={14} /> ÁSZF
          </Link>
          <Link href="/impresszum" className="flex items-center gap-2 text-white/40 hover:text-[#C79C8D] transition-colors text-xs">
            <Info size={14} /> Impresszum
          </Link>
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

        {/* KÉSZÍTŐI SOR */}
        <div className="pt-4 text-center">
          <p className="text-white/25 text-[10px] tracking-wide">
            Weboldalt tervezte és fejlesztette{" "}
            <a
              href="mailto:kapcsolat@kovacsbalintfoto.hu"
              className="text-white/40 hover:text-[#C79C8D] transition-colors underline decoration-white/20 underline-offset-2"
            >
              Kovács Bálint
            </a>
            <span className="mx-1.5">·</span>
            <a href="tel:+36308723777" className="text-white/40 hover:text-[#C79C8D] transition-colors">
              +36 30 872 3777
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
