'use client';

import Link from 'next/link';
import React from 'react';

import Icon, { IconProps } from '@/components/ui/icon';

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { label: 'Pemrograman', href: '/courses' },
    { label: 'Keuangan', href: '/courses' },
    { label: 'Desain', href: '/courses' },
    { label: 'Bisnis', href: '/courses' },
  ];

  const support = [
    { label: 'Tentang kami', href: '/about' },
    { label: 'Kontak kami', href: '/contact' },
    { label: 'Bergabung dengan kami', href: '/join' },
  ];

  const help = [
    { label: 'Pusat bantuan', href: '/help' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Syarat & ketentuan', href: '/terms' },
    { label: 'Kebijakan privasi', href: '/privacy' },
  ];

  const socialMedia = [
    {
      icon: 'TbBrandLinkedin',
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon: 'TbBrandInstagram',
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: 'TbBrandFacebook',
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    { icon: 'TbBrandYoutube', href: 'https://youtube.com', label: 'YouTube' },
    { icon: 'TbBrandTwitter', href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="mt-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-primary-500 text-2xl font-bold">EduRise</h2>
            <p className="mt-4 text-sm text-neutral-400">
              Tingkatkan kemampuanmu, raih masa depan lebih baik
            </p>

            {/* Social Media Icons */}
            <div className="mt-6 flex gap-3">
              {socialMedia.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 hover:bg-primary-700 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon icon={social.icon as IconProps['icon']} size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* 4 Kategori teratas */}
          <div>
            <h3 className="text-base font-semibold">4 Kategori teratas</h3>
            <ul className="mt-4 space-y-3">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tautan */}
          <div>
            <h3 className="text-base font-semibold">Tautan</h3>
            <ul className="mt-4 space-y-3">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-base font-semibold">Bantuan</h3>
            <ul className="mt-4 space-y-3">
              {help.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-base font-semibold">Download EduRise di</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* App Store Button */}
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 transition-colors hover:bg-neutral-700"
              >
                <Icon icon="TbBrandApple" size={24} />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">
                    Download on the
                  </span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </Link>

              {/* Play Store Button */}
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 transition-colors hover:bg-neutral-700"
              >
                <Icon icon="TbBrandGooglePlay" size={24} />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">GET IT ON</span>
                  <span className="text-sm font-semibold">Play Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-neutral-800 pt-8 text-center">
          <p className="text-sm text-neutral-400">
            © {currentYear} - EduRise. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
