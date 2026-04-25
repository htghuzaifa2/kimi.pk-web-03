
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${APP_NAME} team. Find our contact details for email and WhatsApp support for any questions or assistance you need.`,
  alternates: {
    canonical: `https://www.${APP_NAME}/contact/`,
  },
  openGraph: {
    title: `Contact Us | ${APP_NAME}`,
    description: `Get in touch with the ${APP_NAME} team for any questions or assistance.`,
    url: `https://www.${APP_NAME}/contact/`,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
