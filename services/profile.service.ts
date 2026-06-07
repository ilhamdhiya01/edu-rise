import axiosInstance from '@/lib/axios';
import { fileToDataURL } from '@/lib/helpers';
import { ApiResponse } from '@/lib/types/api.types';
import { User } from '@/lib/types/auth.types';
import { UserDataRequest } from '@/lib/types/profile.types';

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
