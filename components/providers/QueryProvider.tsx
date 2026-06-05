'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect, useState } from 'react';

import { queryClient } from '@/lib/tanstack-query';

const QueryProviders = ({ children }: { children: React.ReactNode }) => {
  const [isMswReady, setIsMswReady] = useState<boolean>(
    process.env.NODE_ENV !== 'development'
  );

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
