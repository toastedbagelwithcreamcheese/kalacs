import { SERVICES_DATA } from '@/constants/services';

const baseUrl = 'https://kovacsbalintfoto.hu';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/velemenyek', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/mini-fotozasok/husvet', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/mini-fotozasok/karacsony', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/adatvedelem', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/aszf', priority: 0.2, changeFrequency: 'yearly' },
  ];

  const serviceRoutes = Object.keys(SERVICES_DATA).map((slug) => ({
    path: `/szolgaltatasok/${slug}`,
    priority: slug === 'eskuvo' ? 0.9 : 0.8,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
