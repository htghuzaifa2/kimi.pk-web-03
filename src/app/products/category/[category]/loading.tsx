
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ProductGridSkeleton />
    </div>
  );
}
