import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { getUserFromToken } from '@/lib/helpers';
import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse, User } from '@/lib/types/auth.types';
import { updateUserImage } from '@/services/profile.service';

/**
 * @description Hook for updating the user profile image.
 * Performs optimistic updates with a temporary Object URL directly on
 * TanStack Query cache — no Zustand writes, preventing cascading re-renders.
 * @returns Mutation handler and its associated loading/error/success states.
 */
export const useUpdateUserImage = () => {
  const userToken = getUserFromToken();

  const mutation = useMutation({
    mutationFn: (imageFile: File) => updateUserImage(imageFile),

    onMutate: async (imageFile: File) => {
      await queryClient.cancelQueries({
        queryKey: ['currentUser', userToken?.email],
      });

      const previousUser = queryClient.getQueryData<{
        success: boolean;
        data: User;
      }>(['currentUser', userToken?.email]);

      const tempImageUrl = URL.createObjectURL(imageFile);

      if (previousUser?.data) {
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: { ...previousUser.data, image: tempImageUrl },
        });
      }

      return { previousUser, tempImageUrl };
    },

    onSuccess: (response, _variables, context) => {
      if (context?.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }

      queryClient.setQueryData(['currentUser', userToken?.email], {
        success: true,
        data: response.data as User,
      });

      toast.success(response.message);
    },

    onError: (error: AxiosError<ErrorResponse>, _variables, context) => {
      if (context?.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }

      if (context?.previousUser) {
        queryClient.setQueryData(
          ['currentUser', userToken?.email],
          context.previousUser
        );
      }

      toast.error(
        error.response?.data?.message || 'Failed to update profile image'
      );
    },
  });

  return {
    handleUpdateUserImage: mutation.mutateAsync,
    isUpdatingImage: mutation.isPending,
    updateImageError: mutation.error,
    isUpdateImageSuccess: mutation.isSuccess,
  };
};
