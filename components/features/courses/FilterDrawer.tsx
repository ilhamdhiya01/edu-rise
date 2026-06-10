'use client';

import classNames from 'classnames';
import React, { useEffect } from 'react';

import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';

import FilterSidebar from './FilterSidebar';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  totalCourses: number;
  onApply: () => void;
  onReset: () => void;
  onFilterChange: (filters: string[]) => void;
  children?: React.ReactElement<React.ComponentProps<typeof FilterSidebar>>;
}

const FilterDrawer = React.memo<FilterDrawerProps>(
  ({
    isOpen,
    onClose,
    selectedFilters,
    totalCourses,
    children,
    onApply,
    onReset,
    onFilterChange,
  }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
      <>
        <div
          className={classNames(
            'fixed inset-0 z-40 min-h-screen bg-black/50 transition-opacity duration-300 lg:hidden',
            {
              'opacity-100': isOpen,
              'pointer-events-none opacity-0': !isOpen,
            }
          )}
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          className={classNames(
            'fixed inset-y-0 left-0 z-50 flex w-full transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out sm:max-w-md lg:hidden',
            {
              'translate-x-0': isOpen,
              '-translate-x-full': !isOpen,
            }
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <Icon icon="TbFilter" size={20} className="text-primary-700" />
              <h2 className="text-lg font-semibold text-neutral-900">
                Daftar Kursus ({totalCourses})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close filter"
            >
              <Icon icon="TbX" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {React.isValidElement(children) &&
              React.cloneElement(children, {
                selectedFilters: selectedFilters, // Override with tempFilters
                onFilterChange: onFilterChange, // Override with setTempFilters
              })}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-neutral-200 px-4 py-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Button
                  //   size="sm"
                  label="Reset Filter"
                  onClick={onReset}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex-1">
                <Button
                  //   size="sm"
                  label={`Terapkan (${selectedFilters.length})`}
                  onClick={onApply}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

FilterDrawer.displayName = 'FilterDrawer';

export default FilterDrawer;
