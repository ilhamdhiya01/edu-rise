import { create } from 'zustand';

import { User } from '@/lib/types/auth.types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
type AuthAction = {
  setUser: (user: User | null) => void;
};

type AuthStore = AuthState & AuthAction;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
}));
