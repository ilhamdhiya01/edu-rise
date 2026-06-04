import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard - Edu Rise',
  description: 'Edu Rise Dashboard',
};

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex min-h-screen w-full">
      <section className="flex-1">{children}</section>
    </main>
  );
};

export default AppLayout;
