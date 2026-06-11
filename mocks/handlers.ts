import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import { http, HttpResponse } from 'msw';

import { createMockJWT } from '@/lib/helpers';
import { dbOps } from '@/lib/index-db';
import { LoginRequest, RegisterRequest, User } from '@/lib/types/auth.types';
import { MyCourseRequest } from '@/lib/types/course.types';
import {
  NotificationEmailRequest,
  NotificationWhatsappRequest,
  UpdatePasswordPayload,
  UserDataRequest,
} from '@/lib/types/profile.types';
import {
  API_ADD_MY_COURSES,
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_AUTH_USERS,
  API_CATEGORIES,
  API_COURSES,
  API_GET_MY_COURSES,
  API_USERS_UPDATE,
  API_USERS_UPDATE_IMAGE,
  API_USERS_UPDATE_NOTIFICATION_EMAIL,
  API_USERS_UPDATE_NOTIFICATION_WHATSAPP,
  API_USERS_UPDATE_PASSWORD,
} from '@/routes';

import { mockCourses } from './mockCourses';
import { mockCategories } from './mockData';

export const handlers = [
  // Login handler
  http.post(API_AUTH_LOGIN, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as LoginRequest;

      // Check if user already exists
      const existingUser: User = await dbOps.getByEmail(
        'users',
        requestBody.email
      );

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      // Step 2: Verify password using bcrypt (constant-time comparison)
      const isValid = await bcrypt.compare(
        requestBody.password,
        existingUser.password!
      );

      if (!isValid) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Invalid email or password',
          },
          { status: 401 }
        );
      }

      const userProfile = {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        image: existingUser.image,
        position: existingUser.position,
      };

      // generate token (cookie is persisted on the client, like a real API)
      const token = createMockJWT(userProfile);

      return HttpResponse.json(
        {
          success: true,
          data: {
            user: userProfile,
            token,
          },
          message: 'Login successful',
        },
        { status: 200 }
      );
    } catch {
      return HttpResponse.json(
        {
          success: false,
          message: 'Something went wrong during login',
        },
        { status: 500 }
      );
    }
  }),

  // Mencegat HTTP POST ke '/api/auth/register'
  http.post(API_AUTH_REGISTER, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as RegisterRequest;

      // Check if user already exists
      const existingUser = await dbOps.getByEmail('users', requestBody.email);

      if (existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User already exists',
          },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(requestBody.password, 10);

      const newUser = {
        ...requestBody,
        password: hashedPassword,
        image: '/images/default.webp',
        position: 'Senior Frontend',
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await dbOps.add('users', newUser);

      const userProfile = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
        position: newUser.position,
      };

      // generate token
      const token = createMockJWT(userProfile);

      return HttpResponse.json(
        {
          success: true,
          data: {
            user: userProfile,
            token,
          },
          message: 'Register berhasil',
        },
        { status: 201 }
      );
    } catch {
      return HttpResponse.json(
        {
          success: false,
          message: 'Terjadi kesalahan saat register',
        },
        { status: 500 }
      );
    }
  }),

  // Mencegat HTTP GET ke '/api/auth/users'
  http.get(API_AUTH_USERS, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const email = url.searchParams.get('email');

      if (!email) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Email is required',
          },
          { status: 400 }
        );
      }

      const user: User = await dbOps.getByEmail('users', email);

      if (!user) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      const { password: _, ...userData } = user;

      const userDataWithoutPassword: Omit<User, 'password'> = {
        ...userData,
      };

      return HttpResponse.json(
        {
          success: true,
          data: userDataWithoutPassword,
        },
        { status: 200 }
      );
    } catch {
      return HttpResponse.json(
        {
          success: false,
          message: 'Terjadi kesalahan saat mendapatkan user',
        },
        { status: 500 }
      );
    }
  }),

  // Update user handler
  http.put(API_USERS_UPDATE, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as UserDataRequest;

      let token = request.headers.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);
      const user: User = await dbOps.getByEmail('users', decoded.email);

      const existingUser = await dbOps.getByEmail('users', user.email);

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      const mergedData = {
        ...existingUser,
        ...requestBody,
      };

      await dbOps.updateByEmail('users', user.email, mergedData);

      if (decoded.email !== requestBody.email) {
        const userProfile = {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: requestBody.email,
          image: existingUser.image,
          position: existingUser.position,
        };

        // generate token (cookie is persisted on the client, like a real API)
        token = createMockJWT(userProfile);
      }

      const { password: _, ...userData } = mergedData;

      return HttpResponse.json(
        {
          success: true,
          data: {
            ...(decoded.email !== requestBody.email
              ? { user: userData, token }
              : { ...userData }),
          },
          message: 'User data updated successfully',
        },
        { status: 200 }
      );
    } catch {
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to update user data',
        },
        { status: 500 }
      );
    }
  }),

  // Update image handler
  http.put(API_USERS_UPDATE_IMAGE, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as {
        image: string;
      };
      const token = request.headers
        .get('Authorization')
        ?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);
      const existingUser = await dbOps.getByEmail('users', decoded.email);

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      // Update image in IndexedDB
      await dbOps.updateByEmail('users', decoded.email, {
        image: requestBody.image,
      });

      const { password: _, ...userData } = {
        ...existingUser,
        image: requestBody.image,
      };

      return HttpResponse.json(
        {
          success: true,
          data: userData,
          message: 'Profile image updated successfully',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Update image error:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to update profile image',
        },
        { status: 500 }
      );
    }
  }),

  // Update password handler
  http.put(API_USERS_UPDATE_PASSWORD, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as UpdatePasswordPayload;
      const token = request.headers
        .get('Authorization')
        ?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);

      const existingUser = await dbOps.getByEmail('users', decoded.email);

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        requestBody.password,
        existingUser.password!
      );

      if (!isPasswordValid) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Current password is incorrect',
          },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(requestBody.newPassword, 10);

      // Update image in IndexedDB
      await dbOps.updateByEmail('users', decoded.email, {
        password: hashedPassword,
      });

      const { password: _, ...userData } = existingUser;

      return HttpResponse.json(
        {
          success: true,
          data: userData,
          message: 'Password updated successfully',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Update password error:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to update password',
        },
        { status: 500 }
      );
    }
  }),

  // Update notification email handler
  http.put(API_USERS_UPDATE_NOTIFICATION_EMAIL, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as NotificationEmailRequest;
      const token = request.headers
        .get('Authorization')
        ?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);

      const existingUser: User = await dbOps.getByEmail('users', decoded.email);

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      const updatedUser = {
        ...existingUser,
        isNotificationEmail: requestBody.isNotificationEmail,
        isWeeklyReport: requestBody.isWeeklyReport,
        isCertificateAchievement: requestBody.isCertificateAchievement,
        isNewCourseRecommendation: requestBody.isNewCourseRecommendation,
      };

      // Update image in IndexedDB
      await dbOps.updateByEmail('users', decoded.email, updatedUser);

      const { password: _, ...userData } = updatedUser;

      return HttpResponse.json(
        {
          success: true,
          data: userData,
          message: 'Email settings updated successfully',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Update notification email error:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to update notification email settings',
        },
        { status: 500 }
      );
    }
  }),

  // Update notification whatsapp handler
  http.put(API_USERS_UPDATE_NOTIFICATION_WHATSAPP, async ({ request }) => {
    try {
      const requestBody = (await request.json()) as NotificationWhatsappRequest;
      const token = request.headers
        .get('Authorization')
        ?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);

      const existingUser: User = await dbOps.getByEmail('users', decoded.email);

      if (!existingUser) {
        return HttpResponse.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 }
        );
      }

      const updatedUser = {
        ...existingUser,
        isNotificationWhatsapp: requestBody.isNotificationWhatsapp,
        isMotivationalMessage: requestBody.isMotivationalMessage,
      };

      // Update image in IndexedDB
      await dbOps.updateByEmail('users', decoded.email, updatedUser);

      const { password: _, ...userData } = updatedUser;

      return HttpResponse.json(
        {
          success: true,
          data: userData,
          message: 'Whatsapp settings updated successfully',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Update notification whatsapp error:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to update notification whatsapp settings',
        },
        { status: 500 }
      );
    }
  }),

  // Get categories handler
  http.get(API_CATEGORIES, async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }
    return HttpResponse.json(
      {
        success: true,
        data: mockCategories,
        message: 'Categories retrieved successfully',
      },
      { status: 200 }
    );
  }),

  // Get courses handler
  http.get(API_COURSES, async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }
    return HttpResponse.json(
      {
        success: true,
        data: mockCourses,
        message: 'Courses retrieved successfully',
      },
      { status: 200 }
    );
  }),

  // Add my courses handler
  http.post(API_ADD_MY_COURSES, async ({ request, params }) => {
    try {
      const requestBody = (await request.json()) as MyCourseRequest;
      const token = request.headers
        .get('Authorization')
        ?.replace('Bearer ', '');

      if (!token) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }

      const decoded = jwtDecode<{ email: string }>(token);

      const existingCourses = await dbOps.getByCourseId(
        'my-courses',
        params.courseId as string
      );

      const alreadyOwned = existingCourses.some(
        (c: Record<string, unknown>) => c.email === decoded.email
      );

      if (alreadyOwned) {
        return HttpResponse.json(
          {
            success: false,
            message: 'This course is already in your course list',
          },
          { status: 400 }
        );
      }

      const courseData = {
        ...requestBody,
        courseId: params.courseId,
        email: decoded.email,
        enrolledAt: new Date().toISOString(),
      };

      await dbOps.add('my-courses', courseData as Record<string, unknown>);

      return HttpResponse.json(
        {
          success: true,
          data: courseData,
          message: 'Success to add my course',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Add course error:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Failed to add my course',
        },
        { status: 500 }
      );
    }
  }),

  // Get my courses handler
  http.get(API_GET_MY_COURSES, async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const decoded = jwtDecode<{ email: string }>(token);

    const result = await dbOps.getAll('my-courses');

    const filteredResult = result.filter(
      (course) => course.email === decoded.email
    );

    return HttpResponse.json(
      {
        success: true,
        data: filteredResult,
        message: 'Courses retrieved successfully',
      },
      { status: 200 }
    );
  }),
];
