
'use client';

import { Suspense } from 'react';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { AppProduct } from '@/lib/products';
import { ClientProductGrid } from './client-product-grid';

// Fisher-Yates shuffle algorithm
function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const RECOMMENDATION_COUNT = 4;

export function ClientOnlyRelatedProducts() {
  const allProducts = getProducts();
  const relatedProducts = shuffle(allProducts).slice(0, RECOMMENDATION_COUNT);

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductGrid initialProducts={relatedProducts} />
      </Suspense>
    </div>
  );
}
