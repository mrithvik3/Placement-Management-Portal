import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

const drives = [
  {
    company: "Google",
    role: "Software Engineer",
    location: "Hyderabad",
    date: "25 Jul",
    status: "Open",
    color: "bg-green-500",
  },
  {
    company: "Microsoft",
    role: "SDE Intern",
    location: "Bangalore",
    date: "28 Jul",
    status: "Registration",
    color: "bg-blue-500",
  },
  {
    company: "Amazon",
    role: "Cloud Engineer",
    location: "Chennai",
    date: "30 Jul",
    status: "Closing Soon",
    color: "bg-orange-500",
  },
];

function UpcomingDrives() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Drives
          </h2>

          <p className="text-sm text-slate-500">
            Companies visiting this week
          </p>
        </div>

        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
          <ChevronRight size={16} />
        </button>

      </div>

      <div className="space-y-4">

        {drives.map((drive) => (
          <div
            key={drive.company}
            className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className={`h-12 w-12 rounded-full ${drive.color} flex items-center justify-center text-white font-bold`}
                >
                  {drive.company.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {drive.company}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {drive.role}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {drive.status}
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <MapPin size={15} />
                {drive.location}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                {drive.date}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UpcomingDrives;