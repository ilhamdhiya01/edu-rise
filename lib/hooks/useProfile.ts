import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { updateUserData, updateUserImage } from '@/services/profile.service';

import { queryClient } from '../tanstack-query';
import { ErrorResponse, User } from '../types/auth.types';
import { UserDataRequest } from '../types/profile.types';
import { useUser } from './useUser';

export const useProfile = () => {
  const { setUser, userToken } = useUser();

  const userDataMutation = useMutation({
    mutationFn: (payload: UserDataRequest) => updateUserData(payload),

    // OPTIMISTIC UPDATE - Update UI immediately
    onMutate: async (newData: UserDataRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['currentUser', userToken?.email],
      });

      // Snapshot previous value for rollback
      const previousUser = queryClient.getQueryData<{
        success: boolean;
        data: User;
      }>(['currentUser', userToken?.email]);

      // Optimistically update cache
      if (previousUser?.data) {
        const optimisticUser = {
          ...previousUser.data,
          ...newData,
        };

        // Update React Query cache
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: optimisticUser,
        });

        // Update Zustand store
        setUser(optimisticUser);
      }

      // Return context for rollback
      return { previousUser };
    },

    // SUCCESS - Confirm with server data
    onSuccess: (response, _variables, context) => {
      if (response.success) {
        const updatedUser = response.data as User;

        // Update with actual server data
        setUser(updatedUser);
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: updatedUser,
        });

        toast.success(response.message || 'User data updated successfully');
      }
    },

    // Rollback to previous data
    onError: (error: AxiosError<ErrorResponse>, _variables, context) => {
      // Rollback cache and store
      if (context?.previousUser) {
        queryClient.setQueryData(
          ['currentUser', userToken?.email],
          context.previousUser
        );

        if (context.previousUser.data) {
          setUser(context.previousUser.data);
        }
      }

      toast.error(error.response?.data?.message || error.message);
    },
  });

  const imageMutation = useMutation({
    mutationFn: (imageFile: File) => updateUserImage(imageFile),

    // OPTIMISTIC UPDATE - Update UI immediately
    onMutate: async (imageFile: File) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['currentUser', userToken?.email],
      });

      // Snapshot previous value for rollback
      const previousUser = queryClient.getQueryData<{
        success: boolean;
        data: User;
      }>(['currentUser', userToken?.email]);

      // Create temporary Object URL for preview
      const tempImageUrl = URL.createObjectURL(imageFile);

      // Optimistically update cache
      if (previousUser?.data) {
        const optimisticUser = {
          ...previousUser.data,
          image: tempImageUrl,
        };

        // Update React Query cache
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: optimisticUser,
        });

        // Update Zustand store
        setUser(optimisticUser);
      }

      // Return context for rollback
      return { previousUser, tempImageUrl };
    },

    // SUCCESS - Replace temp URL with actual data
    onSuccess: (response, _variables, context) => {
      // Revoke temporary Object URL
      if (context?.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }

      const updatedUser = response.data;

      // Update with actual server data
      setUser(updatedUser);
      queryClient.setQueryData(['currentUser', userToken?.email], {
        success: true,
        data: updatedUser,
      });

      toast.success(response.message || 'Profile image updated successfully');
    },

    // Rollback to previous data
    onError: (error: AxiosError<ErrorResponse>, _variables, context) => {
      // Revoke temporary Object URL
      if (context?.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }

      // Rollback cache and store
      if (context?.previousUser) {
        queryClient.setQueryData(
          ['currentUser', userToken?.email],
          context.previousUser
        );

        if (context.previousUser.data) {
          setUser(context.previousUser.data);
        }
      }

      toast.error(
        error.response?.data?.message || 'Failed to update profile image'
      );
    },
  });

  return {
    handleUpdateUserData: userDataMutation.mutate,
    isUpdating: userDataMutation.isPending,
    updateError: userDataMutation.error,

    handleUpdateUserImage: imageMutation.mutate,
    isUpdatingImage: imageMutation.isPending,
    updateImageError: imageMutation.error,
  };
};
