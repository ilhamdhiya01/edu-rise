import { useQuery } from '@tanstack/react-query';

import { FilterCategory } from '@/components/features/courses';
import { getCategories } from '@/services/course.service';

export const useCategories = () => {
  return useQuery({
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
};
