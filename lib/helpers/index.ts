import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a mock JWT token for development purposes.
 * Mirrors a real backend: it ONLY builds and returns the token.
 * Persisting it (cookie) is the frontend's responsibility.
 * @param payload The payload to encode in the JWT
 * @returns A mock JWT token
 */
export const createMockJWT = (payload: object) => {
  const signature = uuidv4();
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const data = btoa(JSON.stringify(payload));

  return `${header}.${data}.${signature}`;
};

/**
 * Persists the auth token into the `token` cookie on the client.
 * @param token The JWT token returned by the auth endpoint
 * @param isRememberMe Extends the cookie lifetime to 30 days when true
 * @returns void
 */
export const setAuthCookie = (token: string, isRememberMe = false) => {
  const maxAge = isRememberMe ? 86400 * 30 : 86400;
  document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
};

/**
 * Removes the `token` cookie from the client.
 * @returns void
 */
export const clearAuthCookie = () => {
  document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
};

/**
 * Extracts user data from the JWT token in cookies
 * @returns The decoded user data or null if invalid
 */
export const getUserFromToken = () => {
  try {
    if (typeof window === 'undefined') return null;

    const cookieString = document.cookie;
    // find cookie with name token
    const tokenMatch = cookieString.match(/(?:^|; )token=([^;]*)/);

    if (!tokenMatch) return null;

    const tokenString = tokenMatch[1];
    const parts = tokenString.split('.');
    if (parts.length !== 3) return null;
    const payloadJson = atob(parts[1]);
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
};

/**
 * Converts a File object to a data URL
 * @param file The file to convert
 * @returns A promise that resolves to the data URL
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
