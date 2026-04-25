"use client";

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
      <div className="bg-[#5A4A42] py-16 px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-akaya">
          Készen állsz, hogy megörökítsük a pillanatot?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Legyen szó családi eseményről, portfólióról vagy az autódról, keress bizalommal!
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-white text-[#5A4A42] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#F7E7CE] transition-colors shadow-lg"
        >
          Kapcsolatfelvétel
        </a>
      </div>

    </main>
  );
}