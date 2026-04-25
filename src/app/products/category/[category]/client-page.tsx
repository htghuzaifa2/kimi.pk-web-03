
'use client';

import { getProductsByCategory } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';

export function CategoryClientPage({ category }: { category: string }) {
  const categoryProducts = getProductsByCategory(category);

  if (categoryProducts.length === 0) {
    return <div className="text-center py-16">No products found in this category.</div>;
  }

  return <ClientProductGrid initialProducts={categoryProducts} />;
}
