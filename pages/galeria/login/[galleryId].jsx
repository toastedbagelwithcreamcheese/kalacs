// pages/galeria/login/[galleryId].jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // FONTOS: 'next/router'-ból importáljuk!
import { LoaderCircle } from 'lucide-react'; // Betöltés ikon a jobb UX-ért

export default function GalleryLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // A galleryId-t a router.query-ból olvassuk ki
  const { galleryId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Plusz egy ellenőrzés, hogy biztosan meglegyen a galleryId
    if (!galleryId) {
        setError("Az oldal még töltődik, próbáld újra egy pillanat múlva.");
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        const response = await fetch('/api/gallery-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ galleryId, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Teljes oldal újratöltést használunk, hogy a szerver oldali cookie biztosan érvénybe lépjen
            window.location.href = `/galeria/${galleryId}`;
        } else {
            setError(data.error || 'Hiba történt.');
        }
    } catch (err) {
        setError("Hálózati hiba. Kérlek, ellenőrizd az internetkapcsolatodat.");
    } finally {
        setIsLoading(false);
    }
  };

  // --- EZ A KULCSFONTOSSÁGÚ RÉSZ ---
  // Amíg a router nem áll készen és a galleryId nem elérhető, egy töltőképernyőt mutatunk.
  if (!router.isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoaderCircle className="w-12 h-12 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Galéria Bejelentkezés</h1>
        <p className="text-center text-gray-500 mb-6">Kérlek, add meg a jelszót a galéria megtekintéséhez.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-[#C79C8D] focus:border-[#C79C8D] outline-none transition-all"
            placeholder="Jelszó"
            required
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-md font-bold hover:bg-gray-700 disabled:bg-gray-400 transition-all"
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Belépés'}
          </button>
        </form>
      </div>
    </div>
  );
}