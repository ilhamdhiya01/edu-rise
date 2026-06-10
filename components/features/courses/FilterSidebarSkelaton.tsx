import React from 'react';

const FilterSidebarSkeleton = React.memo(() => {
  return (
    <aside className="sticky top-25 flex h-[calc(100vh-6rem)] w-full flex-col gap-4 self-start overflow-auto">
      {/* Filter Header Skeleton */}
      <div className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-neutral-100 px-4 py-3">
        <div className="h-5 w-5 animate-pulse rounded bg-neutral-300" />
        <div className="h-5 w-16 animate-pulse rounded bg-neutral-300" />
      </div>

      {/* Categories List Skeleton */}
      <div className="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            {/* Category Item */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {/* Icon Skeleton */}
                <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200" />
                {/* Category Name Skeleton */}
                <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
              </div>
              {/* Chevron Icon Skeleton */}
              <div className="h-5 w-5 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
});

FilterSidebarSkeleton.displayName = 'FilterSidebarSkeleton';

export default FilterSidebarSkeleton;
