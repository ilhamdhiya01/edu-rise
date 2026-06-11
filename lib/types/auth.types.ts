import z from 'zod';

import { loginSchema, registerSchema } from '../../schemas/auth.schema';

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginRequest = Omit<LoginInput, 'rememberMe'> & {
  rememberMe?: boolean;
};

export type RegisterRequest = RegisterInput;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username?: string;
  image?: string;
  position?: string;
  phoneNumber?: string;
  isNotificationEmail?: boolean;
  isWeeklyReport?: boolean;
  isCertificateAchievement?: boolean;
  isNewCourseRecommendation?: boolean;
  isNotificationWhatsapp?: boolean;
  isMotivationalMessage?: boolean;
};

export type AuthUser = User & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  position?: string;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};
