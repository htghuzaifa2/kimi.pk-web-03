'use client';

import type { AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';

type ProductGridProps = {
  products: AppProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4" role="list" aria-label="Product grid">
      {products.map((product) => (
        <div role="listitem" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
