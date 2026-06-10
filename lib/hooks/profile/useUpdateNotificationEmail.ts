import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { getUserFromToken } from '@/lib/helpers';
import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse, User } from '@/lib/types/auth.types';
import { NotificationEmailRequest } from '@/lib/types/profile.types';
import { updateNotificationEmail } from '@/services/profile.service';

export const useUpdateNotificationEmail = () => {
  const userToken = getUserFromToken();

  const mutation = useMutation({
    mutationFn: (payload: NotificationEmailRequest) =>
      updateNotificationEmail(payload),

    onMutate: async (newData: NotificationEmailRequest) => {
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
      }
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return {
    handleUpdateNotificationEmail: mutation.mutateAsync,
    isUpdatingNotificationEmail: mutation.isPending,
    updateNotificationEmailError: mutation.error,
    isNotificationEmailSuccess: mutation.isSuccess,
  };
};
