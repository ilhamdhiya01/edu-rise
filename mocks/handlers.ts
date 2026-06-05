// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

import { MOCK_USER } from '@/const/user.constant';
import { dbOps } from '@/lib/index-db';
import { LoginInput } from '@/lib/types/auth.types';
import { API_AUTH_LOGIN } from '@/routes';

export const handlers = [
  // Mencegat HTTP POST ke '/api/auth/login'
  http.post(API_AUTH_LOGIN, async ({ request }) => {
    const requestBody = (await request.json()) as LoginInput;

    // Simulasi jika login berhasil
    if (requestBody?.email === 'user@gmail.com') {
      await dbOps.add('users', MOCK_USER);
      return HttpResponse.json(
        {
          success: true,
          data: MOCK_USER,
        },
        {
          status: 200,
        }
      );
    }

    // Simulasi jika login gagal
    return HttpResponse.json(
      {
        success: false,
        message: 'Email atau password salah!',
      },
      { status: 401 }
    );
  }),

  // Mencegat HTTP GET ke '/api/auth/me'
  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      success: true,
      data: { id: '1', name: 'Developer Ganteng', email: 'user@gmail.com' },
    });
  }),
];
