import Image from 'next/image';
import React from 'react';

import Button from '@/components/ui/button';
import { Course } from '@/mocks/mockCourses';

import Progress from './Progress';

export interface CourseCardItemProps {
  course: Course;
  progress?: number;
  onViewDetail: (course: Course) => void;
  onAddCourse: (course: Course) => void;
  isLoadingMyCourse?: boolean;
}

const CourseCardItem = React.memo<CourseCardItemProps>(
  ({ course, onViewDetail, onAddCourse, progress, isLoadingMyCourse }) => {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <span className="bg-primary-100 text-primary-700 inline-flex w-fit rounded px-2 py-1 text-xs font-medium">
            {course.categoryName}
          </span>

          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 md:text-base">
              {course.title}
            </h3>
            <p className="line-clamp-1 text-xs text-neutral-600 md:text-sm">
              {course.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            {typeof progress === 'number' ? (
              <>
                <Progress progress={progress} />
                <Button
                  label={progress > 0 ? 'Lanjutkan Kursus' : 'Mulai Kursus'}
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => onViewDetail(course)}
                />
                <Button
                  label="Download Sertifikat"
                  preffixIcon="TbDownload"
                  variant="outlined"
                  fullWidth
                  disabled={progress < 100}
                  // onClick={() => onAddCourse(course)}
                />
              </>
            ) : (
              <>
                <Button
                  label="Lihat Detail Kursus"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => onViewDetail(course)}
                />
                <Button
                  label="Tambah Kursus"
                  variant="outlined"
                  color="neutral"
                  fullWidth
                  onClick={() => onAddCourse(course)}
                  isLoading={isLoadingMyCourse}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CourseCardItem.displayName = 'CourseCardItem';

export default CourseCardItem;
