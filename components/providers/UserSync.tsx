'use client';

import { useUser } from '@/lib/hooks/useUser';

export const UserSync = () => {
  useUser();
  return null;
};
