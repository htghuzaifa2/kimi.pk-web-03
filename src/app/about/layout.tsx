
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${APP_NAME}, Pakistan\u2019s destination for authentic beauty products and cosmetics. Discover our mission to provide quality products and exceptional service nationwide.`,
  alternates: {
    canonical: `https://www.${APP_NAME}/about/`,
  },
  openGraph: {
    title: `About Us | ${APP_NAME}`,
    description: `Learn about ${APP_NAME}, Pakistan\u2019s destination for authentic beauty products and cosmetics.`,
    url: `https://www.${APP_NAME}/about/`,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
