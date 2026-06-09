import Icon from '@/components/ui/icon';
import Input from '@/components/ui/input';

interface CourseHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalCategories: number;
  totalSelectedFilters: number;
}

const CourseHeader = ({
  searchQuery,
  onSearchChange,
  totalCategories,
  totalSelectedFilters,
}: CourseHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
        Daftar kursus ({totalCategories})
      </h1>
      <div className="flex items-center justify-between gap-4">
        <div className="bg-primary-50 flex w-full max-w-xs items-center justify-between rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <Icon icon="TbFilter" size={18} className="text-primary-700" />
            <span className="text-primary-700 text-sm font-semibold">
              Filter
            </span>
          </div>
          {totalSelectedFilters > 0 && (
            <span className="bg-primary-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
              {totalSelectedFilters}
            </span>
          )}
        </div>
        <div className="w-full md:max-w-md">
          <Input
            type="search"
            placeholder="Cari kursus..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            prefix={{
              icon: 'TbSearch',
            }}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
