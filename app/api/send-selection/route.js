// app/api/send-selection/route.js
import { supabase } from '@/lib/supabaseClient';
import { send } from '@emailjs/nodejs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { galleryId } = await request.json();

    if (!galleryId) {
        return NextResponse.json({ error: 'Hiányzó galéria azonosító' }, { status: 400 });
    }

    try {
        // 1. Kérjük le a legfrissebb adatokat a Supabase-ból
        const { data, error } = await supabase
            .from('galleries')
            .select('client_name, client_email, selected_images')
            .eq('id', galleryId)
            .single();

        if (error || !data || !data.selected_images || data.selected_images.length === 0) {
            throw new Error('Nem található galéria vagy nincsenek kiválasztott képek.');
        }

        // 2. Formázzuk az adatokat az email sablonhoz
        const templateParams = {
            client_name: data.client_name,
            client_email: data.client_email,
            gallery_id: galleryId,
            selection_count: data.selected_images.length,
            // A képek listáját egy szép, felsorolásként formázzuk
            image_list_html: `<ul>${data.selected_images.map(id => `<li>${id}</li>`).join('')}</ul>`,
            // Egyszerű szöveges verzió, ha a sablon nem támogatja a HTML-t
            image_list_text: data.selected_images.join('\n'),
        };

        // 3. Emailek elküldése az EmailJS-sel
        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const adminTemplateId = process.env.EMAILJS_TEMPLATE_ID_ADMIN;
        const clientTemplateId = process.env.EMAILJS_TEMPLATE_ID_CLIENT;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        // Email küldése neked (admin)
        await send(serviceId, adminTemplateId, templateParams, { publicKey, privateKey });

        // Email küldése az ügyfélnek
        await send(serviceId, clientTemplateId, templateParams, { publicKey, privateKey });

        return NextResponse.json({ success: true, message: 'Emailek sikeresen elküldve' });

    } catch (error) {
        console.error('Hiba az email küldés során:', error);
        return NextResponse.json({ error: 'Sikertelen email küldés' }, { status: 500 });
    }
}