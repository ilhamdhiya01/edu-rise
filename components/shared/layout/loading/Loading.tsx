'use client';

const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      {/* Bouncing dots loader */}
      <div className="flex h-10 items-end gap-1.5">
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-blue-400"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-blue-300"
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {/* Loading text */}
      <p className="animate-pulse text-sm font-medium text-gray-500">
        Memuat konten...
      </p>
    </div>
  );
};

export default DashboardSkeleton;
