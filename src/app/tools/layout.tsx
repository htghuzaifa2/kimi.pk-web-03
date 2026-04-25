
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Developer Tools',
  description: `A collection of handy online tools for developers and designers, provided by ${APP_NAME}, to speed up your creative and development workflow.`,
  alternates: {
    canonical: `https://www.${APP_NAME}/tools/`,
  },
  openGraph: {
    title: `Developer Tools | ${APP_NAME}`,
    description: `A collection of handy online tools for developers and designers, provided by ${APP_NAME}.`,
    url: `https://www.${APP_NAME}/tools/`,
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />
      {children}
    </div>
  );
}
