'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import { useUpdateNotificationWhatsapp } from '@/lib/hooks/profile';
import { NotificationWhatsappInput } from '@/lib/types/profile.types';
import { notificationWhatsappSchema } from '@/schemas/profile.schema';
import { useAuthStore } from '@/stores/useAuthStore';

const DEFAULT_VALUES = {
  isNotificationWhatsapp: false,
  isMotivationalMessage: false,
} as const;

const NotificationWhatsappSetting = React.memo(() => {
  const notifData = useAuthStore(
    useShallow((state) => ({
      isNotificationWhatsapp: state.user?.isNotificationWhatsapp ?? false,
      isMotivationalMessage: state.user?.isMotivationalMessage ?? false,
    }))
  );

  const { handleUpdateNotificationWhatsapp, isUpdatingNotificationWhatsapp } =
    useUpdateNotificationWhatsapp();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<NotificationWhatsappInput>({
    resolver: zodResolver(notificationWhatsappSchema),
    defaultValues: DEFAULT_VALUES,
    values: notifData,
  });

  const onSubmit = async (data: NotificationWhatsappInput) => {
    try {
      await handleUpdateNotificationWhatsapp(data);
    } catch (error) {
      console.error(error);
    }
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

      <Button
        type="submit"
        label="Simpan Pengaturan"
        isLoading={isUpdatingNotificationWhatsapp}
        disabled={!isDirty}
      />
    </form>
  );
});

NotificationWhatsappSetting.displayName = 'NotificationWhatsappSetting';

export default NotificationWhatsappSetting;
