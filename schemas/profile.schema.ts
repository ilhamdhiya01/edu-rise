import { z } from 'zod';

export const userDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .superRefine((data, ctx) => {
    // Check if passwords match
    if (data.newPassword !== data.confirmPassword) {
      // Add error to confirmPassword
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });

      // Add error to newPassword
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['newPassword'],
      });
    }
  });
