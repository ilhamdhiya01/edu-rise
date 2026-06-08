'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useUpdatePassword } from '@/lib/hooks/profile';
import { UpdatePasswordInput } from '@/lib/types/profile.types';
import { updatePasswordSchema } from '@/schemas/profile.schema';

type PasswordType = 'password' | 'text';
type PasswordKey = 'password' | 'newPassword' | 'confirmPassword';
type PasswordIcon = 'TbEye' | 'TbEyeOff';

type PasswordVisible = Record<
  PasswordKey,
  Record<'icon', PasswordIcon> & Record<'type', PasswordType>
>;

const DEFAULT_VALUES = {
  password: '',
  newPassword: '',
  confirmPassword: '',
} as const;

const UpdatePasswordForm = memo(() => {
  const { handleUpdatePassword, isUpdatingPassword } = useUpdatePassword();
  const [isPasswordVisible, setIsPasswordVisible] = useState<PasswordVisible>({
    password: {
      icon: 'TbEye',
      type: 'password',
    },
    newPassword: {
      icon: 'TbEye',
      type: 'password',
    },
    confirmPassword: {
      icon: 'TbEye',
      type: 'password',
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleTogglePasswordVisibility = (key: PasswordKey) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [key]: {
        icon: isPasswordVisible[key].icon === 'TbEye' ? 'TbEyeOff' : 'TbEye',
        type: isPasswordVisible[key].type === 'password' ? 'text' : 'password',
      },
    });
  };

  const onSubmit = async (data: UpdatePasswordInput) => {
    try {
      const { confirmPassword, ...payload } = data;
      await handleUpdatePassword(payload);
      reset();
    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full space-y-4">
      <Input
        {...register('password')}
        label="Password"
        placeholder="Masukkan password"
        required
        suffix={{
          icon: isPasswordVisible.password.icon,
          onClick: () => handleTogglePasswordVisibility('password'),
        }}
        type={isPasswordVisible.password.type}
        fullWidth
        error={errors.password?.message}
      />
      <Input
        {...register('newPassword')}
        label="Password Baru"
        placeholder="Masukkan password baru"
        required
        suffix={{
          icon: isPasswordVisible.newPassword.icon,
          onClick: () => handleTogglePasswordVisibility('newPassword'),
        }}
        type={isPasswordVisible.newPassword.type}
        fullWidth
        error={errors.newPassword?.message}
      />
      <Input
        {...register('confirmPassword')}
        label="Konfirmasi Password Baru"
        placeholder="Masukkan konfirmasi password baru"
        required
        suffix={{
          icon: isPasswordVisible.confirmPassword.icon,
          onClick: () => handleTogglePasswordVisibility('confirmPassword'),
        }}
        type={isPasswordVisible.confirmPassword.type}
        fullWidth
        error={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        label="Ubah Password"
        isLoading={isUpdatingPassword}
      />
    </form>
  );
});

UpdatePasswordForm.displayName = 'UpdatePasswordForm';

export default UpdatePasswordForm;
