'use client';

import { QueryCache, QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect, useState } from 'react';

import { User } from '@/lib/types/auth.types';
import { useAuthStore } from '@/stores/useAuthStore';

// import { queryClient } from '@/lib/tanstack-query';

const QueryProviders = ({ children }: { children: React.ReactNode }) => {
  const [isMswReady, setIsMswReady] = useState<boolean>(
    process.env.NODE_ENV !== 'development'
  );
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSuccess: (data, query) => {
        // Cek apakah query yang baru sukses memiliki meta 'syncToZustand'
        if (query.meta?.syncToZustand) {
          // Update ke Zustand dengan aman tanpa melanggar aturan render React!
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

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const initMsw = async () => {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        setIsMswReady(true);
      };
      initMsw();
    }
  }, []);

  if (!isMswReady) {
    return <div>Loading...</div>; // atau loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProviders;
