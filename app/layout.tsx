import './globals.css';

import { Poppins } from 'next/font/google';

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
        className={`${poppins.className} bg-secondary-100 flex min-h-full flex-col`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
