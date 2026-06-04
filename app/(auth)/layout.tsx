import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth - Edu Rise',
  description: 'Sign in or sign up to access your Edu Rise dashboard',
};

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main>{children}</main>;
};

export default AuthLayout;
