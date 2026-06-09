import { Dashboard } from '@/components/features/dashboard';
import MetricCardItem from '@/components/features/dashboard/MetricCardItem';
import { SectionContent } from '@/components/shared/section-content';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <SectionContent title="Dashboard">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <MetricCardItem
              icon="TbPlayerPlay"
              value={3}
              label="Kursus Saya"
              type="courses"
            />
          </div>
          <div className="col-span-1">
            <MetricCardItem
              icon="TbListCheck"
              value={2}
              label="Kursus Aktif"
              type="activeCourses"
            />
          </div>
          <div className="col-span-1">
            <MetricCardItem
              icon="TbTrophy"
              value={1}
              label="Kursus Selesai"
              type="finishedCourses"
            />
          </div>
        </div>
      </SectionContent>
      <Dashboard.MyCourses />
      <Dashboard.RecomendationCourse />
    </div>
  );
};

export default DashboardPage;
