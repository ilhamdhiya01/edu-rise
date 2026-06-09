import React from 'react';

import { CourseCardItem } from '@/components/shared/course-card-item';
import StateStatus from '@/components/shared/state-status';
import { Course } from '@/mocks/mockCourses';

const ListCourse = React.memo<{
  filteredCourses: Course[];
  isLoading: boolean;
  totalCourses: number;
}>(({ filteredCourses, isLoading, totalCourses }) => {
  if (isLoading) {
    return (
      <StateStatus
        title="Belum ada daftar kursus yang dapat diikuti"
        description="Mohon tunggu beberapa saat ..."
      />
    );
  }

  if (totalCourses === 0) {
    return (
      <StateStatus
        title="Belum ada daftar kursus yang dapat diikuti"
        description="Belum ada kursus yang tersedia saat ini"
      />
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <StateStatus
        title="Tidak ada kursus yang ditemukan"
        description="Coba ubah filter atau kata kunci pencarian Anda"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {filteredCourses.map((course) => (
        <CourseCardItem
          key={course.id}
          course={course}
          onViewDetail={() => {}}
          onAddCourse={() => {}}
        />
      ))}
    </div>
  );
});

ListCourse.displayName = 'ListCourse';

export default ListCourse;
