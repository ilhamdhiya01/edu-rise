import React from 'react';

import { CourseCardItem } from '@/components/shared/course-card-item';
import { CourseCardItemSkeleton } from '@/components/shared/skelaton';
import StateStatus from '@/components/shared/state-status';
import { Course } from '@/mocks/mockCourses';

interface ListCourseProps {
  isError?: boolean;
  onRetry?: () => void;
  filteredCourses: Course[];
  isLoading: boolean;
  totalCourses: number;
  onViewDetail: (course: Course) => void;
  onAddCourse: (course: Course) => void;
  loadingCourseId: string | null;
}

const ListCourse = React.memo<ListCourseProps>(
  ({
    isError,
    onRetry,
    filteredCourses,
    isLoading,
    totalCourses,
    onViewDetail,
    onAddCourse,
    loadingCourseId,
  }) => {
    if (isError) {
      return (
        <StateStatus
          type="error"
          title="Gagal memuat kursus"
          description="Terjadi kesalahan saat memuat data kursus"
          action={{
            label: 'Coba Lagi',
            onClick: () => onRetry?.(),
          }}
        />
      );
    }

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseCardItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (totalCourses === 0) {
      return (
        <StateStatus
          type="empty"
          title="Belum ada daftar kursus yang dapat diikuti"
          description="Belum ada kursus yang tersedia saat ini"
        />
      );
    }

    if (filteredCourses.length === 0) {
      return (
        <StateStatus
          type="empty"
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
            onViewDetail={onViewDetail}
            onAddCourse={onAddCourse}
            isLoadingMyCourse={loadingCourseId === course.id}
          />
        ))}
      </div>
    );
  }
);

ListCourse.displayName = 'ListCourse';

export default ListCourse;
