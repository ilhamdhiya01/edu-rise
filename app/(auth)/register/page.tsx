import { Auth } from '@/components/features/auth';

const RegisterPage = () => {
  return (
    <Auth.Layout>
      <Auth.BrandHeader subtitle="Daftar" />
      <Auth.RegisterForm />
    </Auth.Layout>
  );
};

export default RegisterPage;
