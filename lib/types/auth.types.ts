import z from 'zod';

import { loginSchema, registerSchema } from '../../schemas/auth.schema';

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

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
};

export interface AuthResponse {
  success: boolean;
  data: User;
}
