import { Building2, ChevronRight } from "lucide-react";

function RecentActivity({ activities = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-500">
            Your latest placement updates
          </p>
        </div>

        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Building2 size={18} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {activity.student?.name} applied to {activity.company?.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Status: {activity.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500">
            No recent activity.
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;