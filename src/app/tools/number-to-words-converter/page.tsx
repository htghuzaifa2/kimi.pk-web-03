
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { NumberToWordsConverter } from '../components/NumberToWordsConverter';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('number-to-words-converter');

  if (!tool) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: tool.title,
    description: 'A free online tool to convert numbers into English words instantly. Perfect for writing checks, formal documents, or educational purposes.',
    openGraph: {
        title: tool.title,
        description: `Use the ${tool.title} tool.`,
        type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('number-to-words-converter');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-2xl">
              <NumberToWordsConverter />
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
