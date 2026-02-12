const OrderDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="w-full flex flex-col items-center justify-center py-18 relative">

        {/* Help button skeleton */}
        <div className="absolute top-0 right-2 h-8 w-20 bg-muted rounded-md" />

        {/* Image skeleton */}
        <div className="h-36 w-36 bg-muted rounded-md" />

        {/* Title skeleton */}
        <div className="h-4 w-40 bg-muted rounded mt-4" />

        {/* Description skeleton (3 lines) */}
        <div className="flex flex-col gap-2 mt-3 w-[90%] items-center">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-5/6 bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
        </div>

        {/* Status bar skeleton */}
        <div className="w-full flex gap-2 items-center py-7 px-4 bg-muted mt-7">
          <div className="h-6 w-6 bg-muted-foreground/30 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 bg-muted-foreground/30 rounded" />
            <div className="h-3 w-32 bg-muted-foreground/30 rounded" />
          </div>
        </div>

        {/* Bullet text skeleton */}
        <div className="mt-4 w-full px-4">
          <div className="h-3 w-64 bg-muted rounded" />
        </div>

        {/* Review section skeleton */}
        <div className="w-full flex flex-col gap-3 mt-8 px-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-4 w-4 bg-muted rounded"
                />
              ))}
            </div>
            <div className="h-4 w-24 bg-muted rounded" />
          </div>

          <div className="h-3 w-48 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
