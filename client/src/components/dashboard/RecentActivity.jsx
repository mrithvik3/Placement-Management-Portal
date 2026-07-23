import {
  Building2,
  User,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";

const activities = [
  {
    icon: Building2,
    title: "Applied to Google",
    time: "2 hours ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: User,
    title: "Profile Updated",
    time: "Yesterday",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Clock,
    title: "Microsoft Drive Announced",
    time: "Yesterday",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: CheckCircle2,
    title: "Amazon Application Submitted",
    time: "3 days ago",
    color: "bg-purple-100 text-purple-600",
  },
];

function RecentActivity() {
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

        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50"
            >

              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.color}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {activity.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default RecentActivity;