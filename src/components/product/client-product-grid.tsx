
'use client';

import type { AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';

export function ClientProductGrid({ initialProducts }: { initialProducts: AppProduct[] }) {
    if (initialProducts.length === 0) {
        return <div className="text-center py-16">No products found.</div>;
    }

    return <ProductGrid products={initialProducts} />;
}
