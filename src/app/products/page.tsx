'use client';

import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';
import { Pagination } from '@/components/product/pagination';
import { useSearchParams } from 'next/navigation';

const PRODUCTS_PER_PAGE = 18;

function ProductsList() {
  const products = getProducts();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductGrid initialProducts={currentProducts} />
      </Suspense>

      {totalPages > 1 && (
        <nav className="mt-10 flex justify-center" aria-label="Product pagination">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </nav>
      )}
    </>
  );
}

export default function AllProductsPage() {
  const products = getProducts();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {products.length} beauty products available
      </p>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
