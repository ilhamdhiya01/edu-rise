import React from 'react';

import { Course } from '@/mocks/mockCourses';

import CourseCard from './CourseCard';

const ListCourse = React.memo<{
  filteredCourses: Course[];
  isLoading: boolean;
  totalCourses: number;
}>(({ filteredCourses, isLoading, totalCourses }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-center text-2xl font-semibold text-neutral-900">
          Belum ada daftar kursus yang dapat diikuti
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          Mohon tunggu beberapa saat ...
        </p>
      </div>
    );
  }

  if (totalCourses === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-center text-2xl font-semibold text-neutral-900">
          Belum ada daftar kursus yang dapat diikuti
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          Belum ada kursus yang tersedia saat ini
        </p>
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-center text-2xl font-semibold text-neutral-900">
          Tidak ada kursus yang ditemukan
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          Coba ubah filter atau kata kunci pencarian Anda
        </p>
      </div>
    );
  }
  return (
    <>
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetail={() => {}}
              onAddCourse={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-neutral-600">Tidak ada kursus yang ditemukan</p>
        </div>
      )}
    </>
  );
});

ListCourse.displayName = 'ListCourse';

export default ListCourse;
