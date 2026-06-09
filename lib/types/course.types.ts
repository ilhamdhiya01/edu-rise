import { Course } from '@/mocks/mockCourses';

export type MyCourseRequest = Course & {
  progress: number;
};

export type MyCourseResponse = MyCourseRequest;
