'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Courses,
  FilterCategory,
  FilterSubcategory,
} from '@/components/features/courses';
import { SectionContent } from '@/components/shared/section-content';
import Input from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { getCategories, getCourses } from '@/services/course.service';

const FilterDrawer = dynamic(
  () => import('@/components/features/courses/FilterDrawer'),
  {
    loading: () => null,
    ssr: false,
  }
);

const CoursesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial filters from URL for dynamic rendering
  const initialFilters = useMemo(() => {
    const filters = searchParams.get('category');
    return filters ? filters.split(',') : [];
  }, [searchParams]);

  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(initialFilters);
  const [tempFilters, setTempFilters] = useState<string[]>(initialFilters);

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (response) =>
      response.data?.map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        count: cat.subCategories?.length || 0,
        subcategories: cat.subCategories?.map((sub) => ({
          id: sub.id,
          name: sub.name,
          count: 0,
          slug: sub.slug,
          categoryId: sub.categoryId,
        })),
      })) as FilterCategory[],
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    select: (response) => response.data || [],
  });

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchQuery.trim()) {
      params.set('search', debouncedSearchQuery);
    } else {
      params.delete('search');
    }

    router.replace(`/courses?${params.toString()}`, { scroll: false });
  }, [debouncedSearchQuery]);

  // Calculate course count for each subcategory
  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories?.map((sub: FilterSubcategory) => ({
        ...sub,
        count: courses.filter((c) => c.subCategoryId === sub.id).length,
      })),
    }));
  }, [categories, courses]);

  // Filter courses based on search and selected filters
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // first apply by category selected
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((course) =>
        selectedFilters.includes(course.subCategorySlug)
      );
    }

    // filter by search
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.subCategoryName.toLowerCase().includes(query) ||
          course.categoryName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [debouncedSearchQuery, selectedFilters, courses]);

  // Handle filter change
  const handleFilterChange = useCallback(
    (filters: string[]) => {
      setSelectedFilters(filters);

      const params = new URLSearchParams(searchParams.toString());
      if (filters.length > 0) {
        params.set('category', filters.join(','));
      } else {
        params.delete('category');
      }
      router.replace(`/courses?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleViewDetail = useCallback((courseId: string) => {
    console.log('View detail:', courseId);
    // Navigate to course detail page
  }, []);

  const handleAddCourse = useCallback((courseId: string) => {
    console.log('Add course:', courseId);
    // Add course to user's courses
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // On mobile version, execution filter after click apply button
  const handleApplyFilter = useCallback(() => {
    setSelectedFilters(tempFilters);
    handleFilterChange(tempFilters);
    setIsFilterOpen(false);
  }, [tempFilters, handleFilterChange]);

  // On mobile version, cancel filter
  const handleCancelFilter = useCallback(() => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(false);
  }, [selectedFilters]);

  // On mobile version, reset filter
  const handleResetFilter = useCallback(() => {
    setTempFilters([]);
  }, []);

  // On mobile version, open filter
  const handleOpenFilter = useCallback(() => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(true);
  }, [selectedFilters]);

  return (
    <>
      <SectionContent
        titleClassName="hidden lg:block"
        title={`Daftar kursus (${filteredCourses.length})`}
      >
        <Courses.CourseHeader
          totalSelectedFilters={selectedFilters.length}
          onFilterClick={handleOpenFilter}
        />
        <div className="grid grid-cols-4 gap-6">
          <div className="hidden lg:col-span-1 lg:block">
            <Courses.FilterSidebar
              categories={categoriesWithCount}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              totalCourses={filteredCourses.length}
            />
          </div>
          <div className="col-span-4 flex flex-1 flex-col gap-4 lg:col-span-3">
            <div className="ml-auto w-full lg:max-w-md">
              <Input
                type="search"
                placeholder="Cari kursus..."
                value={searchQuery}
                onChange={handleSearchChange}
                prefix={{
                  icon: 'TbSearch',
                }}
                fullWidth
              />
            </div>
            <Courses.ListCourse
              filteredCourses={filteredCourses}
              isLoading={coursesLoading}
              totalCourses={courses.length}
            />
          </div>
        </div>
      </SectionContent>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={handleCancelFilter}
        selectedFilters={tempFilters}
        totalCourses={categories.length}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
        onFilterChange={setTempFilters}
      >
        <Courses.FilterSidebar
          categories={categoriesWithCount}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          totalCourses={filteredCourses.length}
        />
      </FilterDrawer>
    </>
  );
};

const CoursesPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <CoursesPage />
    </Suspense>
  );
};

export default CoursesPageWrapper;
