import { create } from 'zustand';

import { AuthUser } from '@/lib/types/auth.types';

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
};
type AuthAction = {
  setUser: (user: AuthUser | null) => void;
};

type AuthStore = AuthState & AuthAction;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user: AuthUser | null) => set({ user, isAuthenticated: !!user }),
}));
