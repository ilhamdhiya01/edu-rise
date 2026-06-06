import Link from 'next/link';

import { ROOT_PATH } from '@/routes';

import Notification from './Notification';
import UserDropdown from './user-dropdown/UserDropdown';

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-300 px-4 md:px-25">
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
    </header>
  );
};

export default Navbar;
