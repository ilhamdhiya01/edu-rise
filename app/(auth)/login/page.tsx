import { Auth } from '@/components/features/auth';

const LoginPage = () => {
  return (
    <Auth.Layout>
      <Auth.BrandHeader subtitle="Masuk" />
      <Auth.LoginForm />
    </Auth.Layout>
  );
};

export default LoginPage;
