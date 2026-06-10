import { useQuery } from '@tanstack/react-query';

import { shuffleArray } from '@/lib/helpers';
import { getCourses } from '@/services/course.service';

interface UseCourseListOptions {
  limit?: number;
  categoryId?: string;
  random?: boolean;
}

export const useCourseList = (options?: UseCourseListOptions) => {
  return useQuery({
    queryKey: ['courses', options],
    queryFn: getCourses,
    select: (response) => {
      let courses = response.data || [];

      // Filter by category if provided
      if (options?.categoryId) {
        courses = courses.filter((c) => c.categoryId === options.categoryId);
      }

      // Randomize if requested
      if (options?.random) {
        courses = shuffleArray(courses);
      }

      // Limit results if provided
      if (options?.limit) {
        courses = courses.slice(0, options.limit);
      }

      return courses;
    },
  });
};
