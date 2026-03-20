'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, UploadCloud, Check, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const photographyTypes = [
    "Esküvő", "Páros / Jegyes", "Családi", "Kismama", "Portré", "Autós", "Kutyás", "Rendezvény"
];

const SpinnerIcon = () => ( <motion.svg className="w-5 h-5 text-white" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25"></circle><path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75"></path></motion.svg> );

const StarRating = ({ rating, setRating }) => (
    <div className="flex items-center gap-3">
        {[...Array(5)].map((_, i) => (
            <motion.div key={i+1} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => setRating(i+1)}>
                <Star className={`w-8 h-8 md:w-10 md:h-10 cursor-pointer transition-colors ${i < rating ? 'text-[#C79C8D] fill-[#C79C8D]' : 'text-gray-200'}`}/>
            </motion.div>
        ))}
    </div>
);

export default function ReviewWritePage() {
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
        const { data, error } = await supabase.storage.from(bucket).upload(storagePath, file);
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
            alert('Hiba történt a küldés során. Kérlek próbáld újra!');
        }
    };

    return (
        <main className="bg-[#F9F5F1] min-h-screen py-32 px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto bg-white p-8 md:p-14 rounded-[2rem] shadow-xl border border-[#5A4A42]/5"
            >
                {status === 'success' ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16 flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#F9F5F1] rounded-full flex items-center justify-center mb-8">
                            <CheckCircle2 size={48} className="text-[#C79C8D]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-akaya text-[#5A4A42] mb-4">Köszönöm a bizalmad!</h2>
                        <p className="text-lg text-[#5A4A42]/70 leading-relaxed max-w-md mx-auto">
                            A véleményedet sikeresen rögzítettem. Hamarosan megjelenik az oldalon!
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="text-center mb-12">
                            <span className="text-[#C79C8D] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Visszajelzés</span>
                            <h1 className="font-akaya text-4xl md:text-5xl text-[#5A4A42] mb-4">Milyen volt a közös munka?</h1>
                            <p className="text-[#5A4A42]/60">Néhány sor tőled rengeteget jelent nekem és a leendő ügyfeleimnek is.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Neved" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-[#F9F5F1] border-none rounded-2xl focus:ring-2 focus:ring-[#C79C8D] outline-none text-[#5A4A42] placeholder-[#5A4A42]/40 transition-shadow"/>
                            <input type="email" placeholder="E-mail (nem lesz publikus)" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-[#F9F5F1] border-none rounded-2xl focus:ring-2 focus:ring-[#C79C8D] outline-none text-[#5A4A42] placeholder-[#5A4A42]/40 transition-shadow"/>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-[#5A4A42] uppercase tracking-wider mb-4">Fotózás Típusa</label>
                            <div className="flex flex-wrap gap-3">
                                {photographyTypes.map(type => (
                                    <button type="button" key={type} onClick={() => setSelectedCollection(type)} 
                                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${selectedCollection === type ? 'bg-[#5A4A42] border-[#5A4A42] text-white shadow-md' : 'bg-transparent border-[#5A4A42]/20 text-[#5A4A42] hover:border-[#C79C8D] hover:text-[#C79C8D]'}`}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#5A4A42] uppercase tracking-wider mb-4">Értékelés</label>
                            <StarRating rating={rating} setRating={setRating} />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#5A4A42] uppercase tracking-wider mb-4">Történeted</label>
                            <textarea placeholder="Írd le, hogyan érezted magad a fotózáson, elégedett vagy-e a képekkel..." rows="5" required onChange={e => setReviewText(e.target.value)} className="w-full px-6 py-4 bg-[#F9F5F1] border-none rounded-2xl focus:ring-2 focus:ring-[#C79C8D] outline-none text-[#5A4A42] placeholder-[#5A4A42]/40 transition-shadow resize-none"/>
                        </div>

                        {/* KÉPFELTÖLTÉS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#5A4A42]/5 pt-10">
                            <div>
                                <label className="block text-sm font-bold text-[#5A4A42] uppercase tracking-wider mb-4">Profilkép <span className="text-[#C79C8D] font-normal lowercase">(opcionális)</span></label>
                                <input type="file" ref={profileInputRef} onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="hidden"/>
                                <div onClick={() => profileInputRef.current.click()} className="flex justify-center items-center h-32 px-6 border-2 border-[#5A4A42]/10 border-dashed rounded-2xl cursor-pointer hover:bg-[#F9F5F1] transition-colors group">
                                    {profileImage ? 
                                        <img src={URL.createObjectURL(profileImage)} className="h-full rounded-full aspect-square object-cover p-2" alt="Profilkép előnézet"/> 
                                        : 
                                        <div className="text-center">
                                            <UploadCloud className="mx-auto h-8 w-8 text-[#5A4A42]/40 group-hover:text-[#C79C8D] transition-colors mb-2" />
                                            <p className="text-xs text-[#5A4A42]/60 font-medium">Kattints a feltöltéshez</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#5A4A42] uppercase tracking-wider mb-4">Kedvenc képek <span className="text-[#C79C8D] font-normal lowercase">(max 3)</span></label>
                                <input type="file" ref={productsInputRef} onChange={(e) => setProductImages(Array.from(e.target.files).slice(0,3))} accept="image/*" multiple className="hidden"/>
                                <div onClick={() => productsInputRef.current.click()} className="flex justify-center items-center h-32 px-6 border-2 border-[#5A4A42]/10 border-dashed rounded-2xl cursor-pointer hover:bg-[#F9F5F1] transition-colors group overflow-hidden">
                                    {productImages.length > 0 ? (
                                        <div className="flex gap-2 h-full p-2 w-full overflow-x-auto scrollbar-hide">
                                            {productImages.map((img, i) => <img key={i} src={URL.createObjectURL(img)} className="h-full rounded-xl object-cover aspect-square shrink-0" alt="Előnézet"/>)}
                                        </div>
                                    ) : 
                                        <div className="text-center">
                                            <UploadCloud className="mx-auto h-8 w-8 text-[#5A4A42]/40 group-hover:text-[#C79C8D] transition-colors mb-2" />
                                            <p className="text-xs text-[#5A4A42]/60 font-medium">Kattints a feltöltéshez</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" disabled={status === 'sending'} className="w-full md:w-auto md:ml-auto flex items-center justify-center gap-3 bg-[#5A4A42] text-white font-bold py-4 px-10 rounded-full hover:bg-[#C79C8D] transition-all shadow-lg hover:-translate-y-1 duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                                {status === 'sending' ? <SpinnerIcon /> : <Check size={20} />}
                                {status === 'sending' ? 'Küldés folyamatban...' : 'Vélemény Beküldése'}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </main>
    );
}