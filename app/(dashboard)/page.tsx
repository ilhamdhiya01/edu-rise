'use client';

import MetricCardItem from '@/components/features/dashboard/MetricCardItem';
import { SectionContent } from '@/components/shared/section-content';
import StateStatus from '@/components/shared/state-status';

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
      <SectionContent title="Kursus Saya (3)">
        <StateStatus
          title="Belum ada kursus yang diikuti"
          description="Tambah kursus di daftar kursus"
          action={{
            label: 'Tambahkan Kursus',
            onClick: () => {},
          }}
        />
        {/* <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-center text-2xl font-semibold text-neutral-900">
            Belum ada kursus yang diikuti
          </h2>
          <p className="mt-2 text-center text-neutral-600">
            Tambah kursus di daftar kursus
          </p>
          <Button label="Tambahkan Kursus" className="mt-4" />
        </div> */}
      </SectionContent>
      <SectionContent title="Rekomendasi Kursus">
        <StateStatus
          title="Belum ada daftar kursus yang dapat diikuti"
          description="Mohon tunggu beberapa saat ..."
        />
        {/* <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-center text-2xl font-semibold text-neutral-900">
            Belum ada daftar kursus yang dapat diikuti
          </h2>
          <p className="mt-2 text-center text-neutral-600">
            Mohon tunggu beberapa saat ...
          </p>
        </div> */}
      </SectionContent>
    </div>
  );
};

export default DashboardPage;
