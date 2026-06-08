import React, { useCallback, useMemo, useState } from 'react';

import Icon from '@/components/ui/icon';
import Input from '@/components/ui/input';

import CourseCard, { Course } from './CourseCard';
import CourseHeader from './CourseHeader';
import FilterSidebar, { FilterCategory } from './FilterSidebar';

const MOCK_CATEGORIES: FilterCategory[] = [
  {
    id: 'pemrograman',
    name: 'Pemrograman',
    icon: 'TbCpu',
    count: 1345,
    subcategories: [
      { id: 'pemrograman-website', name: 'Pemrograman website', count: 574 },
      { id: 'data-science', name: 'Data science', count: 568 },
      { id: 'pemrograman-mobile', name: 'pemrograman mobile', count: 1345 },
      { id: 'framer', name: 'Framer', count: 558 },
      { id: 'webflow', name: 'Webflow', count: 124 },
    ],
  },
  {
    id: 'bisnis',
    name: 'Bisnis',
    icon: 'TbBriefcase',
    count: 850,
    subcategories: [
      { id: 'pemrograman-website', name: 'Pemrograman website', count: 574 },
      { id: 'data-science', name: 'Data science', count: 568 },
      { id: 'pemrograman-mobile', name: 'pemrograman mobile', count: 1345 },
      { id: 'framer', name: 'Framer', count: 558 },
      { id: 'webflow', name: 'Webflow', count: 124 },
    ],
  },
  {
    id: 'keuangan',
    name: 'Keuangan',
    icon: 'TbCoin',
    count: 420,
    subcategories: [
      { id: 'pemrograman-website', name: 'Pemrograman website', count: 574 },
      { id: 'data-science', name: 'Data science', count: 568 },
      { id: 'pemrograman-mobile', name: 'pemrograman mobile', count: 1345 },
      { id: 'framer', name: 'Framer', count: 558 },
      { id: 'webflow', name: 'Webflow', count: 124 },
    ],
  },
  {
    id: 'desain',
    name: 'Desain',
    icon: 'TbPalette',
    count: 680,
    subcategories: [],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'TbSpeakerphone',
    count: 530,
    subcategories: [],
  },
  {
    id: 'fotografi',
    name: 'Fotografi',
    icon: 'TbCamera',
    count: 290,
    subcategories: [],
  },
];

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Manajemen Proyek dengan Excel',
    subtitle: '10. Belajar pivot table',
    image: '/images/default.webp',
    category: 'Desain',
  },
  {
    id: '2',
    title: 'Desain Furniture dengan Sketch up',
    subtitle: '4. Perkenalan  sketch up warehouse',
    image: '/images/default.webp',
    category: 'Desain',
  },
  {
    id: '3',
    title: 'Motion Grafis dengan After Effect',
    subtitle: '4. Teknik stop motion',
    image: '/images/default.webp',
    category: 'Desain',
  },
  {
    id: '4',
    title: 'Belajar 3D Modelling dengan Blender',
    subtitle: '5. Perkenalan dengan rigging',
    image: '/images/default.webp',
    category: 'Desain',
  },
  {
    id: '5',
    title: 'Belajar Coding dengan Javascript',
    subtitle: '3. Belajar variable',
    image: '/images/default.webp',
    category: 'IT',
  },
  {
    id: '6',
    title: '3D Modelling Lanjutan dengan 3Ds Max',
    subtitle: '10. Perkenalan vertex',
    image: '/images/default.webp',
    category: 'Desain',
  },
];

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    'pemrograman-mobile',
  ]);

  // Filter courses based on search and selected filters
  const filteredCourses = useMemo(() => {
    let filtered = MOCK_COURSES;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (selectedFilters.length > 0) {
      // In real implementation, you would filter by actual category IDs
      // For now, we'll just return all courses when filters are selected
      filtered = filtered;
    }

    return filtered;
  }, [searchQuery, selectedFilters]);

  const handleFilterChange = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
  }, []);

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
  return (
    <div className="flex min-h-screen flex-col gap-6">
      <CourseHeader />
      {/* main content */}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <FilterSidebar
            categories={MOCK_CATEGORIES}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            totalCourses={filteredCourses.length}
          />
        </div>
        <div className="col-span-3 flex-1">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetail={handleViewDetail}
                  onAddCourse={handleAddCourse}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-neutral-600">
                Tidak ada kursus yang ditemukan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
