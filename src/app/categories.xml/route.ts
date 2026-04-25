export const dynamic = 'force-static';
import { getAllCategories } from '@/lib/products';
import { APP_NAME } from '@/lib/constants';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const baseUrl = `https://www.${APP_NAME}`;
  const categories = getAllCategories();
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories
      .map(
        (category) => `
    <url>
      <loc>${baseUrl}/products/category/${escapeXml(encodeURIComponent(category))}/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
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
