'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { SectionContent } from '@/components/shared/section-content';
import StateStatus from '@/components/shared/state-status';

const MyCourses = React.memo(() => {
  const router = useRouter();
  return (
    <SectionContent title="Kursus Saya (3)">
      <StateStatus
        type="empty"
        title="Belum ada kursus yang diikuti"
        description="Tambah kursus di daftar kursus"
        action={{
          label: 'Tambahkan Kursus',
          onClick: () => router.push('/courses'),
        }}
      />
    </SectionContent>
  );
});

MyCourses.displayName = 'MyCourses';

export default MyCourses;
