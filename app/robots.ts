import { MetadataRoute } from 'next';
import { profile } from '@/data/profile';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `https://jeonghoonpark.com/sitemap.xml`,
  };
}
