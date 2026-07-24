import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UpcomingDrives from "../components/dashboard/UpcomingDrives";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalApplications: 0,
    interviews: 0,
    selected: 0,
    upcomingDrives: [],
    recentApplications: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard");
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Dashboard
        </span>

        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
          Dashboard Overview
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Track placement drives, applications, offers, and recruitment
          progress—all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Companies"
          value={stats.totalCompanies}
          type="companies"
        />

        <StatsCard
          title="Applications"
          value={stats.totalApplications}
          type="applied"
        />

        <StatsCard
          title="Interviews"
          value={stats.interviews}
          type="upcoming"
        />

        <StatsCard
          title="Selected"
          value={stats.selected}
          type="offers"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingDrives drives={stats.upcomingDrives} />
        <RecentActivity activities={stats.recentApplications} />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;