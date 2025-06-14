// app/galeria/[galleryId]/page.jsx
import { supabase } from '@/lib/supabaseClient';
import { getGalleryImages } from '@/lib/cloudinary'; // Importáljuk az új függvényt
import ClientGallery from '@/components/ClientGallery';

export default async function GalleryPage({ params }) {
    const galleryId = params?.galleryId;  

  // Adatok lekérése párhuzamosan
  const [galleryDataResult, imagesResult] = await Promise.all([
    supabase.from('galleries').select('client_name, client_email, selected_images').eq('id', galleryId).single(),
    getGalleryImages(galleryId) // Itt már a valós Cloudinary mappából kérjük le a képeket
  ]);

  const { data: galleryData, error: galleryError } = galleryDataResult;
  const images = imagesResult;

  if (galleryError || !galleryData) {
    return <div className="text-center p-10">Hiba: A galéria nem található vagy nem sikerült betölteni.</div>;
  }
  
  return (
    <ClientGallery 
      galleryId={galleryId}
      initialImages={images} 
      initialSelections={galleryData.selected_images || []}
      clientName={galleryData.client_name}
      clientEmail={galleryData.client_email}
    />
  );
  }
  