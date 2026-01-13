"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rabbit, ArrowRight } from "lucide-react"; // Húsvéti nyuszi ikon

export default function SeasonalBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ delay: 1, duration: 0.5 }}
      className="bg-[#F7E7CE] text-[#5A4A42] border-b border-[#e6d0b3]"
    >
      <div className="max-w-7xl mx-auto py-3 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        <div className="flex items-center gap-3">
          <div className="bg-white/50 p-2 rounded-full hidden sm:block">
            <Rabbit size={20} className="text-[#C79C8D]" />
          </div>
          <div>
            <span className="font-bold text-[#C79C8D] uppercase tracking-wider text-xs block">Szezonális Ajánlat</span>
            <p className="font-medium text-sm md:text-base">
              Indul a Húsvéti Mini Fotózás időpontfoglalása! 🐰
            </p>
          </div>
        </div>

        <Link 
          href="/mini-fotozasok/husvet" 
          className="group flex items-center gap-2 bg-[#C79C8D] hover:bg-[#b3897b] text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
        >
          Megnézem
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}