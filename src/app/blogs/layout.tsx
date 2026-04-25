
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blogs',
  description: `Explore expert beauty tips, skincare routines, makeup tutorials, and cosmetics insights from ${APP_NAME}. Your ultimate glow-up guide for Pakistan.`,
  openGraph: {
    title: `Beauty Blog | ${APP_NAME}`,
    description: `Explore expert beauty tips, skincare routines, makeup tutorials, and cosmetics insights from ${APP_NAME}.`,
    url: `https://www.${APP_NAME}/blogs`,
  },
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}
