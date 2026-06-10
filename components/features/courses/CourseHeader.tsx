import Icon from '@/components/ui/icon';

interface CourseHeaderProps {
  totalSelectedFilters: number;
  onFilterClick: () => void;
}

const CourseHeader = ({
  totalSelectedFilters,
  onFilterClick,
}: CourseHeaderProps) => {
  return (
    <button
      onClick={onFilterClick}
      className="bg-primary-50 flex justify-between rounded-lg px-4 py-3 lg:hidden"
    >
      <div className="flex items-center gap-2">
        <Icon icon="TbFilter" size={18} className="text-primary-700" />
        <span className="text-primary-700 text-sm font-semibold">Filter</span>
      </div>
      {totalSelectedFilters > 0 && (
        <span className="bg-primary-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
          {totalSelectedFilters}
        </span>
      )}
    </button>
  );
};

export default CourseHeader;
