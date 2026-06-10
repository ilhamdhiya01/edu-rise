import React from 'react';

const CourseCardItemSkeleton = React.memo(() => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full animate-pulse bg-neutral-200" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category Badge Skeleton */}
        <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />

        {/* Title & Description Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="h-9 w-full animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-9 w-full animate-pulse rounded-lg bg-neutral-200" />
        </div>
      </div>
    </div>
  );
});

CourseCardItemSkeleton.displayName = 'CourseCardItemSkeleton';

export default CourseCardItemSkeleton;
