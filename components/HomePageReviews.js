'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Camera } from 'lucide-react'; // Hozzáadtam a Camera ikont
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image'; // Importáljuk az Image komponenst is

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
            // --- JAVÍTÁS 1: LEKÉRJÜK A KÉP URL-eket is ---
            const { data, error } = await supabase
                .from('velemenyek')
                .select('name, rating, review_text, profile_image_url, product_image_urls') // <-- ITT A VÁLTOZÁS
                .eq('status', 'jovahagyva')
                .order('created_at', { ascending: false })
                .limit(3); 

            if (error) {
                console.error("Hiba a főoldali vélemények betöltésekor:", error);
            } else {
                setReviews(data);
            }
            setIsLoading(false);
        };
        fetchTopReviews();
    }, []);

    if (isLoading || reviews.length === 0) {
        return null;
    }

    return (
        <section className="bg-brand-background py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="font-serif text-4xl md:text-5xl italic text-brand-text">Történetek a kamera túloldaláról</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">
                        Minden fotó mögött egy történet áll – öröm, nevetés, szerelem. Olvasd el, hogyan emlékeznek vissza a közös fotózásainkra azok, akikkel már dolgoztam!
                    </p>

                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col">
                            <div className="flex items-center gap-4">
                                {review.profile_image_url && <img src={review.profile_image_url} className="w-14 h-14 rounded-full object-cover"/>}
                                <div>
                                    <p className="font-semibold text-brand-text">{review.name}</p>
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400"/>)}
                                    </div>
                                </div>
                            </div>

                            {/* --- JAVÍTÁS 2: SZÖVEG TÖRDELÉSE --- */}
                            <p className="mt-6 text-gray-600 italic flex-grow break-words">"{review.review_text}"</p>

                            {/* --- JAVÍTÁS 3: FELTÖLTÖTT KÉPEK MEGJELENÍTÉSE --- */}
                            {review.product_image_urls && review.product_image_urls.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="grid grid-cols-3 gap-2">
                                        {review.product_image_urls.map((imgUrl, idx) => (
                                            <a href={imgUrl} target="_blank" rel="noopener noreferrer" key={idx} className="relative aspect-square rounded-md overflow-hidden block">
                                                <Image 
                                                    src={imgUrl} 
                                                    alt={`Feltöltött kép ${idx + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                                    sizes="100px"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <Link href="/velemenyek" passHref legacyBehavior>
                        <a className="btn-primary text-base">
                            További vélemények
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomePageReviews;