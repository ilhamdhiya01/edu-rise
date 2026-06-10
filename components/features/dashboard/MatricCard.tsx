'use client';

import React from 'react';

import { SectionContent } from '@/components/shared/section-content';
import { useMyCourseList } from '@/lib/hooks/courses/useMyCourseList';

import MetricCardItem from './MetricCardItem';

const MatricCard = React.memo(() => {
  const { data: myCourses = [] } = useMyCourseList();

  const totalCourses = myCourses.length;
  const activeCourses = myCourses.filter(
    (c) => c.progress > 0 && c.progress < 100
  ).length;
  const finishedCourses = myCourses.filter((c) => c.progress === 100).length;
  return (
    <SectionContent title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1">
          <MetricCardItem
            icon="TbPlayerPlay"
            value={totalCourses}
            label="Kursus Saya"
            type="courses"
          />
        </div>
        <div className="col-span-1">
          <MetricCardItem
            icon="TbListCheck"
            value={activeCourses}
            label="Kursus Aktif"
            type="activeCourses"
          />
        </div>
        <div className="col-span-1">
          <MetricCardItem
            icon="TbTrophy"
            value={finishedCourses}
            label="Kursus Selesai"
            type="finishedCourses"
          />
        </div>
      </div>
    </SectionContent>
  );
});

MatricCard.displayName = 'MatricCard';

export default MatricCard;
