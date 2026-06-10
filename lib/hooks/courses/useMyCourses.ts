import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse } from '@/lib/types/auth.types';
import { MyCourseRequest } from '@/lib/types/course.types';
import { Course } from '@/mocks/mockCourses';
import { addToMyCourses } from '@/services/course.service';

const generateRandomProgress = (): number => {
  const cases = [0, Math.floor(Math.random() * 99) + 1, 100];

  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

export const useMyCourses = () => {
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  const addCourseMutation = useMutation({
    mutationFn: (payload: MyCourseRequest) => addToMyCourses(payload),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['my-courses'] });
        toast.success(response.message);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleAddCourse = useCallback(
    async (course: Course) => {
      try {
        setLoadingCourseId(course.id);
        const payload = {
          ...course,
          progress: generateRandomProgress(),
        };
        await addCourseMutation.mutateAsync(payload);
      } finally {
        setLoadingCourseId(null);
      }
    },
    [addCourseMutation.mutateAsync, generateRandomProgress]
  );

  return {
    addCourse: addCourseMutation.mutate,
    addCourseAsync: addCourseMutation.mutateAsync,
    isLoading: addCourseMutation.isPending,

    handleAddCourse,
    loadingCourseId,
  };
};
