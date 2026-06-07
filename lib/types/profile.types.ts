import z from 'zod';

import {
  updatePasswordSchema,
  userDataSchema,
} from '../../schemas/profile.schema';

export type UserDataInput = z.infer<typeof userDataSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export type UserDataRequest = UserDataInput;

export type UpdatePasswordPayload = Omit<
  UpdatePasswordInput,
  'confirmPassword'
>;
