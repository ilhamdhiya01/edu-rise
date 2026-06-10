'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { CourseCardItem } from '@/components/shared/course-card-item';
import { SectionContent } from '@/components/shared/section-content';
import { CourseCardItemSkeleton } from '@/components/shared/skelaton';
import StateStatus from '@/components/shared/state-status';
import { useMyCourseList } from '@/lib/hooks/courses/useMyCourseList';

const MyCourses = React.memo(() => {
  const { data: myCourses = [], isLoading } = useMyCourseList();
  const router = useRouter();
  return (
    <SectionContent title={`Kursus Saya (${myCourses.length})`}>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CourseCardItemSkeleton key={index} />
          ))}
        </div>
      ) : myCourses.length > 0 ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {myCourses.map((course) => (
              <CourseCardItem
                key={course.id}
                course={course}
                progress={course.progress || 0}
                onViewDetail={() => {}}
                onAddCourse={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        <StateStatus
          type="empty"
          title="Belum ada kursus yang diikuti"
          description="Tambah kursus di daftar kursus"
          action={{
            label: 'Tambahkan Kursus',
            onClick: () => router.push('/courses'),
          }}
        />
      )}
    </SectionContent>
  );
});

MyCourses.displayName = 'MyCourses';

export default MyCourses;
