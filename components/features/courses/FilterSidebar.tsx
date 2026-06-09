'use client';

import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';

import Icon, { IconProps } from '@/components/ui/icon';
import { SubCategory } from '@/mocks/mockData';

export interface FilterCategory {
  id: string;
  name: string;
  icon: IconProps['icon'];
  count: number;
  subcategories?: FilterSubcategory[];
}

export interface FilterSubcategory extends SubCategory {
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
    // Track manually toggled categories (both expanded and collapsed)
    const [manuallyToggledCategories, setManuallyToggledCategories] = useState<{
      expanded: string[];
      collapsed: string[];
    }>({ expanded: [], collapsed: [] });

    // Auto-expand categories that have selected subcategories
    const expandedCategories = useMemo(() => {
      const autoExpandedCategories = categories
        .filter((cat) =>
          cat.subcategories?.some((sub) => selectedFilters.includes(sub.slug))
        )
        .map((cat) => cat.id);

      // Combine auto-expanded and manually expanded, exclude manually collapsed
      const shouldExpand = new Set([
        ...autoExpandedCategories,
        ...manuallyToggledCategories.expanded,
      ]);

      // Remove explicitly collapsed categories
      manuallyToggledCategories.collapsed.forEach((id) => {
        shouldExpand.delete(id);
      });

      return Array.from(shouldExpand);
    }, [selectedFilters, categories, manuallyToggledCategories]);

    const toggleCategory = useCallback(
      (categoryId: string) => {
        setManuallyToggledCategories((prev) => {
          const isCurrentlyExpanded = expandedCategories.includes(categoryId);

          if (isCurrentlyExpanded) {
            // Collapse it
            return {
              expanded: prev.expanded.filter((id) => id !== categoryId),
              collapsed: [
                ...prev.collapsed.filter((id) => id !== categoryId),
                categoryId,
              ],
            };
          } else {
            // Expand it
            return {
              expanded: [
                ...prev.expanded.filter((id) => id !== categoryId),
                categoryId,
              ],
              collapsed: prev.collapsed.filter((id) => id !== categoryId),
            };
          }
        });
      },
      [expandedCategories]
    );

    const handleFilterToggle = useCallback(
      (filterId: string) => {
        const newFilters = selectedFilters.includes(filterId)
          ? selectedFilters.filter((id) => id !== filterId)
          : [...selectedFilters, filterId];
        onFilterChange(newFilters);
      },
      [selectedFilters, onFilterChange]
    );

    return (
      <aside className="sticky top-25 flex h-[calc(100vh-6rem)] w-full flex-col gap-4 self-start overflow-auto">
        <div className="bg-primary-50 flex w-full max-w-xs items-center justify-between rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <Icon icon="TbFilter" size={18} className="text-primary-700" />
            <span className="text-primary-700 text-sm font-semibold">
              Filter
            </span>
          </div>
          {selectedFilters.length > 0 && (
            <span className="bg-primary-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
              {selectedFilters.length}
            </span>
          )}
        </div>
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
                      icon={category.icon}
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
                            subcategory.slug
                          );

                          return (
                            <label
                              key={subcategory.slug}
                              className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-neutral-50"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleFilterToggle(subcategory.slug)
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
