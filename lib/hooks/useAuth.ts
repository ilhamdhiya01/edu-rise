import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { LOGIN_PATH, ROOT_PATH } from '@/routes';
import { login, register } from '@/services/auth.service';

import { clearAuthCookie, setAuthCookie } from '../helpers';
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
    onSuccess: (response, variables) => {
      if (response.success && response.data?.token) {
        setAuthCookie(response.data.token, variables.rememberMe);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        toast.success(response.message);
        router.replace(ROOT_PATH);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: (response) => {
      if (response.success && response.data?.token) {
        setAuthCookie(response.data.token);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        toast.success(response.message);
        router.replace(ROOT_PATH);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const logout = () => {
    clearAuthCookie();
    queryClient.setQueryData(['currentUser', user?.email], null);
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    setUser(null);
    router.replace(LOGIN_PATH);
  };

  return {
    handleLogin: loginmMutation.mutateAsync,
    isLoggingIn: loginmMutation.isPending,
    loginError: loginmMutation.error,

    handleRegister: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout,
  };
};
