import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { getUserFromToken, setAuthCookie } from '@/lib/helpers';
import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse, User } from '@/lib/types/auth.types';
import { UserDataRequest } from '@/lib/types/profile.types';
import { updateUserData } from '@/services/profile.service';

export const useUpdateUserData = () => {
  const userToken = getUserFromToken();

  const mutation = useMutation({
    mutationFn: (payload: UserDataRequest) => updateUserData(payload),

    // Optimistic update: update cache immediately with new data
    onMutate: async (newData: UserDataRequest) => {
      await queryClient.cancelQueries({
        queryKey: ['currentUser', userToken?.email],
      });

      const previousUser = queryClient.getQueryData<{
        success: boolean;
        data: User;
      }>(['currentUser', userToken?.email]);

      if (previousUser?.data) {
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: { ...previousUser.data, ...newData },
        });
      }

      return { previousUser };
    },

    // Update cache with server response
    onSuccess: (response) => {
      if (!response.success) return;

      const hasNewToken = 'token' in response.data;
      const updatedUser = hasNewToken
        ? (response.data as { token: string; user: User }).user
        : (response.data as User);

      if (hasNewToken) {
        setAuthCookie((response.data as { token: string }).token);
      }

      queryClient.setQueryData(['currentUser', userToken?.email], {
        success: true,
        data: updatedUser,
      });

      toast.success(response.message);
    },

    // Rollback cache on error
    onError: (error: AxiosError<ErrorResponse>, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          ['currentUser', userToken?.email],
          context.previousUser
        );
      }
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return {
    handleUpdateUserData: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
    isUpdateSuccess: mutation.isSuccess,
  };
};
