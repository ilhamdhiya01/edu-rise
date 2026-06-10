import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-neutral-600">Profile</h2>
      <div className="grid grid-cols-12 items-stretch gap-8">{children}</div>
    </>
  );
};

const layoutItemVariants = tv({
  base: 'col-span-12',
  variants: {
    colSpan: {
      1: 'md:col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
      4: 'md:col-span-4',
      5: 'md:col-span-5',
      6: 'md:col-span-6',
      7: 'md:col-span-7',
      8: 'md:col-span-8',
      9: 'md:col-span-9',
      10: 'md:col-span-10',
      11: 'md:col-span-11',
      12: 'md:col-span-12',
    },
  },
  defaultVariants: {
    colSpan: 3,
  },
});

interface LayoutItemProps extends VariantProps<typeof layoutItemVariants> {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const LayoutItem = ({
  children,
  colSpan,
  className,
  title,
}: LayoutItemProps) => {
  return (
    <div className={layoutItemVariants({ colSpan, className })}>
      {title && (
        <h2 className="mb-4 text-2xl font-semibold text-neutral-600">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Section = ({ children, title, className }: SectionProps) => {
  return (
    <div className={layoutItemVariants({ colSpan: 12, className })}>
      {title && (
        <h2 className="mb-4 text-2xl font-semibold text-neutral-600">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-12 gap-8 md:gap-0">{children}</div>
    </div>
  );
};
