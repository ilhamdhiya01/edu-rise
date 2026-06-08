import { IconProps } from '@/components/ui/icon';

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: IconProps['icon'];
  subCategories: SubCategory[];
}

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Pemrograman',
    slug: 'pemrograman',
    icon: 'TbCpu',
    subCategories: [
      { id: 'sub-1-1', name: 'Web Development', slug: 'web-development' },
      { id: 'sub-1-2', name: 'Mobile Development', slug: 'mobile-development' },
      { id: 'sub-1-3', name: 'Data Science', slug: 'data-science' },
      { id: 'sub-1-4', name: 'Game Development', slug: 'game-development' },
      {
        id: 'sub-1-5',
        name: 'Programming Languages',
        slug: 'programming-languages',
      },
      { id: 'sub-1-6', name: 'DevOps', slug: 'devops' },
      { id: 'sub-1-7', name: 'Database', slug: 'database' },
      { id: 'sub-1-8', name: 'Software Testing', slug: 'software-testing' },
    ],
  },
  {
    id: 'cat-2',
    name: 'Bisnis',
    slug: 'bisnis',
    icon: 'TbBriefcase',
    subCategories: [
      { id: 'sub-2-1', name: 'Entrepreneurship', slug: 'entrepreneurship' },
      { id: 'sub-2-2', name: 'Manajemen', slug: 'manajemen' },
      { id: 'sub-2-3', name: 'Strategy', slug: 'strategy' },
      { id: 'sub-2-4', name: 'Sales', slug: 'sales' },
      { id: 'sub-2-5', name: 'Business Analytics', slug: 'business-analytics' },
      { id: 'sub-2-6', name: 'HR & Recruitment', slug: 'hr-recruitment' },
      { id: 'sub-2-7', name: 'E-Commerce', slug: 'e-commerce' },
    ],
  },
  {
    id: 'cat-3',
    name: 'Keuangan',
    slug: 'keuangan',
    icon: 'TbCoin',
    subCategories: [
      { id: 'sub-3-1', name: 'Akuntansi', slug: 'akuntansi' },
      { id: 'sub-3-2', name: 'Investasi', slug: 'investasi' },
      { id: 'sub-3-3', name: 'Cryptocurrency', slug: 'cryptocurrency' },
      { id: 'sub-3-4', name: 'Financial Planning', slug: 'financial-planning' },
      { id: 'sub-3-5', name: 'Pajak', slug: 'pajak' },
      { id: 'sub-3-6', name: 'Trading', slug: 'trading' },
    ],
  },
  {
    id: 'cat-4',
    name: 'Desain',
    slug: 'desain',
    icon: 'TbPalette',
    subCategories: [
      { id: 'sub-4-1', name: 'UI/UX Design', slug: 'ui-ux-design' },
      { id: 'sub-4-2', name: 'Graphic Design', slug: 'graphic-design' },
      { id: 'sub-4-3', name: '3D & Animation', slug: '3d-animation' },
      { id: 'sub-4-4', name: 'Web Design', slug: 'web-design' },
      { id: 'sub-4-5', name: 'Game Design', slug: 'game-design' },
      { id: 'sub-4-6', name: 'Interior Design', slug: 'interior-design' },
      { id: 'sub-4-7', name: 'Fashion Design', slug: 'fashion-design' },
    ],
  },
  {
    id: 'cat-5',
    name: 'Marketing',
    slug: 'marketing',
    icon: 'TbSpeakerphone',
    subCategories: [
      { id: 'sub-5-1', name: 'Digital Marketing', slug: 'digital-marketing' },
      {
        id: 'sub-5-2',
        name: 'Social Media Marketing',
        slug: 'social-media-marketing',
      },
      { id: 'sub-5-3', name: 'Content Marketing', slug: 'content-marketing' },
      { id: 'sub-5-4', name: 'SEO', slug: 'seo' },
      { id: 'sub-5-5', name: 'Email Marketing', slug: 'email-marketing' },
      { id: 'sub-5-6', name: 'Branding', slug: 'branding' },
      { id: 'sub-5-7', name: 'Copywriting', slug: 'copywriting' },
    ],
  },
  {
    id: 'cat-6',
    name: 'Fotografi',
    slug: 'fotografi',
    icon: 'TbCamera',
    subCategories: [
      {
        id: 'sub-6-1',
        name: 'Portrait Photography',
        slug: 'portrait-photography',
      },
      {
        id: 'sub-6-2',
        name: 'Product Photography',
        slug: 'product-photography',
      },
      {
        id: 'sub-6-3',
        name: 'Landscape Photography',
        slug: 'landscape-photography',
      },
      {
        id: 'sub-6-4',
        name: 'Wedding Photography',
        slug: 'wedding-photography',
      },
      { id: 'sub-6-5', name: 'Photo Editing', slug: 'photo-editing' },
      { id: 'sub-6-6', name: 'Videography', slug: 'videography' },
      { id: 'sub-6-7', name: 'Food Photography', slug: 'food-photography' },
    ],
  },
];
