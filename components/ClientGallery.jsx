// components/ClientGallery.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Send, LoaderCircle, ZoomIn, X } from "lucide-react";
import emailjs from '@emailjs/browser'; // FONTOS: Az új import

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ClientGallery({ galleryId, initialImages, initialSelections, clientName, clientEmail }) {
    const [selectedImages, setSelectedImages] = useState(new Set(initialSelections));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Lightbox állapota
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Lightbox megnyitása
    const openLightboxOn = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    // A 'slides' tömböt useMemo-val hozzuk létre, hogy ne generálódjon újra minden rendereléskor.
    // Ez segít megelőzni a felesleges újra-rendereléseket a lightboxban.
    const slides = useMemo(() => initialImages.map(img => ({
        src: img.src,
        width: img.width,
        height: img.height,
        alt: `Fotó - ${img.id}`,
        publicId: img.publicId
    })), [initialImages]);

    const toggleSelection = async (publicId) => {
        const newSelection = new Set(selectedImages);
        if (newSelection.has(publicId)) {
            newSelection.delete(publicId);
        } else {
            newSelection.add(publicId);
        }
        setSelectedImages(newSelection);
        
        setIsSaving(true);
        try {
            await fetch('/api/update-selection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ galleryId, selections: Array.from(newSelection) })
            });
        } catch (error) {
            console.error("Hiba a mentés során:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // --- ÁTÍRT, KLIENS OLDALI EMAIL KÜLDŐ LOGIKA ---
    const handleSubmitSelection = async () => {
        setIsSubmitting(true);
        setFeedback("Küldés folyamatban, kérlek várj...");

        // Adatok előkészítése az EmailJS sablonhoz
        const templateParams = {
            client_name: clientName,
            client_email: clientEmail, // Email cím az automatikus válaszhoz
            gallery_id: galleryId,
            selection_count: selectedImages.size,
            image_list_html: `<ul>${Array.from(selectedImages).map(id => `<li>${id.split('/').pop()}</li>`).join('')}</ul>`,
        };

        try {
            // Email küldése közvetlenül a böngészőből
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN, // A sablon ID-ja, ami NEKED megy
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
            setFeedback("Köszönöm! A kiválasztásodat sikeresen elküldtük. Hamarosan kapsz egy megerősítő e-mailt.");
        } catch (error) {
            console.error("EmailJS küldési hiba:", error);
            setFeedback("Hiba történt a küldés során. Kérlek, vedd fel velem a kapcsolatot.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-40 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Kedves {clientName},</h1>
                        <p className="text-gray-500">Kattints a képekre a kiválasztáshoz!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {isSaving && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center text-sm text-gray-500">
                                <LoaderCircle className="animate-spin mr-2" size={16}/> Mentés...
                            </motion.div>
                        )}
                        <div className="text-center">
                            <p className="text-lg font-semibold">Kiválasztva: <span className="text-xl font-bold text-[#C79C8D]">{selectedImages.size}</span> db kép</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-6">
                    {initialImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {initialImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="relative aspect-square cursor-pointer group"
                                    onClick={() => toggleSelection(image.publicId)} // <-- MÓDOSÍTÁS: A fő kattintás mostantól kijelöl
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    <Image src={image.src} alt={`Fotó - ${image.id}`} layout="fill" objectFit="cover" className={`rounded-md transition-all duration-300 ${selectedImages.has(image.publicId) ? 'scale-95 shadow-lg' : 'group-hover:scale-95'}`} />
                                    
                                    <div className={`absolute inset-0 rounded-md transition-all duration-300 pointer-events-none ${selectedImages.has(image.publicId) ? 'border-4 border-[#C79C8D] bg-black/30' : ''}`}>
                                        {/* Pipa, ha ki van választva */}
                                        {selectedImages.has(image.publicId) && (
                                            <div className="absolute top-2 right-2 bg-[#C79C8D] rounded-full p-1 shadow-lg border-2 border-white">
                                                <CheckCircle size={20} className="text-white"/>
                                            </div>
                                        )}
                                        {/* Fájlnév */}
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs p-1 rounded">
                                            {image.publicId.split('/').pop()}
                                        </div>
                                    </div>

                                    {/* ÚJ: Külön gomb a lightbox megnyitásához */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Megakadályozza, hogy a háttérben lévő kijelölés is lefusson
                                            openLightboxOn(index);
                                        }}
                                        className="absolute top-2 left-2 z-10 p-2 bg-white/20 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white/40 transition-all duration-300"
                                        aria-label="Kép nagyítása"
                                    >
                                        <ZoomIn size={20} className="text-white"/>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-20">Nincsenek képek ebben a galériában.</p>
                    )}
                </main>
            
            <footer className="sticky bottom-0 bg-white shadow-lg p-4 z-40 border-t">
                <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
                    {feedback ? (
                        <p className="text-center text-sm text-green-600 font-semibold">{feedback}</p>
                    ) : (
                        <>
                            <p className="text-gray-600">Elégedett vagy a válogatással?</p>
                            <button
                                onClick={handleSubmitSelection}
                                disabled={isSubmitting || selectedImages.size === 0}
                                className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {isSubmitting ? <LoaderCircle className="animate-spin mr-2"/> : <Send size={18} className="mr-2"/>}
                                {isSubmitting ? 'Küldés...' : 'Kiválasztás elküldése'}
                            </button>
                        </>
                    )}
                </div>
            </footer>
            {/* LIGHTBOX KOMPONENS (MÓDOSÍTVA) */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={slides}
                index={lightboxIndex}
                plugins={[Zoom, Thumbnails]}
                styles={{ container: { backgroundColor: "rgba(10, 10, 10, .95)" } }}
                // JAVÍTÁS: A 'view' eseményre frissítjük a külső indexet, így nem ugrik vissza
                on={{ view: ({ index }) => setLightboxIndex(index) }}
                render={{
                    slide: ({ slide, rect }) => {
                        const isSelected = selectedImages.has(slide.publicId);
                        return (
                            <div style={{ position: "relative", width: rect.width, height: rect.height }}>
                                <Image
                                    src={slide.src}
                                    layout="fill"
                                    objectFit="contain"
                                    alt={slide.alt}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSelection(slide.publicId);
                                    }}
                                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-lg shadow-lg
                                        ${isSelected 
                                            ? 'bg-green-600 text-white hover:bg-green-700' 
                                            : 'bg-white/80 text-gray-800 hover:bg-white backdrop-blur-sm'
                                        }`}
                                >
                                    <CheckCircle size={24} className={isSelected ? 'text-white' : 'text-green-600'}/>
                                    {isSelected ? "Kiválasztva" : "Kiválasztom ezt a képet"}
                                </button>
                            </div>
                        );
                    },
                    // Opcionális: A lightbox bezáró gombjának lecserélése egy modernebbre
                    buttonClose: () => (
                        <button type="button" className="yarl__button" onClick={() => setLightboxOpen(false)}>
                          <X className="w-8 h-8"/>
                        </button>
                    ),
                }}
            />
        </div>

      
        
    );
}   