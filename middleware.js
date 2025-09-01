import { NextResponse } from 'next/server';

// Ez a funkció minden, a "matcher"-ben megadott útvonalra lefut
export function middleware(req) {
  // 1. Kinyerjük a környezeti változókból a helyes felhasználónevet és jelszót
  const basicAuthUser = process.env.ADMIN_USER;
  const basicAuthPass = process.env.ADMIN_PASSWORD;

  // 2. Ellenőrizzük, hogy a környezeti változók be vannak-e állítva
  if (!basicAuthUser || !basicAuthPass) {
    // Ha nincsenek beállítva, egy hibaüzenetet adunk és letiltjuk a hozzáférést
    return new NextResponse('Authentication credentials are not set.', {
      status: 500,
    });
  }

  // 3. Kinyerjük az 'Authorization' fejlécet a bejövő kérésből
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    // 4. Dekódoljuk a base64 kódolású adatokat
    const auth = authHeader.split(' ')[1];
    const [user, pass] = atob(auth).split(':');

    // 5. Összehasonlítjuk a megadott adatokat a helyes adatokkal
    if (user === basicAuthUser && pass === basicAuthPass) {
      // Ha minden rendben, engedélyezzük a továbbhaladást
      return NextResponse.next();
    }
  }

  // 6. Ha a hitelesítés sikertelen, 401-es "Unauthorized" választ küldünk,
  //    ami arra utasítja a böngészőt, hogy dobja fel a jelszóbekérő ablakot.
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// A konfiguráció megadja, hogy a middleware mely útvonalakra érvényes
export const config = {
  matcher: '/admin/:path*', // Minden /admin/ kezdetű útvonalra
};