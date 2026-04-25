
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { UrduTypingTest } from '../components/UrduTypingTest';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('urdu-typing-test');

  if (!tool) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: tool.title,
    description: 'Test your typing speed (WPM) and accuracy with our free Urdu script typing test. Improve your skills for professional and personal use.',
    openGraph: {
      title: tool.title,
      description: 'Practice and improve your Urdu script typing speed.',
      type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('urdu-typing-test');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl">
          <UrduTypingTest />
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientOnlyRelatedProducts />
        </Suspense>
      </div>
    </>
  );
}
