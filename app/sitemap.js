import { execFileSync } from 'node:child_process';
import { SERVICES_DATA } from '@/constants/services';

const baseUrl = 'https://kovacsbalintfoto.hu';

/* Ha minden URL-nek ugyanaz a lastmod-ja (a build ideje), a Google
   értéktelennek tekinti és eldobja. Ezért útvonalanként a valódi utolsó
   commit dátumát adjuk meg, azokból a forrásfájlokból, amelyek az adott
   oldalt előállítják. Ahol nincs git (pl. tarball-ból épül), a build
   ideje marad — ez rosszabb, de nem hibás. */
const buildTime = new Date();

function lastCommit(paths) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...paths],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    return out ? new Date(out) : buildTime;
  } catch {
    return buildTime;
  }
}

const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', src: ['app/(foto)/page.js', 'app/(foto)/HomeClient.js', 'app/(foto)/layout.js'] },
  { path: '/szolgaltatasok', priority: 0.9, changeFrequency: 'monthly', src: ['app/(foto)/szolgaltatasok/page.js', 'constants/services.js'] },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly', src: ['app/(foto)/portfolio'] },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly', src: ['app/(foto)/about'] },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly', src: ['app/(foto)/contact'] },
  { path: '/velemenyek', priority: 0.6, changeFrequency: 'weekly', src: ['app/(foto)/velemenyek', 'lib/reviews.js'] },
  { path: '/mini-fotozasok/husvet', priority: 0.5, changeFrequency: 'yearly', src: ['app/(foto)/mini-fotozasok/husvet'] },
  { path: '/mini-fotozasok/karacsony', priority: 0.5, changeFrequency: 'yearly', src: ['app/(foto)/mini-fotozasok/karacsony'] },
  { path: '/adatvedelem', priority: 0.2, changeFrequency: 'yearly', src: ['pages/adatvedelem.js', 'constants/legal.js'] },
  { path: '/aszf', priority: 0.2, changeFrequency: 'yearly', src: ['pages/aszf.js', 'constants/legal.js'] },
  { path: '/impresszum', priority: 0.2, changeFrequency: 'yearly', src: ['pages/impresszum.js', 'constants/legal.js'] },
  { path: '/cookie', priority: 0.2, changeFrequency: 'yearly', src: ['pages/cookie.js', 'constants/legal.js'] },
];

export default function sitemap() {
  const serviceRoutes = Object.keys(SERVICES_DATA).map((slug) => ({
    path: `/szolgaltatasok/${slug}`,
    priority: slug === 'eskuvo' ? 0.9 : 0.8,
    changeFrequency: 'monthly',
    src: ['constants/services.js', 'app/(foto)/szolgaltatasok/[slug]'],
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: lastCommit(route.src),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
