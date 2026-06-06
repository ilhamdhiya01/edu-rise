import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { LOGIN_PATH, ROOT_PATH } from '@/routes';
import { login, register } from '@/services/auth.service';

import { LoginRequest, RegisterRequest } from '../types/auth.types';
import { useUser } from './useUser';

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();

  const loginmMutation = useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (response) => {
      if (response.success) {
        router.replace(ROOT_PATH);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        'Login error:',
        error.response?.data?.message || error.message
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: (response) => {
      if (response.success) {
        router.replace(ROOT_PATH);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        'Login error:',
        error.response?.data?.message || error.message
      );
    },
  });

  const logout = () => {
    document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
    queryClient.setQueryData(['currentUser', user?.email], null);
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    setUser(null);
    router.replace(LOGIN_PATH);
  };

  return {
    handleLogin: loginmMutation.mutate,
    isLoggingIn: loginmMutation.isPending,
    loginError: loginmMutation.error,

    handleRegister: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout,
  };
};
