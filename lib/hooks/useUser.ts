import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { getUserByEmail } from '@/services/auth.service';
import { useAuthStore } from '@/stores/useAuthStore';

import { getUserFromToken } from '../helpers';

export const useUser = () => {
  const {
    user: userStore,
    isAuthenticated,
    setUser,
  } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      setUser: state.setUser,
    }))
  );
  const userToken = getUserFromToken();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['currentUser', userToken?.email],
    queryFn: () => getUserByEmail(userToken?.email),
    enabled: !!userToken?.email,
    retry: false,
    refetchOnWindowFocus: true,
    // sync to zustand
    meta: {
      persistToZustand: true,
    },
    select: (apiResponse) => {
      const userData = apiResponse?.data;

      // Sync to zustand if data is different from store
      if (userData && JSON.stringify(userStore) !== JSON.stringify(userData)) {
        setTimeout(() => setUser(userData), 0);
      }

      return userData;
    },
  });

  return {
    user: userData || userStore,
    isAuthenticated,
    setUser,
    isLoading,
    isError,
  };
};
