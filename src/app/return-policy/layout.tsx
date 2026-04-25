
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description: `Read the official Return & Refund Policy for ${APP_NAME} to understand the conditions and process for returning a product.`,
};

export default function ReturnPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
