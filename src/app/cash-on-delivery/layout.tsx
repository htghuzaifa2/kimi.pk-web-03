
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cash on Delivery',
  description: `Learn how Cash on Delivery (COD) works at ${APP_NAME}. Get step-by-step instructions for placing a COD order and understand the associated fees.`,
};

export default function CashOnDeliveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
