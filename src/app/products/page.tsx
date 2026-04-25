'use client';

import { useState, Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 18;

export default function AllProductsPage() {
  const products = getProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {products.length} beauty products available
      </p>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductGrid initialProducts={currentProducts} />
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Product pagination">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (currentPage <= 4) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(pageNum)}
                className={currentPage === pageNum ? "bg-primary text-white" : ""}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      )}
    </div>
  );
}
