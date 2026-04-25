
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read the Privacy Policy for ${APP_NAME} to understand how we handle data. We respect your privacy and do not collect personal information.`,
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
