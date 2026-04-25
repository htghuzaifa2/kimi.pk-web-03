
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${APP_NAME}, Pakistan’s destination for authentic beauty products and cosmetics. Discover our mission to provide quality products and exceptional service nationwide.`,
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
