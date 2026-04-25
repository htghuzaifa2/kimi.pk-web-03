
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description: `Find answers to frequently asked questions about ordering, shipping, returns, and products at ${APP_NAME}.`,
};

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
