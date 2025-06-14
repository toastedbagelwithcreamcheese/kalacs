// pages/api/gallery-login.js
import { supabase } from '@/lib/supabaseClient';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  // Csak a POST kéréseket fogadjuk el
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { galleryId, password } = req.body;

  if (!galleryId || !password) {
    return res.status(400).json({ error: 'Hiányzó adatok' });
  }

  // Jelszó ellenőrzése a Supabase-ban
  const { data, error } = await supabase
    .from('galleries')
    .select('password')
    .eq('id', galleryId)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Nincs ilyen galéria' });
  }

  if (data.password === password) {
    // Cookie beállítása a 'Set-Cookie' headerrel
    const cookie = serialize(`gallery-auth-${galleryId}`, 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 nap
    });
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Hibás jelszó' });
  }
}