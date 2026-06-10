'use client';

import { usePathname } from 'next/navigation';

import { IconProps } from '@/components/ui/icon';
import { MOCK_MENU } from '@/const/menu.constant';

import NavigationItem from './NavigationItem';

export type NavigationItemProps = {
  label: string;
  icon?: IconProps['icon'];
  href: string;
  pathName?: string;
};

const Navigation = () => {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between gap-4 border-b border-gray-300 md:inline-flex md:justify-start md:gap-8 md:border-none">
      {MOCK_MENU.map((tab) => (
        <NavigationItem key={tab.href} {...tab} pathName={pathName} />
      ))}
    </nav>
  );
};

export default Navigation;
