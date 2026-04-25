
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import type { AppProduct } from '@/lib/products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { performSearch } from '@/lib/search-utils';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<AppProduct[]>([]);

  useEffect(() => {
    // In a real app, you might fetch this once and cache it.
    const products = getProducts();
    const searchableProducts = products.map(p => ({ ...p, title: p.name }));
    setAllProducts(searchableProducts);
  }, []);

  useEffect(() => {
    async function doSearch() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const searchableProducts = allProducts.map(p => ({ ...p, title: p.name }));
        const results = performSearch(query, searchableProducts).slice(0, 50);
        setProducts(results);
      } catch (error) {
        console.error("Failed to search products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    if (allProducts.length > 0) {
      doSearch();
    }
  }, [query, allProducts]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (!query) {
    return <div className="text-center py-16">Please enter a search term to find products.</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-16">No products found matching your search for <span className="font-semibold">&quot;{query}&quot;</span>.</div>;
  }

  return <ProductGrid products={products} />;
}

function SearchHeading() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        Search Results
      </h1>
      {query ? (
        <p className="mb-8 text-center text-muted-foreground">
          Showing results for: <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
        </p>
      ) : null}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<ProductGridSkeleton />}>
        <SearchHeading />
        <SearchResults />
      </Suspense>
    </div>
  );
}
