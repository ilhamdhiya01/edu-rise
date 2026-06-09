'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import { LoginInput } from '@/lib/types/auth.types';
import { REGISTER_PATH } from '@/routes';
import { loginSchema } from '@/schemas/auth.schema';

const DEFAULT_VALUES: LoginInput = {
  email: '',
  password: '',
};

const LoginForm = React.memo(() => {
  const { handleLogin, isLoggingIn } = useAuth();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await handleLogin({ ...data, rememberMe: isRememberMe });
      reset(DEFAULT_VALUES);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        prefix={{
          icon: 'TbMail',
        }}
        fullWidth
        label="Email"
        placeholder="Enter your email"
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

      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            checked={isRememberMe}
            onChange={(e) => setIsRememberMe(e.target.checked)}
            type="checkbox"
            className="h-4.5 w-4.5 cursor-pointer appearance-none rounded border-2 border-blue-400 bg-white checked:border-blue-500 checked:bg-white checked:bg-[url('/icons/check-blue.svg')] checked:bg-center checked:bg-no-repeat focus:outline-none"
          />
          <span className="text-gray-600">Ingat saya</span>
        </label>
        <span>
          Belum punya akun?{' '}
          <Link
            href={REGISTER_PATH}
            className="text-primary-600 font-medium hover:underline"
          >
            Daftar
          </Link>
        </span>
      </div>

      <Button type="submit" label="Masuk" fullWidth isLoading={isLoggingIn} />
    </form>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
