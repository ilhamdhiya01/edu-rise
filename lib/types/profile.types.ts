import z from 'zod';

import {
  notificationEmailSchema,
  notificationWhatsappSchema,
  updatePasswordSchema,
  userDataSchema,
} from '../../schemas/profile.schema';
import { User } from './auth.types';

export type UserDataInput = z.infer<typeof userDataSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type NotificationEmailInput = z.infer<typeof notificationEmailSchema>;
export type NotificationWhatsappInput = z.infer<
  typeof notificationWhatsappSchema
>;

export type UserDataRequest = UserDataInput;
export type NotificationEmailRequest = NotificationEmailInput;
export type NotificationWhatsappRequest = NotificationWhatsappInput;

export type NotificationSettings = Pick<
  User,
  | 'isNotificationEmail'
  | 'isWeeklyReport'
  | 'isCertificateAchievement'
  | 'isNewCourseRecommendation'
>;

export type UpdatePasswordPayload = Omit<
  UpdatePasswordInput,
  'confirmPassword'
>;
