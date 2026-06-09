import { QueryCache, QueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/useAuthStore';

import { User } from './types/auth.types';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: (data, query) => {
      // Check if the query that just succeeded has the 'syncToZustand' meta
      if (query.meta?.syncToZustand) {
        // Update to Zustand safely without breaking React render rules!
        useAuthStore.getState().setUser(data as User);
      }
    },
    onError: (error, query) => {
      if (query.meta?.syncToZustand) {
        useAuthStore.getState().setUser(null);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});
