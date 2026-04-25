
import { ProductGridSkeleton } from './product-grid-skeleton';
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { ClientProductGrid } from './client-product-grid';

type RelatedProductsProps = {
  currentProductId?: string;
};

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

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
    let allProducts = getProducts();
    if (currentProductId) {
        allProducts = allProducts.filter(p => p.id !== currentProductId);
    }
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
