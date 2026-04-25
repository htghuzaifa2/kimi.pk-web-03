
'use client';

import { Suspense, useEffect, useState } from 'react';
import { getProductsByCategory, type AppProduct } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

export function CategoryClientPage({ category }: { category: string }) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Data fetching is now cleanly on the client
    const categoryProducts = getProductsByCategory(category);
    setProducts(categoryProducts);
    setIsLoading(false);
  }, [category]);


  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      {isLoading ? <ProductGridSkeleton /> : <ClientProductGrid initialProducts={products} />}
    </Suspense>
  );
}
