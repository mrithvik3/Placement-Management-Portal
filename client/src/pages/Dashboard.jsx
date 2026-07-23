import UpcomingDrives from "../components/dashboard/UpcomingDrives";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Dashboard</span>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Dashboard Overview</h1>
        <p className="mt-3 max-w-2xl text-slate-600 text-lg">
          Track placement drives, applications, offers, and recruitment progress—all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard title="Companies" value="24" type="companies" />
        <StatsCard title="Applied" value="8" type="applied" />
        <StatsCard title="Upcoming" value="5" type="upcoming" />
        <StatsCard title="Offers" value="2" type="offers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <UpcomingDrives />
        <RecentActivity />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;