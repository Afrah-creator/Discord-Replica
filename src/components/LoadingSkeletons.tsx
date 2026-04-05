import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Server sidebar skeleton */}
      <div className="w-[72px] flex-shrink-0 bg-darker-navy flex flex-col items-center py-3 gap-2">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-8 h-0.5 rounded-full" />
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-8 h-0.5 rounded-full" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-12 h-12 rounded-2xl" />
        ))}
        <Skeleton className="w-12 h-12 rounded-2xl" />
      </div>

      {/* Channel sidebar skeleton */}
      <div className="w-60 flex-shrink-0 bg-card flex flex-col">
        <Skeleton className="h-12 border-b border-border" />
        <div className="flex-1 p-2 space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded" />
          ))}
        </div>
        <Skeleton className="h-[52px] border-t border-border" />
      </div>

      {/* Main chat skeleton */}
      <div className="flex-1 flex flex-col">
        <Skeleton className="h-12 border-b border-border" />
        <div className="flex-1 p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Members sidebar skeleton */}
      <div className="w-60 flex-shrink-0 bg-card border-l border-border hidden lg:block">
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-64 rounded" />
      </div>
    </div>
  );
}

export function ServerListSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="space-y-1 flex-1">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-2 w-14 rounded" />
      </div>
    </div>
  );
}

export function ChannelListSkeleton() {
  return (
    <div className="space-y-1 px-2">
      <Skeleton className="h-4 w-16 rounded" />
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-7 w-full rounded" />
      ))}
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-3 w-24 rounded" />
        <Skeleton className="h-2 w-12 rounded" />
      </div>
    </div>
  );
}
