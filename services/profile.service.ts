import axiosInstance from '@/lib/axios';
import { fileToDataURL } from '@/lib/helpers';
import { ApiResponse } from '@/lib/types/api.types';
import { User } from '@/lib/types/auth.types';
import {
  NotificationEmailRequest,
  NotificationWhatsappRequest,
  UpdatePasswordPayload,
  UserDataRequest,
} from '@/lib/types/profile.types';

export const updateUserData = async (
  data: UserDataRequest
): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.put('api/users/update', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserImage = async (
  imageFile: File
): Promise<ApiResponse<User>> => {
  // Convert file to base64 or object URL for IndexedDB
  const imageUrl = await fileToDataURL(imageFile);

  const res = await axiosInstance.put('api/users/update-image', {
    image: imageUrl,
  });

  return res.data;
};

export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<ApiResponse<User>> => {
  const res = await axiosInstance.put('api/users/update-password', payload);

  return res.data;
};

export const updateNotificationEmail = async (
  data: NotificationEmailRequest
): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.put(
      '/api/users/update-notification-email',
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationWhatsapp = async (
  data: NotificationWhatsappRequest
): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.put(
      '/api/users/update-notification-whatsapp',
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
