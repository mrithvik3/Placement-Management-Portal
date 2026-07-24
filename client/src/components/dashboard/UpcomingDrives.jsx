import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

export default function UpcomingDrives({ drives = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upcoming Drives</h2>
          <p className="text-sm text-slate-500">Companies visiting this week</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {drives.length > 0 ? (
          drives.map((drive) => (
            <div key={drive._id} className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                    {(drive.name || "C").charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{drive.name}</h3>
                    <p className="text-sm text-slate-500">{drive.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {drive.status || "Open"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin size={15} /> {drive.location}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={15} /> {drive.deadline ? new Date(drive.deadline).toLocaleDateString() : "N/A"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No upcoming drives available.
          </div>
        )}
      </div>
    </div>
  );
}