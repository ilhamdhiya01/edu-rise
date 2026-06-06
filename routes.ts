export const API_NEXT = 'api';

export const API_AUTH = `${API_NEXT}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;
export const API_AUTH_USERS = `${API_AUTH}/users`;

export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const DASHBOARD_PATH = '/dashboard';
export const COURSE_LIST_PATH = '/courses';
export const PROFILE_PATH = '/profile';
export const ROOT_PATH = '/';

export const privateRoutes = [
  ROOT_PATH,
  DASHBOARD_PATH,
  COURSE_LIST_PATH,
  PROFILE_PATH,
];

export const publicRoutes = [LOGIN_PATH, REGISTER_PATH];

export const authRoutes = [LOGIN_PATH, REGISTER_PATH];
