import { create } from 'zustand';

type AuthState = {
  isRememberMe: boolean;
};
type AuthAction = {
  setIsRememberMe: (isRememberMe: boolean) => void;
};

type AuthStore = AuthState & AuthAction;

const initialState: AuthState = {
  isRememberMe: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setIsRememberMe: (isRememberMe: boolean) => set({ isRememberMe }),
}));
