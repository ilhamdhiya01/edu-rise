'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useUpdateUserData } from '@/lib/hooks/profile';
import { useUser } from '@/lib/hooks/useUser';
import { UserDataInput } from '@/lib/types/profile.types';
import { userDataSchema } from '@/schemas/profile.schema';
import { useAuthStore } from '@/stores/useAuthStore';

import FormSkeleton from './FormDataSkelaton';

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  position: '',
};

const UserDataForm = React.memo(() => {
  const { isLoading } = useUser();

  const userData = useAuthStore(
    useShallow((state) => ({
      firstName: state.user?.firstName ?? '',
      lastName: state.user?.lastName ?? '',
      username: state.user?.username ?? '',
      email: state.user?.email ?? '',
      phoneNumber: state.user?.phoneNumber ?? '',
      position: state.user?.position ?? '',
    }))
  );

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
