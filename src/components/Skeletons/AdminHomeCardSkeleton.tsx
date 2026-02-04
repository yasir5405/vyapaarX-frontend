import { Skeleton } from "@/components/ui/skeleton";

const AdminHomeCardSkeleton = () => {
  return (
    <div className="border-2 h-20 flex gap-3 items-center flex-1 p-4 rounded-md">
      {/* Icon skeleton */}
      <Skeleton className="h-10 w-10 rounded-full animate-pulse" />

      <div className="flex flex-col justify-center gap-1 flex-1">
        {/* Name */}
        <Skeleton className="h-3 w-20 animate-pulse" />

        {/* Count */}
        <Skeleton className="h-4 w-14 animate-pulse" />

        {/* Trend */}
        <Skeleton className="h-3 w-24 animate-pulse" />
      </div>
    </div>
  );
};

export default AdminHomeCardSkeleton;
