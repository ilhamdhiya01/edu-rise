'use client';

import Image from 'next/image';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex h-screen max-w-[650px] flex-col justify-around">
          <Image
            src="/images/saly.png"
            alt="Login Background"
            width={650}
            height={860}
            className="mt-10 object-cover"
          />
        </div>
        <div className="col-span-2 flex max-w-4xl flex-col items-center justify-center gap-7 p-14">
          <div className="w-full space-y-2">
            <h1 className="text-primary-500 text-6xl font-semibold">EduRise</h1>
            <p className="text-gray-600">
              Tingkatkan kemampuanmu, raih masa depan lebih baik
            </p>
            <h2 className="mt-7 text-3xl font-semibold">Masuk</h2>
          </div>
          <form className="w-full space-y-7">
            <Input
              prefix={{
                icon: 'TbMail',
              }}
              fullWidth
              label="Email"
              placeholder="Enter your email"
              //   error={errors.email?.message}
            />
            <Input
              fullWidth
              label="Password"
              placeholder="Enter your password"
              //   type={hide.type}
              suffix={{
                icon: 'TbEye',
                //   onClick: handleShowPassword,
              }}
              //   error={errors.password?.message}
            />
            <Input label="Remember me" type={'checkbox'} />
            <Button type="submit" label="Masuk" fullWidth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
