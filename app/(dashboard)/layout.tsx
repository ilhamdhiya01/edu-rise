import { Metadata } from 'next';
import React from 'react';

import Navbar from '@/components/shared/layout/navbar/Navbar';

export const metadata: Metadata = {
  title: 'Dashboard - Edu Rise',
  description: 'Edu Rise Dashboard',
};

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100dvh-80px)] w-full">{children}</main>
    </>
  );
};

export default AppLayout;
