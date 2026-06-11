import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { getUserByEmail } from '@/services/auth.service';
import { useAuthStore } from '@/stores/useAuthStore';

import { getUserFromToken } from '../helpers';

export const useUser = () => {
  const { isAuthenticated, setUser } = useAuthStore(
    useShallow((state) => ({
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
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync fetched data to Zustand store without subscribing to user
  useEffect(() => {
    if (userData?.data) {
      const currentUser = useAuthStore.getState().user;
      if (userData.data !== currentUser) {
        setUser(userData.data);
      }
    }
  }, [userData?.data, setUser]);

  return {
    isAuthenticated,
    isLoading,
    isError,
    userToken,
  };
};
