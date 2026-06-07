import './globals.css';

import { Poppins } from 'next/font/google';

import QueryProviders from '@/components/providers';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body
        className={`${poppins.className} bg-secondary-100 relative flex min-h-full flex-col`}
      >
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
};

export default RootLayout;
