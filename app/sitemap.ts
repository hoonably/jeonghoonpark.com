import { MetadataRoute } from 'next';
import { getBlogPostsAction } from './actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jeonghoonpark.com';
  
  // 1. Fetch dynamic blog slugs
  const posts = await getBlogPostsAction();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateStr ? new Date(post.dateStr) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 2. Static routes
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
