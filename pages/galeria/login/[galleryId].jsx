// pages/galeria/login/[galleryId].jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // FONTOS: 'next/router', nem 'next/navigation'!

export default function GalleryLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // A galleryId-t a router.query-ból olvassuk ki
  const { galleryId } = router.query;

  // Ez a useEffect biztosítja, hogy a galleryId már elérhető legyen a rendereléskor
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!galleryId) return; // Ne csináljon semmit, amíg a galleryId nem elérhető

    setIsLoading(true);
    setError('');

    const response = await fetch('/api/gallery-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ galleryId, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = `/galeria/${galleryId}`;
    } else {
      setError(data.error || 'Hiba történt.');
    }

    setIsLoading(false);
  };
  
  // ... a return rész (JSX) ugyanaz marad ...
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ... a form és a többi JSX változatlan ... */}
    </div>
  );
}