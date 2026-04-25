export const dynamic = 'force-static';
import { MetadataRoute } from 'next';
import { APP_NAME } from '@/lib/constants';
import { getProducts, getAllCategories } from '@/lib/products';
import { getBlogPosts } from '@/lib/blog-data';
import { getTools } from '@/lib/tool-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://www.${APP_NAME}`;
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products/`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blogs/`, lastModified: today, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/tools/`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact/`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq/`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/checkout/`, lastModified: today, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/search/`, lastModified: today, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service/`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/return-policy/`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/shipping-policy/`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cash-on-delivery/`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Product pages
  const products = getProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}/`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categories = getAllCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/category/${encodeURIComponent(cat)}/`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPosts = getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}/`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Tool pages
  const tools = getTools();
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}/`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // XML feed references
  const xmlFeeds: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/products.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/blogs.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/categories.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/tools.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/pages.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/google-feed.xml/`, lastModified: today, priority: 0.1 },
    { url: `${baseUrl}/bing-feed.xml/`, lastModified: today, priority: 0.1 },
  ];

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages, ...toolPages, ...xmlFeeds];
}
