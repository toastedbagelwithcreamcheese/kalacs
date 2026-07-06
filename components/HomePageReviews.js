"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Quote, User, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePageReviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('velemenyek')
                .select('name, rating, review_text, profile_image_url, product_image_urls')
                .eq('status', 'jovahagyva')
                .order('created_at', { ascending: false })
                .limit(3); 

            if (error) {
                console.error("Hiba a vélemények betöltésekor:", error);
            } else {
                setReviews(data);
            }
            setIsLoading(false);
        };
        fetchTopReviews();
    }, []);

    if (isLoading || reviews.length === 0) return null;

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
                    className="text-center mb-16"
                >
                    <h2 className="font-akaya text-4xl md:text-6xl text-[#5A4A42] mb-6">
                        Közös <span className="text-shimmer italic">történeteink</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#5A4A42]/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Számomra a legnagyobb elismerés, amikor a képeim mosolyt (vagy örömkönnyeket) csalnak az arcotokra.
                    </p>
                </motion.div>

                {/* Kártyák */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                            style={{ perspective: 1000 }}
                        >
                            <TiltCard tiltStrength={5} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#5A4A42]/5 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300">
                                <Quote className="absolute top-8 right-8 text-[#C79C8D]/10 w-16 h-16 transform group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-500" />

                                <div className="flex items-center gap-5 mb-8 z-10">
                                    <div className="relative w-16 h-16 shrink-0 rounded-full ring-2 ring-transparent group-hover:ring-[#C79C8D]/60 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(199,156,141,0.5)]">
                                        {review.profile_image_url ? (
                                            <Image src={review.profile_image_url} alt={review.name} fill sizes="64px" className="rounded-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-[#F9F5F1] flex items-center justify-center text-[#C79C8D]">
                                                <User size={28} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-akaya text-[#5A4A42] text-2xl">{review.name}</h3>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <motion.span
                                                    key={starIndex}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.12 + 0.3 + starIndex * 0.06, type: "spring", stiffness: 300, damping: 15 }}
                                                >
                                                    <Star className={`w-4 h-4 ${starIndex < review.rating ? 'text-[#C79C8D] fill-[#C79C8D]' : 'text-gray-200'}`} />
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[#5A4A42]/80 italic leading-relaxed mb-8 flex-grow relative z-10 text-sm md:text-base">
                                    "{review.review_text}"
                                </p>

                                {review.product_image_urls && review.product_image_urls.length > 0 && (
                                    <div className="mt-auto pt-6 border-t border-[#5A4A42]/5 z-10">
                                        <p className="text-[10px] text-[#C79C8D] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-1">
                                            <ImageIcon size={12} /> Csatolt képek
                                        </p>
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {review.product_image_urls.map((imgUrl, idx) => (
                                                <a href={imgUrl} target="_blank" rel="noopener noreferrer" key={idx} className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm group/img">
                                                    <Image src={imgUrl} alt="Vélemény fotó" fill className="object-cover group-hover/img:scale-110 transition-transform duration-500" sizes="64px" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                        Összes vélemény olvasása
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};