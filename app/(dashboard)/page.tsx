import { Dashboard } from '@/components/features/dashboard';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Dashboard.MatricCard />
      <Dashboard.MyCourses />
      <Dashboard.RecomendationCourse />
    </div>
  );
};

export default DashboardPage;
