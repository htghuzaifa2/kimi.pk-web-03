export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card"
                >
                    <div className="aspect-square w-full bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                        <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
                        <div className="h-4 w-1/2 rounded-full bg-muted animate-pulse" />
                        <div className="flex justify-between items-center pt-2">
                            <div className="h-6 w-20 rounded-full bg-primary/20 animate-pulse" />
                            <div className="h-9 w-9 rounded-full bg-primary/10 animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
