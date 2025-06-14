// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Csak akkor fusson, ha a galéria főoldalát próbálják elérni
  if (/^\/galeria\/[^\/]+$/.test(pathname)) {
    const galleryId = pathname.split('/').pop();
    const isAuthenticated = request.cookies.has(`gallery-auth-${galleryId}`);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/galeria/login/${galleryId}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Ez biztosítja, hogy a middleware csak a galéria oldalakra fusson le,
  // az API route-okra, képekre stb. nem.
  matcher: '/galeria/:galleryId',
};