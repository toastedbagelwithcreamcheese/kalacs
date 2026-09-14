"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { GOOGLE_VELEMENYEK, OSSZEGZES, GOOGLE_PROFIL_URL } from '@/constants/google-velemenyek';

/* A főoldalon a Google Cégprofil nyilvános értékelései állnak — ezek azok,
   amiket egy kereső is lát a cégprofilon, tehát nem „saját" vélemények.

   SZÁNDÉKOSAN NINCS hozzájuk strukturált adat. A Google szabályzata szerint
   a más felületről átvett értékeléseket nem szabad saját AggregateRating-ként
   jelölni; az oldal értékelés-jelölése továbbra is csak a /velemenyek lapon
   van, a saját, moderált véleményekből számolva. */
export default function HomePageReviews() {
    if (GOOGLE_VELEMENYEK.length === 0) return null;

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

                {/* Fejléc */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-akaya text-4xl md:text-6xl text-[#5A4A42] mb-6">
                        Közös <span className="text-shimmer italic">történeteink</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#5A4A42]/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Számomra a legnagyobb elismerés, amikor a képeim mosolyt (vagy örömkönnyeket) csalnak az arcotokra.
                    </p>
                </motion.div>

                {/* Google-összegzés — a forrás megnevezésével */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-14 text-[#5A4A42]"
                >
                    <span className="flex" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-[#C79C8D] fill-[#C79C8D]" />
                        ))}
                    </span>
                    <span className="font-bold text-lg tabular-nums">
                        {OSSZEGZES.atlag.toLocaleString('hu-HU', { minimumFractionDigits: 1 })}
                    </span>
                    <span className="text-[#5A4A42]/70">
                        {OSSZEGZES.darab} Google-értékelés alapján
                    </span>
                    <a
                        href={GOOGLE_PROFIL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C79C8D] font-bold underline underline-offset-4 hover:text-[#5A4A42] transition-colors"
                    >
                        Megnézem a Google-on
                    </a>
                </motion.div>

                {/* Kártyák */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GOOGLE_VELEMENYEK.map((velemeny, i) => (
                        <motion.div
                            key={velemeny.nev}
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                            style={{ perspective: 1000 }}
                        >
                            <TiltCard tiltStrength={5} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#5A4A42]/5 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300">
                                <Quote aria-hidden="true" className="absolute top-8 right-8 text-[#C79C8D]/10 w-16 h-16" />

                                <div className="mb-6 z-10">
                                    <h3 className="font-bold font-akaya text-[#5A4A42] text-2xl">{velemeny.nev}</h3>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <motion.span
                                                key={starIndex}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.12 + 0.3 + starIndex * 0.06, type: "spring", stiffness: 300, damping: 15 }}
                                            >
                                                <Star className={`w-4 h-4 ${starIndex < velemeny.ertekeles ? 'text-[#C79C8D] fill-[#C79C8D]' : 'text-gray-200'}`} />
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <blockquote className="text-[#5A4A42]/80 italic leading-relaxed mb-6 flex-grow relative z-10 text-sm md:text-base">
                                    „{velemeny.szoveg}”
                                </blockquote>

                                <p className="mt-auto pt-5 border-t border-[#5A4A42]/5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C79C8D] z-10">
                                    Google-értékelés
                                </p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link href="/velemenyek" className="inline-block border-b-2 border-[#C79C8D] pb-1 text-[#5A4A42] font-bold uppercase tracking-widest text-sm hover:text-[#C79C8D] transition-colors">
                        Írásos visszajelzések olvasása
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
