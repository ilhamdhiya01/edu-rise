import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { getUserFromToken } from '@/lib/helpers';
import { queryClient } from '@/lib/tanstack-query';
import { ErrorResponse, User } from '@/lib/types/auth.types';
import { NotificationWhatsappRequest } from '@/lib/types/profile.types';
import { updateNotificationWhatsapp } from '@/services/profile.service';

/**
 * @description Hook for updating WhatsApp notification settings.
 * Performs optimistic updates directly on TanStack Query cache —
 * no Zustand writes, preventing cascading re-renders in unrelated forms.
 * @returns Mutation handler and its associated loading/error/success states.
 */
export const useUpdateNotificationWhatsapp = () => {
  const userToken = getUserFromToken();

  const mutation = useMutation({
    mutationFn: (payload: NotificationWhatsappRequest) =>
      updateNotificationWhatsapp(payload),

    onMutate: async (newData: NotificationWhatsappRequest) => {
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
    handleUpdateNotificationWhatsapp: mutation.mutateAsync,
    isUpdatingNotificationWhatsapp: mutation.isPending,
    updateNotificationWhatsappError: mutation.error,
    isNotificationWhatsappSuccess: mutation.isSuccess,
  };
};
