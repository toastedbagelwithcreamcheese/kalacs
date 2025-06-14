'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function GalleryLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Ez most helyesen kiolvassa a paramétert (pl. "teszt-galeria")
  const params = useParams();
  const galleryId = params.galleryId;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            className="w-full px-4 py-2 border rounded-md mb-4"
            placeholder="Jelszó"
            required
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 rounded-md font-bold hover:bg-gray-700 disabled:bg-gray-400 transition-all"
          >
            {isLoading ? 'Belépés...' : 'Belépés'}
          </button>
        </form>
      </div>
    </div>
  );
}
