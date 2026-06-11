'use client';

import { useUser } from '@/lib/hooks/useUser';

/**
 * @description Keeps user data synced to Zustand store on every page.
 * Mount this inside QueryClientProvider so useQuery works.
 */
export const UserSync = () => {
  useUser();
  return null;
};
