import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/lib/types/api.types';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/lib/types/auth.types';
import { API_AUTH_LOGIN, API_AUTH_REGISTER, API_AUTH_USERS } from '@/routes';

export const login = async (
  payload: LoginRequest
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await axiosInstance.post(API_AUTH_LOGIN, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<ApiResponse<{ email: string }>> => {
  try {
    const res = await axiosInstance.get(`${API_AUTH_USERS}?email=${email}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  payload: RegisterRequest
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await axiosInstance.post(API_AUTH_REGISTER, payload);

    return res.data;
  } catch (error) {
    throw error;
  }
};
