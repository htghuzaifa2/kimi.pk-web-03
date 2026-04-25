
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Checkout',
  description: `Complete your order securely at ${APP_NAME}. Enter your shipping details and choose your payment method to finalize your purchase.`,
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
