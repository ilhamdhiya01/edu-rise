import Image from 'next/image';
import { memo } from 'react';
const ImageUpload = memo(() => {
  return (
    <div className="flex h-full w-full shrink-0 flex-col items-center justify-center gap-6 rounded-lg border border-gray-300 p-4 md:p-6 lg:p-11">
      {/* Wrapper card */}
      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-xl">
        <Image
          src="/images/default.webp"
          alt="Profile"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>
      <p className="text-center text-sm text-gray-500">
        Ukuran gambar harus di bawah 1MB dan rasio gambar harus 1:1
      </p>
    </div>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
