import React from 'react';

import Icon from '@/components/ui/icon';
import Input from '@/components/ui/input';

const CourseHeader = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
        Daftar kursus (6)
      </h1>
      <div className="flex items-center justify-between">
        <div className="bg-primary-50 flex w-full max-w-xs items-center justify-between rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <Icon icon="TbFilter" size={18} className="text-primary-700" />
            <span className="text-primary-700 text-sm font-semibold">
              Filter
            </span>
          </div>
          <span className="bg-primary-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
            3
          </span>
        </div>
        <div className="w-full md:max-w-md">
          <Input
            type="search"
            placeholder="UI/UX"
            //   value={searchQuery}
            //   onChange={handleSearchChange}
            prefix={{
              icon: 'TbSearch',
            }}
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
