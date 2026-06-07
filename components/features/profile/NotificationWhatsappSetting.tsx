import { memo } from 'react';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';

const NotificationWhatsappSetting = memo(() => {
  return (
    <form className="space-y-4">
      <Switch label="Pemberitahuan whatsapp tidak aktif" />
      <div className="flex flex-row-reverse items-center justify-end gap-2">
        <label htmlFor="notification-email" className="text-sm">
          Kirim pesan motivasi lewat whatsapp
        </label>
        <Input id="notification-email" type="checkbox" />
      </div>
      <Button label="Simpan Pengaturan" />
    </form>
  );
});

NotificationWhatsappSetting.displayName = 'NotificationWhatsappSetting';

export default NotificationWhatsappSetting;
