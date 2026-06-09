'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { getUserFromToken } from '@/lib/helpers';
import { useUpdateUserData } from '@/lib/hooks/profile';
import { UserDataInput } from '@/lib/types/profile.types';
import { userDataSchema } from '@/schemas/profile.schema';
import { getUserByEmail } from '@/services/auth.service';

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  position: '',
};

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

const UserDataForm = React.memo(() => {
  const userToken = getUserFromToken();

  // ✅ Granular selector: only re-renders when user profile fields change.
  const { data: userData, isLoading } = useQuery({
    queryKey: ['currentUser', userToken?.email],
    queryFn: () => getUserByEmail(userToken?.email),
    enabled: !!userToken?.email,
    select: (res) => ({
      firstName: res?.data?.firstName ?? '',
      lastName: res?.data?.lastName ?? '',
      username: res?.data?.username ?? '',
      email: res?.data?.email ?? '',
      phoneNumber: res?.data?.phoneNumber ?? '',
      position: res?.data?.position ?? '',
    }),
  });

  const { handleUpdateUserData, isUpdating } = useUpdateUserData();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserDataInput>({
    resolver: zodResolver(userDataSchema),
    defaultValues: DEFAULT_VALUES,
    values: userData,
  });

  const onSubmit = handleSubmit(async (data) => {
    await handleUpdateUserData(data);
  });

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <form className="h-full space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input
          {...register('firstName')}
          placeholder="Nama Depan"
          label="Nama Depan"
          fullWidth
          required
          error={errors.firstName?.message}
        />
        <Input
          {...register('lastName')}
          placeholder="Nama Belakang"
          label="Nama Belakang"
          fullWidth
          required
          error={errors.lastName?.message}
        />
      </div>
      <Input
        {...register('username')}
        placeholder="Username"
        label="Username"
        fullWidth
      />
      <Input
        {...register('email')}
        placeholder="Email"
        label="Email"
        fullWidth
        // disabled
      />
      <Input
        {...register('phoneNumber')}
        placeholder="Nomor Telepon"
        label="Nomor Telepon"
        fullWidth
      />
      <Input
        {...register('position')}
        placeholder="Jabatan"
        label="Jabatan"
        fullWidth
        required
        error={errors.position?.message}
      />
      <Button
        type="submit"
        label="Simpan"
        isLoading={isUpdating}
        disabled={!isDirty}
      />
    </form>
  );
});

UserDataForm.displayName = 'UserDataForm';

export default UserDataForm;
