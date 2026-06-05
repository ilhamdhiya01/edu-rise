import axiosInstance from '@/lib/axios';
import { LoginInput } from '@/lib/types/auth.types';
import { API_AUTH_LOGIN } from '@/routes';

export const login = async (payload: LoginInput) => {
  try {
    const res = await axiosInstance.post(API_AUTH_LOGIN, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
