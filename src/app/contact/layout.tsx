
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${APP_NAME} team. Find our contact details for email and WhatsApp support for any questions or assistance you need.`,
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
