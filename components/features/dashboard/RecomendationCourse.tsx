'use client';

import React from 'react';

import { CourseCardItem } from '@/components/shared/course-card-item';
import { SectionContent } from '@/components/shared/section-content';
import { CourseCardItemSkeleton } from '@/components/shared/skelaton';
import StateStatus from '@/components/shared/state-status';
import Button from '@/components/ui/button';
import { useCourseList } from '@/lib/hooks/courses/useCourseList';
import { useMyCourses } from '@/lib/hooks/courses/useMyCourses';

const RecomendationCourse = React.memo(() => {
  const { data: recommendationCourses = [], isLoading } = useCourseList({
    limit: 4,
    random: true,
  });

  const { handleAddCourse, loadingCourseId } = useMyCourses();

  return (
    <SectionContent title="Rekomendasi Kursus">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CourseCardItemSkeleton key={index} />
          ))}
        </div>
      ) : recommendationCourses.length > 0 ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recommendationCourses.map((course) => (
              <CourseCardItem
                key={course.id}
                course={course}
                onViewDetail={() => {}}
                onAddCourse={handleAddCourse}
                isLoadingMyCourse={loadingCourseId === course.id}
              />
            ))}
          </div>
          <div className="mx-auto flex w-full justify-center md:max-w-[400px]">
            <Button
              label="Lihat Lebih Banyak"
              variant="outlined"
              color="neutral"
              fullWidth
            />
          </div>
        </div>
      ) : (
        <StateStatus
          title="Belum ada kursus"
          description="Belum ada kursus yang tersedia"
        />
      )}
    </SectionContent>
  );
});

RecomendationCourse.displayName = 'RecomendationCourse';

export default RecomendationCourse;
