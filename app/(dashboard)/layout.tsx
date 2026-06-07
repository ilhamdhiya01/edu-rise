import { Metadata } from 'next';
import React from 'react';

import Navbar from '@/components/shared/layout/navbar';
import ProfileHeader from '@/components/shared/profile-header';

export const metadata: Metadata = {
  title: 'Dashboard - Edu Rise',
  description: 'Edu Rise Dashboard',
};

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full bg-white">
        <section className="container mx-auto flex flex-1 flex-col space-y-6 px-4 md:px-0">
          <ProfileHeader />
          {children}
        </section>
      </main>
    </>
  );
};

export default AppLayout;
