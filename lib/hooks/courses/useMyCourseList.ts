import { useQuery } from '@tanstack/react-query';

import { getMyCourses } from '@/services/course.service';

interface UseMyCourseListOptions {
  limit?: number;
}

export const useMyCourseList = (options?: UseMyCourseListOptions) => {
  return useQuery({
    queryKey: ['my-courses'],
    queryFn: getMyCourses,
    select: (response) => {
      let courses = response.data || [];

      // Limit results if provided
      if (options?.limit) {
        courses = courses.slice(0, options.limit);
      }

      return courses;
    },
  });
};
