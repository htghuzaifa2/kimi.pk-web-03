
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-2 w-6" />
            <Skeleton className="h-2 w-2" />
            <Skeleton className="h-2 w-2" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-full flex-grow" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
