import { memo } from 'react';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';

const NotificationEmailSetting = memo(() => {
  return (
    <form className="space-y-4">
      <Switch label="Pemberitahuan Email" />
      <div className="flex flex-row-reverse items-center justify-end gap-2">
        <label htmlFor="notification-email" className="text-sm">
          Laporan belajar kursus per minggu
        </label>
        <Input id="notification-email" type="checkbox" />
      </div>
      <div className="flex flex-row-reverse items-center justify-end gap-2">
        <label htmlFor="notification-email" className="text-sm">
          Pencapaian sertifikat
        </label>
        <Input id="notification-email" type="checkbox" />
      </div>
      <div className="flex flex-row-reverse items-center justify-end gap-2">
        <label htmlFor="notification-email" className="text-sm">
          Rekomendasi kursus terbaru
        </label>
        <Input id="notification-email" type="checkbox" />
      </div>
      <Button label="Simpan Pengaturan" />
    </form>
  );
});

NotificationEmailSetting.displayName = 'NotificationEmailSetting';

export default NotificationEmailSetting;
