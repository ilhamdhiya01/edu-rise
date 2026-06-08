'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CourseHeader from '@/components/features/courses/CourseHeader';
import FilterSidebar, {
  FilterCategory,
} from '@/components/features/courses/FilterSidebar';
import ListCourse from '@/components/features/courses/ListCourse';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { getCategories, getCourses } from '@/services/course.service';

const CoursesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    const filters = searchParams.get('category');
    return filters ? filters.split(',') : [];
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });

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
        })),
      })) as FilterCategory[],
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    select: (response) => response.data || [],
  });

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

  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories?.map((sub) => ({
        ...sub,
        count: courses.filter((c) => c.subCategoryId === sub.id).length,
      })),
    }));
  }, [categories, courses]);

  // Filter courses based on search and selected filters
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // 1. Apply category filters dulu (by subcategory)
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((course) =>
        selectedFilters.includes(course.subCategorySlug)
      );
    }

    // Filter by search
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

  console.log({ selectedFilters });

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <CourseHeader
        totalCategories={categories.length}
        searchQuery={searchQuery}
        onSearchChange={(value) =>
          handleSearchChange({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <FilterSidebar
            categories={categoriesWithCount}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            totalCourses={filteredCourses.length}
          />
        </div>
        <div className="col-span-3 flex-1">
          <ListCourse filteredCourses={filteredCourses} />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
