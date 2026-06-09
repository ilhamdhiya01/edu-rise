import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import Icon from '@/components/ui/icon';
import { useUser } from '@/lib/hooks/useUser';

interface DropdownProps {
  isOpen: boolean;
  onLogout: () => void;
}

const Dropdown = ({ isOpen, onLogout }: DropdownProps) => {
  const { user } = useUser();

  return (
    <div
      className={classNames(
        'absolute top-full right-0 z-50 mt-2 w-50 origin-top-right overflow-hidden rounded-lg',
        'bg-white shadow-lg transition-all duration-200 ease-out',
        {
          'visible scale-100 transform opacity-100': isOpen,
          'pointer-events-none invisible scale-95 transform opacity-0': !isOpen,
        }
      )}
    >
      <div className="flex items-center gap-2 border-b border-gray-200 p-3">
        <div className="size-9 overflow-hidden rounded-full drop-shadow">
          <Image
            src={user?.image || '/images/default.webp'}
            alt="User"
            priority
            className="object-contain"
            width={36}
            height={36}
          />
        </div>
        <div className="min-w-0">
          <p className="max-w-[120px] truncate text-sm font-medium">
            {`${user?.firstName} ${user?.lastName}`}
          </p>
          <p className="text-xs text-gray-500">{user?.position}</p>
        </div>
      </div>
      <div>
        <Link
          href="/profile"
          className="group flex items-center gap-2 p-3 transition-colors hover:bg-gray-100"
        >
          <Icon
            icon="TbUser"
            size={18}
            className="group-hover:text-primary-600 stroke-3 text-gray-400 transition-colors"
          />
          <span className="group-hover:text-primary-600 text-xs transition-colors">
            Profile Saya
          </span>
        </Link>
      </div>
      <div className="border-t border-gray-200 py-1.5">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          className="flex w-full items-center gap-2 p-3 text-red-600 transition-colors hover:bg-red-100"
        >
          <Icon
            icon="TbLogout"
            size={18}
            className="stroke-3 transition-colors"
          />
          <span className="text-xs">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
