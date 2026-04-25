
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';

export function ClientProductGrid({ initialProducts }: { initialProducts: AppProduct[] }) {
    const [products, setProducts] = useState<AppProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Instant load - no artificial delay
        setProducts(initialProducts);
        setIsLoading(false);
    }, [initialProducts]);

    if (isLoading) {
        return <ProductGridSkeleton />;
    }

    if (products.length === 0) {
        return <div className="text-center py-16">No products found.</div>;
    }

    return <ProductGrid products={products} />;
}
