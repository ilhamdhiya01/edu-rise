import classNames from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';

import Icon from '@/components/ui/icon';

import { NavigationItemProps } from './Navigation';

const NavigationItem = React.memo(
  ({ label, icon, href, pathName }: NavigationItemProps) => {
    const isActive = useMemo(() => {
      // Handle static routes
      const exceptRoot = href.split('/')[1];
      return pathName && exceptRoot
        ? pathName.includes(exceptRoot)
        : pathName === '/';
    }, [pathName, href]);

    return (
      <Link
        key={href}
        href={href}
        className={classNames(
          'flex items-center justify-center gap-2 border-b-3 py-3 text-center text-sm transition-colors md:w-40 md:py-4',
          {
            'border-primary-500': isActive,
            'border-transparent text-gray-500 hover:text-gray-900': !isActive,
          }
        )}
      >
        {icon && <Icon icon={icon} size={20} />}
        {label}
      </Link>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export default NavigationItem;
