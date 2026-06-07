'use client';

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

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
    formState: { errors },
  } = useForm<typeof DEFAULT_VALUES>({
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

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full space-y-4">
      <Input
        {...register('password')}
        label="Password"
        suffix={{
          icon: isPasswordVisible.password.icon,
          onClick: () => handleTogglePasswordVisibility('password'),
        }}
        type={isPasswordVisible.password.type}
        fullWidth
      />
      <Input
        {...register('newPassword')}
        label="Password Baru"
        suffix={{
          icon: isPasswordVisible.newPassword.icon,
          onClick: () => handleTogglePasswordVisibility('newPassword'),
        }}
        type={isPasswordVisible.newPassword.type}
        fullWidth
      />
      <Input
        {...register('confirmPassword')}
        label="Konfirmasi Password Baru"
        suffix={{
          icon: isPasswordVisible.confirmPassword.icon,
          onClick: () => handleTogglePasswordVisibility('confirmPassword'),
        }}
        type={isPasswordVisible.confirmPassword.type}
        fullWidth
      />
      <Button type="submit" label="Ubah Password" />
    </form>
  );
});

UpdatePasswordForm.displayName = 'UpdatePasswordForm';

export default UpdatePasswordForm;
