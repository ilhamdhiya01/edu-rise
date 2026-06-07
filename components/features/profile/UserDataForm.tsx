import { memo } from 'react';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const UserDataForm = memo(() => {
  return (
    <form className="h-full space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input label="Nama Depan" fullWidth />
        <Input label="Nama Belakang" fullWidth />
      </div>
      <Input label="Username" fullWidth />
      <Input label="Email" fullWidth />
      <Input label="Nomor WhatsApp" fullWidth />
      <Input label="Jabatan" fullWidth />
      <Button label="Simpan" />
    </form>
  );
});

UserDataForm.displayName = 'UserDataForm';

export default UserDataForm;
