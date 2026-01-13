'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Quote, User } from 'lucide-react'; 
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomePageReviews = () => {
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

    if (isLoading || reviews.length === 0) {
        return null; // Vagy egy loading spinner, ha szeretnéd
    }

    return (
        <section className="bg-white py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Címsor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-akaya text-4xl md:text-5xl text-[#5A4A42] mb-4">
                        Rólunk mondták
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Minden fotó mögött egy történet áll. Olvasd el, hogyan élték meg mások a közös munkát!
                    </p>
                </motion.div>

                {/* Kártyák Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col relative group"
                        >
                            {/* Dekoratív idézőjel a háttérben */}
                            <Quote className="absolute top-6 right-6 text-[#C79C8D]/10 w-16 h-16 transform group-hover:scale-110 transition-transform" />

                            {/* Fejléc: Kép + Név + Csillagok */}
                            <div className="flex items-center gap-4 mb-6 z-10">
                                <div className="relative w-14 h-14 shrink-0">
                                    {review.profile_image_url ? (
                                        <img 
                                            src={review.profile_image_url} 
                                            alt={review.name}
                                            className="w-full h-full rounded-full object-cover border-2 border-[#C79C8D]/20"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-[#F9F5F1] flex items-center justify-center border-2 border-[#C79C8D]/20 text-[#C79C8D]">
                                            <User size={24} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#5A4A42] text-lg leading-tight">{review.name}</h3>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Star 
                                                key={starIndex} 
                                                className={`w-4 h-4 ${starIndex < review.rating ? 'text-[#C79C8D] fill-[#C79C8D]' : 'text-gray-200'}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Szöveg */}
                            <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow relative z-10">
                                "{review.review_text}"
                            </p>

                            {/* Feltöltött képek (ha vannak) */}
                            {review.product_image_urls && review.product_image_urls.length > 0 && (
                                <div className="mt-auto pt-4 border-t border-gray-100 z-10">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Feltöltött fotók:</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {review.product_image_urls.map((imgUrl, idx) => (
                                            <a 
                                                href={imgUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                key={idx} 
                                                className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-200 hover:border-[#C79C8D] transition-colors"
                                            >
                                                <Image 
                                                    src={imgUrl} 
                                                    alt={`Vélemény fotó ${idx + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                                    sizes="64px"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Gomb */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link href="/velemenyek" className="inline-block border-2 border-[#5A4A42] text-[#5A4A42] font-bold py-3 px-8 rounded-full hover:bg-[#5A4A42] hover:text-white transition-all duration-300">
                        További vélemények olvasása
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomePageReviews;