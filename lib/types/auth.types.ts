import z from 'zod';

import { loginSchema } from '../../schemas/auth.schema';

export type LoginInput = z.infer<typeof loginSchema>;

export type User = {
  id: string;
  name: string;
  email: string;
};

export interface LoginResponse {
  success: boolean;
  data: User;
}
