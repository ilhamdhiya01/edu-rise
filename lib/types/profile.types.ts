import z from 'zod';

import { userDataSchema } from '../../schemas/profile.schema';

export type UserDataInput = z.infer<typeof userDataSchema>;

export type UserDataRequest = UserDataInput;
