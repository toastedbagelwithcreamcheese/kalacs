// app/api/gallery-login/route.js
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
console.log('POST API hívás érkezett 🎯');
  const { galleryId, password } = await request.json();
  console.log('POST API hívás érkezett 🎯2');

  if (!galleryId || !password) {
    return NextResponse.json({ error: 'Hiányzó adatok' }, { status: 400 });
  }

  // Jelszó ellenőrzése a Supabase adatbázisban
  const { data, error } = await supabase
    .from('galleries')
    .select('password')
    .eq('id', galleryId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Nincs ilyen galéria' }, { status: 404 });
  }

  // FIGYELEM: Ez egy egyszerű szöveges jelszó ellenőrzés.
  // Éles környezetben használj titkosított (hashed) jelszavakat!
  if (data.password === password) {
    // Sikeres bejelentkezés: beállítjuk a cookie-t
    cookies().set(`gallery-auth-${galleryId}`, 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 napig érvényes
    });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Hibás jelszó' }, { status: 401 });
  }
}