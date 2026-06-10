'use client';

import Image from 'next/image';

import { useUser } from '@/lib/hooks/useUser';

const ProfileInfo = () => {
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col items-center gap-4 p-4 md:flex-row md:p-6 lg:p-8">
      <div className="size-22 shrink-0 overflow-hidden rounded-full drop-shadow-xl md:size-28">
        <Image
          src={user?.image || '/images/default.webp'}
          alt="Profile"
          width={110}
          height={110}
          className="object-cover"
        />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-base lg:text-lg">
          An enthusiast developer with ability to design with various tool
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
