'use client';

import { getTools } from '@/lib/tool-data';
import ToolSearch from './components/ToolSearch';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

const ITEMS_PER_PAGE = 20;

export default function ToolsPage() {
  const allTools = getTools();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center py-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-20 pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500 animate-in fade-in slide-in-from-top-8 duration-1000 font-headline">
          The Modern Toolkit
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium px-4">
          Accelerate your workflow with our next-generation suite of AI-enhanced creative utilities.
        </p>
      </header>
      <main className="py-8">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ToolSearch allTools={allTools} itemsPerPage={ITEMS_PER_PAGE} />
        </Suspense>
      </main>
    </div>
  );
}
