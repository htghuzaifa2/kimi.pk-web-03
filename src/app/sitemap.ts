
export const dynamic = 'force-static';
import { MetadataRoute } from 'next';
import { APP_NAME } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://www.${APP_NAME}`;

  return [
    {
      url: `${baseUrl}/pages.xml/`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/products.xml/`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/categories.xml/`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/blogs.xml/`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/tools.xml/`,
      lastModified: new Date().toISOString().split('T')[0],
    },
  ];
}
