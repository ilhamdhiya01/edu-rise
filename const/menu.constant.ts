import { NavigationItemProps } from '@/components/shared/layout/tab-navigation/Navigation';

export const MOCK_MENU: NavigationItemProps[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: 'TbDashboard',
  },
  {
    label: 'Daftar Kursus',
    href: '/courses',
    icon: 'TbBook',
  },
  {
    label: 'Profile Saya',
    href: '/profile',
    icon: 'TbUser',
  },
] as const;
