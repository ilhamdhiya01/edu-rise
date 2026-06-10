const ImageSkeleton = () => {
  return (
    <div className="flex h-full w-full shrink-0 flex-col items-center justify-center gap-6 rounded-lg border border-gray-300 p-4 md:p-6 lg:p-11">
      {/* Image skeleton */}
      <div className="relative aspect-square w-full max-w-[280px] animate-pulse overflow-hidden rounded-3xl bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Text skeleton */}
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default ImageSkeleton;
