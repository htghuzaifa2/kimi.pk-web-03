import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                >
                    <Skeleton className="aspect-square w-full rounded-t-2xl" />
                    <div className="p-4 space-y-3">
                        <Skeleton className="h-3 w-3/4 rounded-full" />
                        <Skeleton className="h-3 w-1/2 rounded-full" />
                        <div className="flex gap-1.5 pt-1">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-4 w-16 rounded-md" />
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-9 w-16 rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
