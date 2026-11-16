import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/app/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal endpoints do not need crawling; static assets stay open so
        // search engines can render the pages correctly.
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
