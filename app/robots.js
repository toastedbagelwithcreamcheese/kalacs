const baseUrl = 'https://kovacsbalintfoto.hu';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/galeria', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
