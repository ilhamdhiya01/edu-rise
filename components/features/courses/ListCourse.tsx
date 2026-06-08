import React from 'react';

import { Course } from '@/mocks/mockCourses';

import CourseCard from './CourseCard';

const ListCourse = React.memo<{ filteredCourses: Course[] }>(
  ({ filteredCourses }) => {
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
  }
);

ListCourse.displayName = 'ListCourse';

export default ListCourse;
