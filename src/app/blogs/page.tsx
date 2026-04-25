'use client';

import { getBlogPosts } from '@/lib/blog-data';
import BlogSearch from './components/BlogSearch';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

const ITEMS_PER_PAGE = 24;

export default function BlogsPage() {
  const allPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-10 from-primary pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary animate-in fade-in slide-in-from-bottom-4 duration-700">
            Beauty & Wellness
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500 animate-in fade-in slide-in-from-top-8 duration-1000 font-headline">
            Glow & Inspire
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium animate-in fade-in duration-1000 delay-300">
            Expert beauty tips, skincare science, makeup trends, and the latest in cosmetics — your glow-up guide from kimi.pk.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<ProductGridSkeleton />}>
          <BlogSearch allPosts={allPosts} itemsPerPage={ITEMS_PER_PAGE} />
        </Suspense>
      </main>
    </div>
  );
}
