'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/lib/hooks/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

import Dropdown from './Dropdown';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  // Close dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="block size-11 transform cursor-pointer overflow-hidden rounded-full drop-shadow-lg transition focus:outline-none active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={user?.image || '/images/default.webp'}
          alt="User"
          priority
          className="object-contain"
          width={44}
          height={44}
        />
      </div>
      <Dropdown isOpen={isOpen} onLogout={logout} />
    </div>
  );
};

export default UserDropdown;
