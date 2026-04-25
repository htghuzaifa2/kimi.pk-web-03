export const dynamic = 'force-static';
import { getBlogPosts } from '@/lib/blog-data';
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
  const posts = getBlogPosts();
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
      .map(
        (post) => `
    <url>
      <loc>${baseUrl}/blogs/${escapeXml(post.slug)}/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
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
