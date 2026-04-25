
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: `Learn about the shipping and delivery policies at ${APP_NAME}, including information on shipping charges, delivery times, and payment methods.`,
  alternates: {
    canonical: `https://www.${APP_NAME}/shipping-policy/`,
  },
};

export default function ShippingPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
