"use client";

import { motion } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import SeasonalBanner from "@/components/SeasonalBanner";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import Velemenyek from "@/components/HomePageReviews";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Teljes képernyős Slider */}
      <HeroSlider />

      {/* 2. Szezonális Banner (Húsvét) - Közvetlenül a slider alatt 
      <SeasonalBanner />
 */}
      {/* 3. Szolgáltatások Bento Grid - A hosszú görgetés helyett */}
      <ServicesGrid />

      {/* 4. Rólam szekció */}
      {/* Tipp: Érdemes lehet az AboutSection-t is rövidíteni a komponens fájljában, 
          hogy itt csak egy "bevezetőt" mutasson, de egyelőre behúzzuk a meglévőt. */}
      <AboutSection />

      {/* 5. Vélemények */}
      <Velemenyek />

      {/* 6. Végső CTA (Call to Action) - Hogy ne csak vége szakadjon az oldalnak */}
      <div className="relative bg-[#5A4A42] py-16 px-4 text-center text-white overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#C79C8D]/20 blur-3xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative text-3xl md:text-4xl font-bold mb-6 font-akaya"
        >
          Készen állsz, hogy megörökítsük a <span className="text-shimmer">pillanatot</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative text-white/80 mb-8 max-w-2xl mx-auto"
        >
          Legyen szó családi eseményről, portfólióról vagy az autódról, keress bizalommal!
        </motion.p>
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-block bg-white text-[#5A4A42] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#F7E7CE] transition-colors shadow-lg"
        >
          Kapcsolatfelvétel
        </motion.a>
      </div>

    </main>
  );
}