import Link from 'next/link';

import { ROOT_PATH } from '@/routes';

import Notification from './Notification';
import UserDropdown from './user-dropdown';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-300 bg-white">
      <div className="container mx-auto flex w-full items-center justify-between">
        <Link
          href={ROOT_PATH}
          className="text-primary-500 text-2xl font-semibold"
        >
          EduRise
        </Link>
        <div className="flex items-center gap-6">
          <Notification />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
