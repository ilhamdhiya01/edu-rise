import axiosInstance from '@/lib/axios';
import { LoginInput, RegisterInput } from '@/lib/types/auth.types';
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from '@/routes';

export const login = async (payload: LoginInput) => {
  try {
    const res = await axiosInstance.post(API_AUTH_LOGIN, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload: RegisterInput) => {
  try {
    const res = await axiosInstance.post(API_AUTH_REGISTER, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
