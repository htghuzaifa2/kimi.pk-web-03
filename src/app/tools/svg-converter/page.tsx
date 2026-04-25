
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { SvgConverter } from '../components/SvgConverter';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('svg-converter');

  if (!tool) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: tool.title,
    description: 'A free tool to convert any image (PNG, JPG) into a clean, scalable SVG file. Perfect for web developers and designers.',
    openGraph: {
        title: `${tool.title} | ${APP_NAME}`,
        description: 'Use the SVG Converter tool to vectorize your images.',
        type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('svg-converter');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-4xl">
              <SvgConverter />
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
