'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import { getUserFromToken } from '@/lib/helpers';
import { useUpdateNotificationWhatsapp } from '@/lib/hooks/profile';
import { NotificationWhatsappInput } from '@/lib/types/profile.types';
import { notificationWhatsappSchema } from '@/schemas/profile.schema';
import { getUserByEmail } from '@/services/auth.service';

const DEFAULT_VALUES = {
  isNotificationWhatsapp: false,
  isMotivationalMessage: false,
} as const;

const NotificationWhatsappSetting = React.memo(() => {
  const userToken = getUserFromToken();

  // ✅ Granular selector: only re-renders when WA notification fields change.
  // TanStack Query's structuralSharing prevents re-renders for unrelated field updates.
  const { data: notifData } = useQuery({
    queryKey: ['currentUser', userToken?.email],
    queryFn: () => getUserByEmail(userToken?.email),
    enabled: !!userToken?.email,
    select: (res) => ({
      isNotificationWhatsapp: res?.data?.isNotificationWhatsapp ?? false,
      isMotivationalMessage: res?.data?.isMotivationalMessage ?? false,
    }),
  });

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
