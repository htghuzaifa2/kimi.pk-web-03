
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Inter, Roboto } from 'next/font/google';
import ExternalPrefetch from '@/components/ExternalPrefetch';
import Monetization from '@/components/layout/Monetization';
import JsonLd from '@/components/json-ld';

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: APP_NAME,
  url: `https://www.${APP_NAME}/`,
  logo: `https://www.${APP_NAME}/favicon.ico`,
  sameAs: [
    'https://twitter.com/kimi_pk',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-332-9105111',
    contactType: 'customer service',
    areaServed: 'PK',
    availableLanguage: ['English', 'Urdu'],
  },
};

const websiteData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: APP_NAME,
  url: `https://www.${APP_NAME}/`,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://www.${APP_NAME}/search/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const beautyStoreData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: APP_NAME,
  description: `Premium cosmetics, skincare, makeup & fragrances store in Pakistan`,
  url: `https://www.${APP_NAME}/`,
  priceRange: 'PKR 799 - PKR 15999',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const logoUrl = '/favicon.ico';

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${APP_NAME}/`),
  title: {
    default: `${APP_NAME} - Premium Cosmetics, Beauty & Skincare in Pakistan`,
    template: `%s | ${APP_NAME}`,
  },
  description: `Shop authentic cosmetics, skincare, makeup & fragrances at ${APP_NAME}. Free delivery across Pakistan. 100% genuine beauty products from top brands like Charlotte Tilbury, Huda Beauty, Dr. Althea & more.`,
  keywords: [
    'beauty store Pakistan',
    'cosmetics Pakistan',
    'skincare Pakistan',
    'makeup Pakistan',
    'kimi.pk',
    'fragrance Pakistan',
    'beauty products online Pakistan',
    'buy makeup online Pakistan',
    'skincare routine Pakistan',
    'authentic cosmetics',
    'Charlotte Tilbury Pakistan',
    'Huda Beauty Pakistan',
    'free delivery beauty products',
    'best beauty store',
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
    apple: logoUrl,
  },
  openGraph: {
    title: {
      default: `${APP_NAME} - Premium Cosmetics, Beauty & Skincare in Pakistan`,
      template: `%s | ${APP_NAME}`,
    },
    description: `Shop authentic cosmetics, skincare, makeup & fragrances at ${APP_NAME}. Free delivery across Pakistan. 100% genuine beauty products.`,
    url: `https://www.${APP_NAME}/`,
    siteName: APP_NAME,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Pakistan's Premium Beauty Store`,
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${APP_NAME} - Premium Cosmetics, Beauty & Skincare in Pakistan`,
      template: `%s | ${APP_NAME}`,
    },
    description: `Shop authentic cosmetics, skincare, makeup & fragrances at ${APP_NAME}. Free delivery across Pakistan.`,
    images: [logoUrl],
    creator: '@kimi_pk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `https://www.${APP_NAME}/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable} scroll-smooth`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M9VEBGBQDK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M9VEBGBQDK');
          `}
        </Script>
        <meta name="theme-color" content="#E11D73" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
        <JsonLd data={beautyStoreData} />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow" role="main">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
          </CartProvider>
        </ThemeProvider>
        <ExternalPrefetch />
        <Monetization />
      </body>
    </html>
  );
}
