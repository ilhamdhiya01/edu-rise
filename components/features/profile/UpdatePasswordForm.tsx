'use client';

import { memo } from 'react';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const UpdatePasswordForm = memo(() => {
  return (
    <form className="h-full space-y-4">
      <Input
        label="Password"
        suffix={{
          icon: 'TbEye',
        }}
        type="password"
        fullWidth
      />
      <Input
        label="Password Baru"
        suffix={{
          icon: 'TbEye',
        }}
        type="password"
        fullWidth
      />
      <Input
        label="Konfirmasi Password Baru"
        suffix={{
          icon: 'TbEye',
        }}
        type="password"
        fullWidth
      />
      <Button label="Ubah Password" />
    </form>
  );
});

UpdatePasswordForm.displayName = 'UpdatePasswordForm';

export default UpdatePasswordForm;
