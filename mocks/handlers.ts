import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import { http, HttpResponse } from 'msw';

import { createMockJWT } from '@/lib/helpers';
import { dbOps } from '@/lib/index-db';
import { LoginRequest, RegisterRequest, User } from '@/lib/types/auth.types';
import { UserDataRequest } from '@/lib/types/profile.types';
import { API_AUTH_LOGIN, API_AUTH_REGISTER, API_AUTH_USERS } from '@/routes';

export const handlers = [
  // Mencegat HTTP POST ke '/api/auth/login'
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

      // generate token
      const token = createMockJWT(userProfile, requestBody.rememberMe || false);

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

  // Mencegat HTTP GET ke '/api/auth/users'
  http.get(`${API_AUTH_USERS}`, async ({ request }) => {
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

  http.put('/api/users/update', async ({ request }) => {
    try {
      const requestBody = (await request.json()) as UserDataRequest;

      const { email, ...updateData } = requestBody;

      const existingUser = await dbOps.getByEmail('users', email);

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
        ...updateData,
      };

      await dbOps.updateByEmail('users', email, mergedData);

      const { password: _, ...userData } = mergedData;

      return HttpResponse.json(
        {
          success: true,
          data: userData,
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

  http.put('/api/users/update-image', async ({ request }) => {
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
      const user = await dbOps.getByEmail('users', decoded.email);

      if (!user) {
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
        ...user,
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
];
