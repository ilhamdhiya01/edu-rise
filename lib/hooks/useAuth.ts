import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { login } from '@/services/auth.service';

import { createMockJWT } from '../helpers';
import { LoginInput, LoginResponse } from '../types/auth.types';

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const useAuth = () => {
  const mutation = useMutation({
    mutationFn: (payload: LoginInput) => login(payload),
    onSuccess: (response: LoginResponse) => {
      // Manual set cookie for development with MSW
      if (process.env.NODE_ENV === 'development') {
        const mockUser = response.data;
        const mockJWT = createMockJWT(mockUser);
        document.cookie = `token=${mockJWT}; Path=/; Max-Age=86400; SameSite=Lax`;
      }
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
    ...mutation,
  };
};
