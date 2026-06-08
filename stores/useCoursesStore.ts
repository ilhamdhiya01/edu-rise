import { create } from 'zustand';

import { User } from '@/lib/types/auth.types';

type CoursesState = {
  user: User | null;
  isAuthenticated: boolean;
};
type CoursesAction = {
  setUser: (user: User | null) => void;
};

type CoursesStore = CoursesState & CoursesAction;

const initialState: CoursesState = {
  user: null,
  isAuthenticated: false,
};

export const useCoursesStore = create<CoursesStore>((set) => ({
  ...initialState,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
}));
