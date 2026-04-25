
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductGridSkeleton />
    </div>
  );
}
