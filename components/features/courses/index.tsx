// import { default as CourseCard } from './CourseCard';
import { default as FilterDrawer } from './FilterDrawer';
export type { FilterCategory, FilterSubcategory } from './FilterSidebar';
import { default as CourseHeader } from './CourseHeader';
import { default as FilterSidebar } from './FilterSidebar';
import { default as ListCourse } from './ListCourse';

export const Courses = {
  // CourseCard,
  CourseHeader,
  FilterSidebar,
  ListCourse,
  FilterDrawer,
} as const;
