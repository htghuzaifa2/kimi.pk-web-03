
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { RomanUrduTypingTest } from '../components/RomanUrduTypingTest';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('roman-urdu-typing-test');

  if (!tool) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: tool.title,
    description: 'Test your typing speed (WPM) and accuracy with our free Roman-Urdu typing test. Improve your skills for social media, content creation, and professional work.',
    openGraph: {
        title: tool.title,
        description: 'Practice and improve your Roman-Urdu typing speed.',
        type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('roman-urdu-typing-test');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-4xl">
              <RomanUrduTypingTest />
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
