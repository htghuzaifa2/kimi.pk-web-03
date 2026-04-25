import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { APP_NAME } from '@/lib/constants';
import JsonLd from '@/components/json-ld';

export function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | ${APP_NAME}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = !product.inStock;
  const availability = isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";

  const siteUrl = `https://www.${APP_NAME}`;
  const productUrl = `${siteUrl}/products/${product.slug}/`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0]?.url,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'PKR',
      price: product.price.toFixed(2),
      availability: availability,
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteUrl}/products/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <JsonLd data={breadcrumbData} />
      <ProductDetailsClient product={product} />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts currentProductId={product.id} />
        </Suspense>
      </div>
    </>
  );
}
