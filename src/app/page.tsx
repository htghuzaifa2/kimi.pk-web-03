
import { Suspense } from 'react';
import Link from 'next/link';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';
import MagicBento, { BentoItem } from '@/components/MagicBento';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const allProducts = getProducts();
  // Show 18 products on homepage
  const featuredProducts = allProducts.slice(0, 18);

  // Bento items - placed at bottom before footer
  const heroItems: BentoItem[] = [
    {
      title: 'Beauty Tips & Trends',
      description: 'Expert skincare routines, makeup tutorials, and the latest beauty trends curated just for you.',
      label: 'BEAUTY INSIDER',
      href: '/blogs',
      color: '#1a0011',
    },
    {
      title: 'Beauty Essentials Guide',
      description: 'Discover your perfect skincare routine, find your shade, and explore curated collections for every skin type.',
      label: 'GLOW UP',
      href: '/categories',
      color: '#1a0011',
    },
  ];

  return (
    <div>
      {/* Hero Heading */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
            Radiance Redefined
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium cosmetics, skincare, makeup & fragrances. Your beauty essentials, delivered across Pakistan.
          </p>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4 pb-8 sm:px-6 lg:px-8" aria-label="Featured beauty products">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Beauty Products
        </h2>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientProductGrid initialProducts={featuredProducts} />
        </Suspense>

        {/* Load More Button */}
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-400 text-white font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Link href="/products" className="flex items-center gap-2">
              Load More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Bento Cards - Bottom section before footer */}
      <section className="py-12 md:py-16 bg-background" aria-label="Explore beauty resources">
        <div className="container mx-auto px-4">
          <MagicBento
            items={heroItems}
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={300}
            particleCount={6}
            glowColor="225, 29, 115"
            disableAnimations={false}
          />
        </div>
      </section>
    </div>
  );
}
