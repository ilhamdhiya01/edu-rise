'use client';

import classNames from 'classnames';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';

const DEFAULT_VALUES = {
  isNotificationWhatsapp: false,
  isMotivationalMessage: false,
} as const;

const NotificationWhatsappSetting = memo(() => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<typeof DEFAULT_VALUES>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    console.log(data);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="isNotificationWhatsapp"
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onChange={field.onChange}
            label={`Pemberitahuan Whatsapp ${field.value ? 'aktif' : 'tidak aktif'}`}
          />
        )}
      />
      <Controller
        name="isMotivationalMessage"
        control={control}
        render={({ field }) => (
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="motivational-message"
              className={classNames('text-sm transition-colors', {
                'text-primary-500': field.value,
              })}
            >
              Kirim pesan motivasi lewat whatsapp
            </label>
            <Input
              onChange={field.onChange}
              checked={field.value}
              id="motivational-message"
              type="checkbox"
            />
          </div>
        )}
      />

      <Button type="submit" label="Simpan Pengaturan" />
    </form>
  );
});

NotificationWhatsappSetting.displayName = 'NotificationWhatsappSetting';

export default NotificationWhatsappSetting;
