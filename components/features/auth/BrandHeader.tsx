import { memo } from 'react';

const BrandHeader = memo(({ subtitle }: { subtitle?: string }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-primary-500 text-5xl font-bold md:text-6xl">
        EduRise
      </h1>
      <p className="text-gray-500 md:text-base">
        Tingkatkan kemampuanmu, raih masa depan lebih baik
      </p>
      {subtitle && (
        <h2 className="pt-4 text-2xl font-semibold text-gray-800 md:text-3xl">
          {subtitle}
        </h2>
      )}
    </div>
  );
});

BrandHeader.displayName = 'BrandHeader';

export default BrandHeader;
