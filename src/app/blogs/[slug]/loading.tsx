
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose dark:prose-invert mx-auto max-w-4xl space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
