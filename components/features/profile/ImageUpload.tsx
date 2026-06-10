'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';

import Icon from '@/components/ui/icon';
import { getUserFromToken } from '@/lib/helpers';
import { useUpdateUserImage } from '@/lib/hooks/profile';
import { getUserByEmail } from '@/services/auth.service';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

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

const ImageUpload = React.memo(() => {
  const userToken = getUserFromToken();

  // ✅ Granular selector: only re-renders when the image field changes.
  const { data: image, isLoading } = useQuery({
    queryKey: ['currentUser', userToken?.email],
    queryFn: () => getUserByEmail(userToken?.email),
    enabled: !!userToken?.email,
    select: (res) => res?.data?.image ?? null,
  });

  const { handleUpdateUserImage, isUpdatingImage } = useUpdateUserImage();
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        reject('Ukuran file melebihi 1MB');
        return;
      }

      // Check aspect ratio (1:1)
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        const { width, height } = img;
        const aspectRatio = width / height;

        // Allow small tolerance (0.95 - 1.05 for 1:1 ratio)
        if (aspectRatio < 0.95 || aspectRatio > 1.05) {
          reject('Rasio gambar harus 1:1 (kotak/square)');
          return;
        }

        resolve(true);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject('File gambar tidak valid');
      };

      img.src = objectUrl;
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError(null);

    try {
      // Validate image
      await validateImage(file);

      // Upload image
      await handleUpdateUserImage(file);
    } catch (error) {
      setValidationError(error as string);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return <ImageSkeleton />;
  }

  return (
    <div className="flex h-full w-full shrink-0 flex-col items-center justify-center gap-6 rounded-lg border border-gray-300 p-4 md:p-6 lg:p-11">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Preview with Upload Overlay */}
      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-lg">
        {/* Profile Image */}
        <Image
          src={image || '/images/default.webp'}
          alt="Profile"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
          priority
        />

        {/* Upload Overlay */}
        <div
          onClick={handleUploadClick}
          className={classNames(
            'absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-2 bg-gray-900/70 py-3 text-white transition-colors hover:bg-gray-900/80',
            {
              'pointer-events-none cursor-not-allowed': isUpdatingImage,
            }
          )}
        >
          <Icon icon="TbUpload" size={18} />
          <span className="text-sm font-medium">
            {isUpdatingImage ? 'Mengunggah...' : 'Unggah foto diri'}
          </span>
        </div>
      </div>

      {/* Validation Text */}
      <p
        className={`text-center text-sm ${
          validationError ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {validationError ||
          'Ukuran gambar harus di bawah 1MB dan rasio gambar harus 1:1'}
      </p>
    </div>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
