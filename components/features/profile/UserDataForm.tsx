'use client';

import { memo } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  whatsapp: '',
  position: '',
} as const;

const UserDataForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof DEFAULT_VALUES>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="h-full space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input
          {...register('firstName')}
          placeholder="Nama Depan"
          label="Nama Depan"
          fullWidth
        />
        <Input
          {...register('lastName')}
          placeholder="Nama Belakang"
          label="Nama Belakang"
          fullWidth
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
        disabled
        label="Email"
        fullWidth
      />
      <Input
        {...register('whatsapp')}
        placeholder="Nomor WhatsApp"
        label="Nomor WhatsApp"
        fullWidth
      />
      <Input
        {...register('position')}
        placeholder="Jabatan"
        label="Jabatan"
        fullWidth
      />
      <Button type="submit" label="Simpan" />
    </form>
  );
});

UserDataForm.displayName = 'UserDataForm';

export default UserDataForm;
