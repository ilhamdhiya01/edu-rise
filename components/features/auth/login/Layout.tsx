import { Auth } from '.';

const Layout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-[1440px] grid-cols-1 items-center justify-items-center gap-8 rounded-2xl bg-white p-6 md:p-12 lg:grid-cols-2 lg:p-16">
        <div className="hidden w-full items-center justify-center lg:flex">
          <Auth.Ilustration />
        </div>

        <div className="w-full space-y-8">
          <Auth.BrandHeader />
          <Auth.Form />
        </div>
      </div>
    </div>
  );
};

export default Layout;
