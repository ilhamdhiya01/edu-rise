import classNames from 'classnames';

import Button from '@/components/ui/button';
import Icon, { IconProps } from '@/components/ui/icon';

type StateStatusType = 'default' | 'error' | 'offline' | 'empty' | 'success';

export interface StateStatusProps {
  title: string;
  description: string;
  type?: StateStatusType;
  icon?: IconProps['icon'];
  action?: {
    label: string;
    onClick: () => void;
  };
}

const StateStatus = ({
  title,
  description,
  type = 'default',
  icon,
  action,
}: StateStatusProps) => {
  // Default icons based on type
  const defaultIcons: Record<StateStatusType, IconProps['icon']> = {
    default: 'TbInfoCircle',
    error: 'TbAlertCircle',
    offline: 'TbWifiOff',
    empty: 'TbInbox',
    success: 'TbCircleCheck',
  };

  // Icon colors based on type
  const iconColors: Record<StateStatusType, string> = {
    default: 'text-neutral-400',
    error: 'text-red-500',
    offline: 'text-orange-500',
    empty: 'text-neutral-400',
    success: 'text-green-500',
  };

  const displayIcon = icon || defaultIcons[type];

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      {/* Icon */}
      <div
        className={classNames(
          'flex items-center justify-center rounded-full p-4',
          {
            'bg-neutral-100': type === 'default' || type === 'empty',
            'bg-red-50': type === 'error',
            'bg-orange-50': type === 'offline',
            'bg-green-50': type === 'success',
          }
        )}
      >
        <Icon icon={displayIcon} size={48} className={iconColors[type]} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h2 className="text-center text-lg font-semibold text-neutral-600 md:text-2xl">
          {title}
        </h2>
        <p className="text-center text-neutral-600">{description}</p>
      </div>

      {/* Action Button */}
      {action && <Button label={action.label} onClick={action.onClick} />}
    </div>
  );
};

export default StateStatus;
