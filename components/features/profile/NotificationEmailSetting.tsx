'use client';

import classNames from 'classnames';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';

const DEFAULT_VALUES = {
  isNotificationEmail: false,
  isWeeklyReport: false,
  isCertificateAchievement: false,
  isNewCourseRecommendation: false,
} as const;

const NotificationEmailSetting = memo(() => {
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
        name="isNotificationEmail"
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onChange={field.onChange}
            label={`Pemberitahuan Email ${field.value ? 'aktif' : 'tidak aktif'}`}
          />
        )}
      />
      <Controller
        name="isWeeklyReport"
        control={control}
        render={({ field }) => (
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="weekly-report"
              className={classNames('text-sm transition-colors', {
                'text-primary-500': field.value,
              })}
            >
              Laporan belajar kursus per minggu
            </label>
            <Input
              onChange={field.onChange}
              checked={field.value}
              id="weekly-report"
              type="checkbox"
            />
          </div>
        )}
      />
      <Controller
        name="isCertificateAchievement"
        control={control}
        render={({ field }) => (
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="certificate-achievement"
              className={classNames('text-sm transition-colors', {
                'text-primary-500': field.value,
              })}
            >
              Pencapaian sertifikat
            </label>
            <Input
              onChange={field.onChange}
              checked={field.value}
              id="certificate-achievement"
              type="checkbox"
            />
          </div>
        )}
      />

      <Controller
        name="isNewCourseRecommendation"
        control={control}
        render={({ field }) => (
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="new-course-recommendation"
              className={classNames('text-sm transition-colors', {
                'text-primary-500': field.value,
              })}
            >
              Rekomendasi kursus terbaru
            </label>
            <Input
              onChange={field.onChange}
              checked={field.value}
              id="new-course-recommendation"
              type="checkbox"
            />
          </div>
        )}
      />

      <Button type="submit" label="Simpan Pengaturan" />
    </form>
  );
});

NotificationEmailSetting.displayName = 'NotificationEmailSetting';

export default NotificationEmailSetting;
