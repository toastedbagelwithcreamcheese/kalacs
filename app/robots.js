const baseUrl = 'https://kovacsbalintfoto.hu';

/* Ezek a botok tanítanak / válaszolnak: ha nincs rájuk nevesített szabály,
   a szigorúbb működésűek egy része inkább kihagy. Nálunk épp az a cél, hogy
   egy „ki fotóz autót Zalaegerszegen?" kérdésre bekerüljünk a válaszba,
   ezért mindegyiket kifejezetten beengedjük. */
const AI_AGENTS = [
  'GPTBot',          // OpenAI - tanítás
  'OAI-SearchBot',   // OpenAI - ChatGPT keresés
  'ChatGPT-User',    // ChatGPT - felhasználó által megnyitott hivatkozás
  'ClaudeBot',       // Anthropic - tanítás
  'Claude-User',     // Claude - felhasználó által megnyitott hivatkozás
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / Vertex AI tanítás
  'Applebot-Extended',
  'Bingbot',
  'CCBot',           // Common Crawl - sok modell innen tanul
  'meta-externalagent',
];

const DISALLOW = ['/admin', '/galeria', '/api', '/thank-you'];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
