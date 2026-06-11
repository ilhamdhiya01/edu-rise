import axiosInstance from '@/lib/axios';
import { fileToDataURL } from '@/lib/helpers';
import { ApiResponse } from '@/lib/types/api.types';
import { AuthResponse, User } from '@/lib/types/auth.types';
import {
  NotificationEmailRequest,
  NotificationWhatsappRequest,
  UpdatePasswordPayload,
  UserDataRequest,
} from '@/lib/types/profile.types';
import {
  API_USERS_UPDATE,
  API_USERS_UPDATE_IMAGE,
  API_USERS_UPDATE_NOTIFICATION_EMAIL,
  API_USERS_UPDATE_NOTIFICATION_WHATSAPP,
  API_USERS_UPDATE_PASSWORD,
} from '@/routes';

export const updateUserData = async (
  data: UserDataRequest
): Promise<ApiResponse<User | AuthResponse>> => {
  try {
    const res = await axiosInstance.put(API_USERS_UPDATE, data);
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

  const res = await axiosInstance.put(API_USERS_UPDATE_IMAGE, {
    image: imageUrl,
  });

  return res.data;
};

export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<ApiResponse<User>> => {
  const res = await axiosInstance.put(API_USERS_UPDATE_PASSWORD, payload);

  return res.data;
};

export const updateNotificationEmail = async (
  data: NotificationEmailRequest
): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.put(
      API_USERS_UPDATE_NOTIFICATION_EMAIL,
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
      API_USERS_UPDATE_NOTIFICATION_WHATSAPP,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
