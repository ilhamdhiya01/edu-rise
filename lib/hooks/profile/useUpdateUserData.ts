import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { getUserFromToken } from '@/lib/helpers';
import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse, User } from '@/lib/types/auth.types';
import { UserDataRequest } from '@/lib/types/profile.types';
import { updateUserData } from '@/services/profile.service';

/**
 * @description Hook for updating core user profile data (name, email, etc.).
 * Performs optimistic updates directly on TanStack Query cache —
 * no Zustand writes, preventing cascading re-renders in unrelated forms.
 * @returns Mutation handler and its associated loading/error/success states.
 */
export const useUpdateUserData = () => {
  const userToken = getUserFromToken();

  const mutation = useMutation({
    mutationFn: (payload: UserDataRequest) => updateUserData(payload),

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

    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(['currentUser', userToken?.email], {
          success: true,
          data: response.data as User,
        });
        toast.success(response.message);
      }
    },

    onError: (error: AxiosError<ErrorResponse>, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          ['currentUser', userToken?.email],
          context.previousUser
        );

        if (context.previousUser.data) {
          queryClient.setQueryData(['currentUser', userToken?.email], {
            success: true,
            data: context.previousUser.data,
          });
        }
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
