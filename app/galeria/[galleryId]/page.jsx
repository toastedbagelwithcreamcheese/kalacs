import { supabase } from '@/lib/supabaseClient';
import { getGalleryImages } from '@/lib/cloudinary';
import ClientGallery from '@/components/ClientGallery';

export default async function GalleryPage({ params }) {
    const galleryId = params?.galleryId;
    console.log("📍 [GalleryPage] galleryId:", galleryId, typeof galleryId);
  
    try {
      const [galleryDataResult, imagesResult] = await Promise.all([
        supabase
          .from('galleries')
          .select('client_name, client_email, selected_images')
          .eq('id', galleryId)
          .single(),
        getGalleryImages(galleryId),
      ]);
  
      console.log("📦 Supabase lekérdezés eredmény:", galleryDataResult);
  
      const { data: galleryData, error: galleryError } = galleryDataResult;
      const images = imagesResult;
  
      if (galleryError || !galleryData) {
        console.error('🛑 Galéria adatlekérés hiba:', galleryError);
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
    } catch (err) {
      console.error('🔥 Szerver oldali hiba:', err);
      return <div className="text-center p-10 text-red-600">Váratlan hiba történt a galéria betöltésekor.</div>;
    }
  }