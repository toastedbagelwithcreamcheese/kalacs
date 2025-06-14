// pages/galeria/[galleryId].jsx
import { supabase } from '@/lib/supabaseClient';
import { getGalleryImages } from '@/lib/cloudinary';
import ClientGallery from '@/components/ClientGallery';
import nookies from 'nookies'; // Segédprogram a cookie-k kezeléséhez

// Ez a függvény fut le a szerveren minden kérésnél, mielőtt az oldal betöltődne.
export async function getServerSideProps(context) {
  const { galleryId } = context.params;
  const cookies = nookies.get(context);

  const isAuthenticated = cookies[`gallery-auth-${galleryId}`] === 'true';

  // Ha a felhasználó nincs bejelentkezve, átirányítjuk a login oldalra.
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: `/galeria/login/${galleryId}`,
        permanent: false,
      },
    };
  }

  // Ha be van jelentkezve, lekérjük az adatokat
  try {
    const [galleryDataResult, imagesResult] = await Promise.all([
      supabase
        .from('galleries')
        .select('client_name, client_email, selected_images')
        .eq('id', galleryId)
        .single(),
      getGalleryImages(galleryId),
    ]);
    
    const { data: galleryData, error: galleryError } = galleryDataResult;

    if (galleryError || !galleryData) {
      throw new Error('Galéria nem található az adatbázisban.');
    }

    return {
      props: { // Az itt visszaadott 'props' objektumot kapja meg a GalleryPage komponens
        galleryId,
        initialImages: imagesResult,
        initialSelections: galleryData.selected_images || [],
        clientName: galleryData.client_name,
        clientEmail: galleryData.client_email,
      },
    };

  } catch (error) {
    console.error("Szerver oldali hiba a galéria betöltésekor:", error);
    // Hiba esetén is átadhatunk egy hiba prop-ot
    return { props: { error: 'Hiba történt a galéria betöltésekor.' } };
  }
}

// A komponens most már egy "buta" komponens, ami csak megjeleníti a props-ként kapott adatokat.
export default function GalleryPage({ galleryId, initialImages, initialSelections, clientName, clientEmail, error }) {
  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }
  
  return (
    <ClientGallery
      galleryId={galleryId}
      initialImages={initialImages}
      initialSelections={initialSelections}
      clientName={clientName}
      clientEmail={clientEmail}
    />
  );
}