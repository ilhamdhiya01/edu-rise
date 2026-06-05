/**
 * Creates a mock JWT token for development purposes
 * @param payload The payload to encode in the JWT
 * @returns A mock JWT token
 */
export const createMockJWT = (payload: object) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const data = btoa(JSON.stringify(payload));
  const signature = 'mock-signature';
  return `${header}.${data}.${signature}`;
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
