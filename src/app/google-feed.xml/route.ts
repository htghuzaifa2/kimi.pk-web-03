
export const dynamic = 'force-static';
import { getProducts } from '@/lib/products';
import { APP_NAME } from '@/lib/constants';

// Function to escape XML special characters
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
  const products = getProducts();
  const siteUrl = `https://www.${APP_NAME}`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXml(APP_NAME)} Product Feed for Google</title>
    <link>${siteUrl}</link>
    <description>Product feed for ${escapeXml(APP_NAME)} for Google Merchant Center</description>
    ${products
      .map(
        (p) => `
      <item>
        <g:id>${escapeXml(p.id)}</g:id>
        <g:title>${escapeXml(p.name)}</g:title>
        <g:description>${escapeXml(p.description)}</g:description>
        <g:link>${siteUrl}/products/${escapeXml(p.slug)}/</g:link>
        ${p.images?.[0]?.url ? `<g:image_link>${escapeXml(p.images[0].url)}</g:image_link>` : ''}
        <g:availability>${p.inStock ? 'in stock' : 'out of stock'}</g:availability>
        <g:price>${p.price.toFixed(2)} PKR</g:price>
        <g:brand>${escapeXml(p.specifications?.Brand || APP_NAME)}</g:brand>
        ${p.specifications?.Model ? `<g:mpn>${escapeXml(p.specifications.Model)}</g:mpn>` : '<g:identifier_exists>no</g:identifier_exists>'}
        <g:condition>new</g:condition>
      </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
