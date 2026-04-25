
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Read the Terms of Service for using the ${APP_NAME} website.`,
};

export default function TermsOfServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
