// pages/api/update-selection.js
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  // Csak a POST kéréseket fogadjuk el
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { galleryId, selections } = req.body;

    if (!galleryId || !Array.isArray(selections)) {
      return res.status(400).json({ error: 'Hiányzó vagy érvénytelen adatok.' });
    }

    // Frissítjük a 'galleries' táblát a Supabase-ban
    const { error } = await supabase
      .from('galleries')
      .update({ selected_images: selections })
      .eq('id', galleryId);

    if (error) {
      // Ha hiba történik az adatbázis művelet során, naplózzuk és hibaüzenetet küldünk
      console.error('Supabase update error:', error);
      throw new Error('Sikertelen mentés az adatbázisba.');
    }

    // Sikeres mentés esetén 200 OK választ küldünk
    return res.status(200).json({ success: true, message: 'Kiválasztás sikeresen mentve.' });

  } catch (err) {
    // Általános hiba esetén 500-as hibakódot küldünk
    return res.status(500).json({ error: err.message || 'Szerver oldali hiba történt.' });
  }
}