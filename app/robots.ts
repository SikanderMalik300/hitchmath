import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/registry';

// allow all; explicitly allow the named crawlers; do not block Google-Extended or GPTBot (A3).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const agents = ['*', 'Googlebot', 'Bingbot', 'Mediapartners-Google', 'OAI-SearchBot', 'PerplexityBot'];
  return {
    rules: agents.map((userAgent) => ({ userAgent, allow: '/' })),
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
