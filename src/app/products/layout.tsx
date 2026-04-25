
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Products',
  description: `Explore the full range of premium cosmetics, skincare, makeup, fragrances, and more available at ${APP_NAME}. Shop for the latest products with nationwide delivery.`,
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
