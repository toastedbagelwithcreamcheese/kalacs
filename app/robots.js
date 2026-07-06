const baseUrl = 'https://kovacsbalintfoto.hu';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/elszamolas', '/galeria', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
