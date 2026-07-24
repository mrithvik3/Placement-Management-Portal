import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApplicationsChart from "../components/dashboard/ApplicationsChart";
import UpcomingDrives from "../components/dashboard/UpcomingDrives";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalCompanies: 0, totalApplications: 0, interviews: 0, selected: 0, upcomingDrives: [], recentApplications: [] });
  const user = JSON.parse(localStorage.getItem("user"));

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  };

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => toast.error("Failed to load dashboard"));
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-hero">
        <div>
          <p className="dashboard-date">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          <h1 className="dashboard-title">
  📊 Placement Dashboard
</h1>

<p className="dashboard-subtitle">
  Manage companies, applications, interviews and offers from one place.
</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard title="Companies" value={stats.totalCompanies} type="companies" />
        <StatsCard title="Applications" value={stats.totalApplications} type="applied" />
        <StatsCard title="Interviews" value={stats.interviews} type="upcoming" />
        <StatsCard title="Selected" value={stats.selected} type="offers" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingDrives drives={stats.upcomingDrives} />
        <RecentActivity activities={stats.recentApplications} />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
      <div className="mt-8">
        <ApplicationsChart />
      </div>
    </DashboardLayout>
  );
}