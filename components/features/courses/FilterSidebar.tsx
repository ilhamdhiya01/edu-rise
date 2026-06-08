'use client';

import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';

import Icon, { IconProps } from '@/components/ui/icon';

/**
 * @description Filter sidebar component for course filtering
 * @param {Object} filters - Available filter options
 * @param {Function} onFilterChange - Callback when filter selection changes
 * @returns {JSX.Element} Filter sidebar component
 */

export interface FilterCategory {
  id: string;
  name: string;
  icon: IconProps['icon'];
  count: number;
  subcategories?: FilterSubcategory[];
}

export interface FilterSubcategory {
  id: string;
  name: string;
  count: number;
}

interface FilterSidebarProps {
  categories: FilterCategory[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  totalCourses: number;
}

const FilterSidebar = React.memo<FilterSidebarProps>(
  ({ categories, selectedFilters, onFilterChange, totalCourses }) => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([
      categories[0]?.id || '',
    ]);

    const toggleCategory = useCallback((categoryId: string) => {
      setExpandedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    }, []);

    const handleFilterToggle = useCallback(
      (filterId: string) => {
        const newFilters = selectedFilters.includes(filterId)
          ? selectedFilters.filter((id) => id !== filterId)
          : [...selectedFilters, filterId];
        onFilterChange(newFilters);
      },
      [selectedFilters, onFilterChange]
    );

    const selectedCount = useMemo(
      () => selectedFilters.length,
      [selectedFilters.length]
    );

    return (
      <aside className="flex w-full flex-col gap-4">
        {/* Filter Categories */}
        <div className="flex flex-col divide-y divide-neutral-300 border-y border-neutral-200">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="overflow-hidden bg-white">
                {/* Category Header */}
                <div
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={
                        category.icon as
                          | 'TbCode'
                          | 'TbBriefcase'
                          | 'TbCoin'
                          | 'TbPalette'
                          | 'TbSpeakerphone'
                          | 'TbCamera'
                      }
                      size={20}
                      className={classNames('transition-colors', {
                        'text-primary-600': isExpanded,
                        'text-gray-400': !isExpanded,
                      })}
                    />
                    <span className={'text-sm font-medium text-neutral-900'}>
                      {category.name}
                    </span>
                  </div>
                  <Icon
                    icon={isExpanded ? 'TbChevronUp' : 'TbChevronDown'}
                    size={18}
                    className={classNames('stroke-3 transition-colors', {
                      'text-neutral-400': !isExpanded,
                      'text-primary-600': isExpanded,
                    })}
                  />
                </div>

                {/* Subcategories */}
                <div
                  className={classNames(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    {
                      'max-h-0': !isExpanded,
                      'max-h-[500px]': isExpanded,
                    }
                  )}
                >
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="flex flex-col gap-1 border-t border-neutral-200">
                        {category.subcategories.map((subcategory) => {
                          const isSelected = selectedFilters.includes(
                            subcategory.id
                          );

                          return (
                            <label
                              key={subcategory.id}
                              className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-neutral-50"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleFilterToggle(subcategory.id)
                                  }
                                  className="text-primary-600 focus:ring-primary-200 h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-offset-0"
                                />
                                <span
                                  className={classNames(
                                    'text-sm transition-colors',
                                    {
                                      'text-primary-700 font-medium':
                                        isSelected,
                                      'text-neutral-700': !isSelected,
                                    }
                                  )}
                                >
                                  {subcategory.name}
                                </span>
                              </div>
                              <span className="text-xs text-neutral-500">
                                {subcategory.count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Courses Info */}
        <div className="rounded-lg bg-neutral-50 px-4 py-3">
          <p className="text-sm text-neutral-600">
            Menampilkan{' '}
            <span className="font-semibold text-neutral-900">
              {totalCourses}
            </span>{' '}
            kursus
          </p>
        </div>
      </aside>
    );
  }
);

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
