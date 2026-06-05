import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { login } from '@/services/auth.service';

import { LoginInput } from '../types/auth.types';

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const useAuth = () => {
  const mutation = useMutation({
    mutationFn: (payload: LoginInput) => login(payload),
    onSuccess: (newData) => {
      console.log('Login success:', newData);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        'Login error:',
        error.response?.data?.message || error.message
      );
    },
  });

  return {
    handleLogin: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
