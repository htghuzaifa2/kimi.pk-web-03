
export const dynamic = 'force-static';
import { APP_NAME } from '@/lib/constants';

export async function GET() {
  const baseUrl = `https://www.${APP_NAME}`;
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products/`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/categories/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blogs/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/faq/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/return-policy/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/shipping-policy/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/cash-on-delivery/`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service/`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
      .map(
        (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
      )
      .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
