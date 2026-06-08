import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/lib/types/api.types';
import { Course } from '@/mocks/mockCourses';
import { Category } from '@/mocks/mockData';

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const res = await axiosInstance.get('/api/categories');
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getCourses = async (): Promise<ApiResponse<Course[]>> => {
  try {
    const res = await axiosInstance.get('/api/courses');
    return res.data;
  } catch (error) {
    throw error;
  }
};
