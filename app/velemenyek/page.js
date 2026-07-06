'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Camera, User, PenLine } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('velemenyek')
                .select('*')
                .eq('status', 'jovahagyva') 
                .order('created_at', { ascending: false });

            if (!error && data) {
                setReviews(data);
            }
            setIsLoading(false);
        };
        fetchReviews();
    }, []);

    return (
        <main className="bg-[#F9F5F1] min-h-screen py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Fejléc */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }} 
                    className="text-center mb-20"
                >
                    <span className="text-[#C79C8D] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                        Ügyfélvélemények
                    </span>
                    <h1 className="font-akaya text-5xl md:text-7xl lg:text-8xl text-[#5A4A42] mb-6">
                        Amikor a kép <br/> <span className="text-[#C79C8D] italic">életre kel.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#5A4A42]/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Minden fotózás egy külön történet. Számomra a legnagyobb elismerés, amikor a képek nem csak jól néznek ki, hanem érzéseket is közvetítenek.
                    </p>
                </motion.div>

                {/* Gomb a véleményíráshoz (Fent is elérhető) */}
                <div className="text-center mb-16">
                    <Link href="/velemeny-iras" className="inline-flex items-center gap-2 bg-[#5A4A42] text-white font-bold py-3 px-8 rounded-full hover:bg-[#C79C8D] transition-colors shadow-md hover:-translate-y-1 duration-300">
                        <PenLine size={18} /> Véleményt írok
                    </Link>
                </div>

                {/* Vélemények Grid */}
                {isLoading ? (
                    <div className="text-center py-20 flex justify-center">
                        <div className="w-8 h-8 border-4 border-[#C79C8D] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-20 text-[#5A4A42]/60 font-light text-xl">
                        Jelenleg még nincsenek megjeleníthető vélemények. Legyél te az első!
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {reviews.map((review, i) => (
                             <motion.div 
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: i % 3 * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#5A4A42]/5 break-inside-avoid flex flex-col hover:shadow-lg transition-shadow"
                             >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-14 h-14 shrink-0">
                                        {review.profile_image_url ? (
                                            <Image src={review.profile_image_url} alt={review.name} fill sizes="56px" className="rounded-full object-cover"/>
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-[#F9F5F1] flex items-center justify-center text-[#C79C8D]">
                                                <User size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#5A4A42] font-akaya text-xl">{review.name}</p>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-3.5 h-3.5 ${idx < review.rating ? 'text-[#C79C8D] fill-[#C79C8D]' : 'text-gray-200'}`}/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-[#5A4A42]/80 font-light leading-relaxed italic break-words flex-grow">
                                    "{review.review_text}"
                                </p>
                                
                                {review.product_image_urls && review.product_image_urls.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-[#5A4A42]/5">
                                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C79C8D] mb-3">
                                            <Camera size={14}/> Csatolt képek
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {review.product_image_urls.map((imgUrl, idx) => (
                                                <a href={imgUrl} target="_blank" rel="noopener noreferrer" key={idx} className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden block">
                                                    <Image src={imgUrl} fill sizes="64px" className="object-cover hover:scale-110 transition-transform duration-300" alt="Csatolt fotó"/>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {review.collection && (
                                    <div className="mt-6 pt-4 text-right">
                                        <span className="inline-block px-3 py-1 bg-[#F9F5F1] text-[#5A4A42] text-xs font-bold rounded-full">
                                            {review.collection}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}   
            </div>
        </main>
    );
}