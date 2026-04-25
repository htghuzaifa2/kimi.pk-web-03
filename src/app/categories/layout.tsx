
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse all product categories available at kimi.pk. Find beauty products, cosmetics, skincare, and more.',
  alternates: {
    canonical: `https://www.${APP_NAME}/categories/`,
  },
  openGraph: {
    title: `Product Categories | ${APP_NAME}`,
    description: 'Browse all product categories available at kimi.pk. Find beauty products, cosmetics, skincare, and more.',
    url: `https://www.${APP_NAME}/categories/`,
  },
};

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
