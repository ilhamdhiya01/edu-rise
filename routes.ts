export const API_NEXT = 'api';

export const API_AUTH = `${API_NEXT}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_USERS = `${API_AUTH}/users`;
export const API_USERS_UPDATE = `${API_AUTH_USERS}/update`;
export const API_USERS_UPDATE_IMAGE = `${API_AUTH_USERS}/update-image`;
export const API_USERS_UPDATE_PASSWORD = `${API_AUTH_USERS}/update-password`;
export const API_USERS_UPDATE_NOTIFICATION_EMAIL = `${API_AUTH_USERS}/update-notification-email`;
export const API_USERS_UPDATE_NOTIFICATION_WHATSAPP = `${API_AUTH_USERS}/update-notification-whatsapp`;

export const API_CATEGORIES = `${API_NEXT}/categories`;

export const API_COURSES = `${API_NEXT}/courses`;
export const API_GET_MY_COURSES = `${API_COURSES}/my-courses`;
export const API_ADD_MY_COURSES = `${API_COURSES}/:courseId/my-courses`;

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
