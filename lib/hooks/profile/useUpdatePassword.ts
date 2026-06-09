import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { ErrorResponse } from '@/lib/types/auth.types';
import { UpdatePasswordPayload } from '@/lib/types/profile.types';
import { updatePassword } from '@/services/profile.service';

export const useUpdatePassword = () => {
  const mutation = useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),

    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || 'Password updated successfully');
      }
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });

  return {
    handleUpdatePassword: mutation.mutateAsync,
    isUpdatingPassword: mutation.isPending,
    updatePasswordError: mutation.error,
    isPasswordSuccess: mutation.isSuccess,
  };
};
