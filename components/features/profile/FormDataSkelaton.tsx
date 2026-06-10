const FormSkeleton = () => {
  return (
    <div className="h-full animate-pulse space-y-4">
      {/* First row - 2 columns */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-10 rounded bg-gray-200"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-10 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-10 rounded bg-gray-200"></div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <div className="h-4 w-16 rounded bg-gray-200"></div>
        <div className="h-10 rounded bg-gray-200"></div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <div className="h-4 w-28 rounded bg-gray-200"></div>
        <div className="h-10 rounded bg-gray-200"></div>
      </div>

      {/* Position */}
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-10 rounded bg-gray-200"></div>
      </div>

      {/* Button */}
      <div className="h-10 w-24 rounded bg-gray-200"></div>
    </div>
  );
};

export default FormSkeleton;
