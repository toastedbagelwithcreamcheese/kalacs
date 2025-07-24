'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, UploadCloud, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- ÚJ: FOTÓZÁS TÍPUSOK ---
const photographyTypes = [
    "Kutyás", "Autós", "Kismama", "Családi", "Páros", "Esküvő", "Rendezvény", "Portré"
];

// Segédkomponensek (Spinner, Success Ikon, StarRating)
const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );
const SuccessIcon = () => ( <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></motion.svg> );
const StarRating = ({ rating, setRating }) => (
    <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
            <motion.div key={i+1} whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }} onClick={() => setRating(i+1)}>
                <Star className={`w-8 h-8 cursor-pointer transition-colors ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
            </motion.div>
        ))}
    </div>
);

export default function ReviewPage() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [status, setStatus] = useState('idle');

    const profileInputRef = useRef(null);
    const productsInputRef = useRef(null);
    
    const handleFileUpload = async (file, bucket, storagePath) => {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(storagePath, file);

        if (error) {
            console.error('Hiba a fájlfeltöltéskor:', error);
            return null;
        }
        return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCollection) {
            alert('Kérlek, válaszd ki a fotózás típusát!');
            return;
        }
        setStatus('sending');

        try {
            let profileImageUrl = null;
            if (profileImage) {
                const fileName = `${Date.now()}_${profileImage.name}`;
                profileImageUrl = await handleFileUpload(profileImage, 'testimonials', `profiles/${fileName}`);
            }

            const productImagesUrls = await Promise.all(
                productImages.map(async (file) => {
                    const fileName = `${Date.now()}_${file.name}`;
                    return await handleFileUpload(file, 'testimonials', `products/${fileName}`);
                })
            );

            const { error } = await supabase.from('velemenyek').insert([{ 
                name: formData.name,
                email: formData.email,
                collection: selectedCollection,
                rating: rating,
                review_text: reviewText,
                profile_image_url: profileImageUrl,
                product_image_urls: productImagesUrls.filter(url => url !== null),
                status: 'fuggoben', 
            }]);

            if (error) throw error;
            
            setStatus('success');

        } catch (error) {
            console.error('Hiba a vélemény mentésekor:', error);
            setStatus('error');
        }
    };

    return (
        <>
            <main className="bg-brand-background min-h-screen py-24 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    {status === 'success' ? (
                        <div className="text-center py-10 flex flex-col items-center">
                            <SuccessIcon />
                            <h2 className="text-3xl font-serif mt-4 text-brand-text">Köszönjük a véleményed!</h2>
                            <p className="mt-2 text-gray-600">Nagyra értékeljük, hogy időt szántál a visszajelzésre. Hamarosan megjelenik az oldalon!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <h1 className="font-serif text-4xl text-brand-text">Oszd meg a történeted</h1>
                                <p className="mt-2 text-gray-500">A te véleményed segít másoknak a döntésben. Köszönjük, hogy megosztod velünk!</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Neved" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-brand-rose-gold focus:border-brand-rose-gold"/>
                                <input type="email" placeholder="E-mail címed (nem lesz publikus)" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-brand-rose-gold focus:border-brand-rose-gold"/>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Milyen fotózáson jártál?</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {photographyTypes.map(type => (
                                        <button type="button" key={type} onClick={() => setSelectedCollection(type)} 
                                            className={`p-3 text-center rounded-lg border transition-all text-sm flex items-center justify-center gap-2 ${selectedCollection === type ? 'bg-brand-rose-gold/10 border-brand-rose-gold ring-2 ring-brand-rose-gold/50 text-brand-rose-gold' : 'border-gray-200 hover:border-brand-rose-gold/50'}`}>
                                            {selectedCollection === type && <Check className="w-4 h-4"/>}
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Értékelés</label>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>

                            <textarea placeholder="Írd le a véleményed, oszd meg a történeted..." rows="6" required onChange={e => setReviewText(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-brand-rose-gold focus:border-brand-rose-gold"/>

                            {/* --- KÉPFELTÖLTÉS SZEKCIÓ (VISSZAÁLLÍTVA) --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Profilkép (opcionális)</label>
                                    <input type="file" ref={profileInputRef} onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="hidden"/>
                                    <div onClick={() => profileInputRef.current.click()} className="mt-1 flex justify-center items-center h-32 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-rose-gold/50 transition-colors">
                                        {profileImage ? 
                                            <img src={URL.createObjectURL(profileImage)} className="h-full rounded-full aspect-square object-cover" alt="Profilkép előnézet"/> 
                                            : 
                                            <div className="space-y-1 text-center">
                                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="text-xs text-gray-500">Kattints a feltöltéshez</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Képek a fotózásról (max 3)</label>
                                    <input type="file" ref={productsInputRef} onChange={(e) => setProductImages(Array.from(e.target.files).slice(0,3))} accept="image/*" multiple className="hidden"/>
                                    <div onClick={() => productsInputRef.current.click()} className="mt-1 flex justify-center items-center h-32 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-rose-gold/50 transition-colors">
                                        {productImages.length > 0 ? (
                                            <div className="flex gap-2 h-full">
                                                {productImages.map((img, i) => <img key={i} src={URL.createObjectURL(img)} className="h-full rounded-md object-cover" alt={`Feltöltött kép előnézet ${i+1}`}/>)}
                                            </div>
                                        ) : 
                                            <div className="space-y-1 text-center">
                                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="text-xs text-gray-500">Kattints a feltöltéshez</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------------------ */}

                            <div className="text-right">
                                <button type="submit" disabled={status === 'sending'} className="btn-primary flex items-center gap-3 ml-auto">
                                    {status === 'sending' ? <SpinnerIcon /> : null}
                                    {status === 'sending' ? 'Küldés...' : 'Vélemény beküldése'}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </main>
        </>
    );
}