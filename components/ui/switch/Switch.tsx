import classNames from 'classnames';
import React, { forwardRef, useId } from 'react';

// Jika Switch butuh icon di dalam bulatan atau di samping teks, bisa pakai ini.
// Jika tidak dipakai sementara, bisa dibiarkan atau dihapus.
import Icon, { IconProps } from '../icon';

interface SwitchProps extends Omit<
  React.ComponentPropsWithRef<'input'>,
  'type' | 'children'
> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  labelPosition?: 'left' | 'right'; // Fleksibilitas posisi teks label
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      error,
      required,
      id,
      className,
      checked,
      onChange,
      disabled,
      labelPosition = 'right', // Default teks berada di sebelah kanan switch
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        {/* Kontainer Utama berwujud Label agar seluruh area (termasuk teks) bisa diklik */}
        <label
          htmlFor={switchId}
          className={classNames('flex w-max items-center gap-3 select-none', {
            'cursor-pointer': !disabled,
            'cursor-not-allowed opacity-50': disabled,
            'flex-row-reverse': labelPosition === 'left',
          })}
        >
          {/* 🚀 KONTROLLER SWITCH (Kapsul + Lingkaran Geser) */}
          <div className="relative">
            {/* Input asli berupa checkbox tersembunyi untuk aksesibilitas & fungsionalitas form */}
            <input
              type="checkbox"
              ref={ref}
              id={switchId}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className="sr-only" // Menyembunyikan checkbox bawaan browser
              {...props}
            />

            {/* Latar Belakang Kapsul Switch */}
            <div
              className={classNames(
                'h-6 w-12 rounded-full transition-colors duration-200',
                className, // Izinkan kustomisasi background dari luar jika dibutuhkan
                {
                  'bg-neutral-300': !checked && !error,
                  'bg-blue-500': checked && !error, // Sesuai warna image_763027.png
                  'border border-red-500 bg-red-200': error, // State jika ada error
                  'bg-gray-200': disabled,
                }
              )}
            />

            {/* Lingkaran Putih (Tombol Geser) */}
            <div
              className={classNames(
                'absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                {
                  'translate-x-6': checked,
                  'translate-x-0': !checked,
                  'bg-gray-100': disabled,
                }
              )}
            />
          </div>

          {/* 🏷️ TEKS LABEL */}
          {label && (
            <span
              className={classNames('text-sm font-medium transition-colors', {
                'text-blue-500': checked && !error && !disabled, // Meniru warna teks aktif di image_763027.png
                'text-neutral-600': !checked && !error && !disabled,
                'text-red-500': error,
              })}
            >
              {label}
              {required && <span className="ml-0.5 text-red-500">*</span>}
            </span>
          )}
        </label>

        {/* PESAN ERROR (Konsisten dengan gaya input milikmu) */}
        {error && <small className="text-xs text-red-500">{error}</small>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
