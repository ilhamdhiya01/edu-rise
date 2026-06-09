// export { default as CourseCard } from './CourseCard';
// export type { FilterCategory, FilterSubcategory } from './FilterSidebar';
// export { default as FilterSidebar } from './FilterSidebar';

import { default as CourseCard } from './CourseCard';
export type { FilterCategory, FilterSubcategory } from './FilterSidebar';
import { default as FilterSidebar } from './FilterSidebar';
import { default as ListCourse } from './ListCourse';

export const Courses = {
  CourseCard,
  FilterSidebar,
  ListCourse,
} as const;
