import { default as FilterDrawer } from './FilterDrawer';
export type { FilterCategory, FilterSubcategory } from './FilterSidebar';
import { default as CourseHeader } from './CourseHeader';
import { default as FilterSidebar } from './FilterSidebar';
import { default as FilterSidebarSkeleton } from './FilterSidebarSkelaton';
import { default as ListCourse } from './ListCourse';

export const Courses = {
  CourseHeader,
  FilterSidebar,
  FilterSidebarSkeleton,
  ListCourse,
  FilterDrawer,
} as const;
