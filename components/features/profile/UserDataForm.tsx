'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useProfile } from '@/lib/hooks/useProfile';
import { useUser } from '@/lib/hooks/useUser';
import { User } from '@/lib/types/auth.types';
import { UserDataInput } from '@/lib/types/profile.types';
import { userDataSchema } from '@/schemas/profile.schema';

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

const UserDataForm = memo(() => {
  const { user, isLoading } = useUser();
  const { handleUpdateUserData, isUpdating } = useProfile();

  const mapUserToFormData = useCallback(
    (user: User | null): UserDataInput => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      position: user?.position || '',
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserDataInput>({
    resolver: zodResolver(userDataSchema),
    defaultValues: DEFAULT_VALUES,
    values: user ? mapUserToFormData(user) : undefined,
  });

  const onSubmit = handleSubmit((data) => {
    handleUpdateUserData(data);
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
