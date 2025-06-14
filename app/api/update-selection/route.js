// app/api/update-selection/route.js
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { galleryId, selections } = await request.json();

  if (!galleryId || !selections) {
    return NextResponse.json({ error: 'Hiányzó adatok' }, { status: 400 });
  }

  const { error } = await supabase
    .from('galleries')
    .update({ selected_images: selections })
    .eq('id', galleryId);

  if (error) {
    console.error('Supabase update error:', error);
    return NextResponse.json({ error: 'Sikertelen mentés' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}