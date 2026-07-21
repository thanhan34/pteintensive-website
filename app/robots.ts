import type { MetadataRoute } from 'next';
import { getCanonicalUrl, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/', '/setup-admin/', '/debug-auth/', '/_next/', '/private/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/setup-admin/', '/debug-auth/', '/api/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin/', '/setup-admin/', '/debug-auth/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: getCanonicalUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}