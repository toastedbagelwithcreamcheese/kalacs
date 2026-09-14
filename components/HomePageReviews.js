"use client";

import { motion } from 'framer-motion';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import GoogleLogo from '@/components/GoogleLogo';
import { GOOGLE_VELEMENYEK, OSSZEGZES, GOOGLE_PROFIL_URL } from '@/constants/google-velemenyek';

/* A főoldalon a Google Cégprofil nyilvános értékelései állnak.

   MIÉRT A GOOGLE SAJÁT SZÍNEIVEL: egy átvett vélemény csak akkor ér valamit,
   ha látszik rajta, honnan jött. A négyszínű „G", a Google csillag-sárgája
   (#FBBC04) és a profilra mutató link együtt mondja ki, hogy ezek nem
   „házon belüli" vélemények. A lap többi része a saját palettát használja.

   SZÁNDÉKOSAN NINCS hozzájuk strukturált adat. A Google szabályzata szerint
   a más felületről átvett értékeléseket nem szabad saját AggregateRating-ként
   jelölni; az oldal értékelés-jelölése továbbra is csak a /velemenyek lapon
   van, a saját, moderált véleményekből számolva. */

const CSILLAG_SARGA = "#FBBC04";

function Csillagok({ ertek = 5, meret = 16, kesleltetes = 0 }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${ertek} csillag az ötből`}>
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: kesleltetes + i * 0.06, type: "spring", stiffness: 320, damping: 16 }}
        >
          <Star
            size={meret}
            style={i < ertek ? { color: CSILLAG_SARGA, fill: CSILLAG_SARGA } : undefined}
            className={i < ertek ? "" : "text-[#5A4A42]/15"}
          />
        </motion.span>
      ))}
    </span>
  );
}

export default function HomePageReviews() {
  if (GOOGLE_VELEMENYEK.length === 0) return null;

  const atlag = OSSZEGZES.atlag.toLocaleString('hu-HU', { minimumFractionDigits: 1 });

  return (
    <section className="bg-[#F9F5F1] py-24 md:py-32 relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#C79C8D]/10 blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Fejléc: balra a cím, jobbra a Google-összegzés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5A4A42]/50 mb-4">
              Ezt mondják rólam
            </p>
            <h2 className="font-akaya text-4xl md:text-6xl text-[#5A4A42] leading-none">
              Google-értékelések
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-akaya text-5xl md:text-6xl text-[#5A4A42] leading-none tabular-nums">
              {atlag}
            </span>
            <span className="flex flex-col gap-1.5">
              <Csillagok ertek={5} meret={19} />
              <a
                href={GOOGLE_PROFIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1A73E8] underline underline-offset-4 decoration-[#1A73E8]/40 hover:decoration-[#1A73E8] text-sm md:text-base transition-colors"
              >
                <GoogleLogo size={15} />
                {OSSZEGZES.darab} értékelés a Google-on
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </span>
          </div>
        </motion.div>

        {/* Kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOOGLE_VELEMENYEK.map((velemeny, i) => (
            <motion.article
              key={velemeny.nev}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl p-7 md:p-8 border border-[#5A4A42]/5 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  aria-hidden="true"
                  className="w-11 h-11 shrink-0 rounded-full bg-[#5A4A42] text-white flex items-center justify-center font-bold text-lg uppercase"
                >
                  {velemeny.nev.trim().charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-[#5A4A42] leading-tight truncate">
                    {velemeny.nev}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#5A4A42]/55 mt-0.5">
                    <GoogleLogo size={12} /> Google
                  </span>
                </span>
              </div>

              <Csillagok ertek={velemeny.ertekeles} meret={17} kesleltetes={i * 0.1 + 0.2} />

              <blockquote className="text-[#5A4A42]/85 leading-relaxed mt-4 text-[0.95rem]">
                {velemeny.szoveg}
              </blockquote>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 mt-12"
        >
          <a
            href={GOOGLE_PROFIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#5A4A42]/25 px-7 py-3.5 font-bold text-[#5A4A42] hover:border-[#5A4A42] hover:bg-white transition-colors"
          >
            <GoogleLogo size={17} />
            Összes értékelés a Google-on
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a
            href="/velemenyek"
            className="text-sm font-bold uppercase tracking-widest text-[#5A4A42]/60 hover:text-[#C79C8D] transition-colors border-b-2 border-transparent hover:border-[#C79C8D] pb-0.5"
          >
            Írásos visszajelzések
          </a>
        </motion.div>
      </div>
    </section>
  );
};
