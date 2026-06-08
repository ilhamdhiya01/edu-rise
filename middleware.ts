import { NextRequest, NextResponse } from 'next/server';

import { authRoutes, LOGIN_PATH, privateRoutes, ROOT_PATH } from './routes';

export const middleware = (request: NextRequest) => {
  const { nextUrl, url, cookies } = request;

  const token = cookies.get('token')?.value;
  const path = nextUrl.pathname;

  const isPrivateRoutes = privateRoutes.some((route) => {
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(path);
  });

  const isAuthRoute = authRoutes.some((route) => {
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(path);
  });

  // Redirect to root if user is authenticated and tries to access auth route
  if (token && isAuthRoute) {
    const redirectUrl = new URL(ROOT_PATH, url);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to login if user is not authenticated and tries to access private route
  if (!token && isPrivateRoutes) {
    return NextResponse.redirect(new URL(LOGIN_PATH, url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
