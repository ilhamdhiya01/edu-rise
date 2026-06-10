import classNames from 'classnames';
import React from 'react';

import Icon, { IconProps } from '@/components/ui/icon';

type MetricCardItemType = 'courses' | 'activeCourses' | 'finishedCourses';

interface MetricCardItemProps {
  icon: IconProps['icon'];
  value: number;
  label: string;
  type: MetricCardItemType;
}

const MetricCardItem = React.memo(
  ({ icon, value, label, type }: MetricCardItemProps) => {
    return (
      <div
        className={classNames(
          'flex w-full items-center gap-3 rounded-lg border p-4',
          {
            'bg-tertiary-100 border-tertiary-400': type === 'courses',
            'bg-primary-100 border-primary-400': type === 'activeCourses',
            'border-green-400 bg-green-100': type === 'finishedCourses',
          }
        )}
      >
        <div
          className={classNames(
            'flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white md:size-15',
            {
              'border-primary-400 text-primary-600': type === 'activeCourses',
              'border-tertiary-400 text-tertiary-600': type === 'courses',
              'border-green-400 text-green-600': type === 'finishedCourses',
            }
          )}
        >
          <Icon icon={icon} size={32} />
        </div>
        <div>
          {value > 0 ? (
            <>
              <p className="text-xl font-semibold text-neutral-600">{value}</p>
              <p className="text-neutral-500">{label}</p>
            </>
          ) : (
            <p>
              Tidak ada kurusu{' '}
              {type === 'courses'
                ? 'yang diikuti'
                : type === 'activeCourses'
                  ? 'yang sedang aktif'
                  : 'yang selesai'}
            </p>
          )}
        </div>
      </div>
    );
  }
);

MetricCardItem.displayName = 'MetricCardItem';

export default MetricCardItem;
