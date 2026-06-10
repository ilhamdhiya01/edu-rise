'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import { RegisterInput } from '@/lib/types/auth.types';
import { LOGIN_PATH } from '@/routes';
import { registerSchema } from '@/schemas/auth.schema';

const DEFAULT_VALUES: RegisterInput = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const RegisterForm = React.memo(() => {
  const { handleRegister, isRegistering } = useAuth();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await handleRegister(data);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('firstName')}
          prefix={{
            icon: 'TbUser',
          }}
          fullWidth
          label="First Name"
          placeholder="Enter your first name"
          error={errors.firstName?.message}
        />
        <Input
          {...register('lastName')}
          prefix={{
            icon: 'TbUser',
          }}
          fullWidth
          label="Last Name"
          placeholder="Enter your last name"
          error={errors.lastName?.message}
        />
      </div>

      <Input
        {...register('email')}
        fullWidth
        label="Email"
        placeholder="Enter your email"
        prefix={{
          icon: 'TbMail',
        }}
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        fullWidth
        label="Password"
        placeholder="Enter your password"
        type={isShowPassword ? 'text' : 'password'}
        suffix={{
          icon: isShowPassword ? 'TbEyeOff' : 'TbEye',
          onClick: () => setIsShowPassword(!isShowPassword),
        }}
        error={errors.password?.message}
      />

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          label="Daftar"
          fullWidth
          isLoading={isRegistering}
        />
        <span className="ml-auto text-sm">
          Sudah punya akun?{' '}
          <Link
            href={LOGIN_PATH}
            className="text-primary-600 font-medium hover:underline"
          >
            Masuk
          </Link>
        </span>
      </div>
    </form>
  );
});

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
