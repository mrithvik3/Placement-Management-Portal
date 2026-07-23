import {
  Building2,
  BriefcaseBusiness,
  IndianRupee,
  MapPin,
  GraduationCap,
  CalendarDays,
  Code2,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";

function CompanyCard({
  id,
  company,
  role,
  salaryPackage,
  location,
  eligibility,
  deadline,
  skills,
  status = "Open",
  isApplied,
  onApply,
  onWithdraw,
  onEdit,
  onDelete,
}) {
   console.log({
    id,
    isApplied,
    onApply,
    onWithdraw,
    onEdit,
    onDelete,
  });
  const statusColors = {
    Open: "bg-green-100 text-green-700",
    Closed: "bg-red-100 text-red-700",
    Upcoming: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <Building2 size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              {company}
            </h2>

            <p className="mt-1 flex items-center gap-2 text-slate-600">
              <BriefcaseBusiness size={16} />
              {role}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-4 py-1 text-sm font-semibold ${
            statusColors[status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="flex items-center gap-3">
          <IndianRupee className="text-blue-600" size={18} />
          <div>
            <p className="text-xs text-slate-500">Package</p>
            <p className="font-semibold">{salaryPackage}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-red-500" size={18} />
          <div>
            <p className="text-xs text-slate-500">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GraduationCap className="text-green-600" size={18} />
          <div>
            <p className="text-xs text-slate-500">Eligibility</p>
            <p className="font-semibold">{eligibility}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-amber-600" size={18} />
          <div>
            <p className="text-xs text-slate-500">Deadline</p>
            <p className="font-semibold">{deadline}</p>
          </div>
        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center gap-2 text-slate-600">
          <Code2 size={18} />
          <span className="font-medium">Skills</span>
        </div>

        <div className="flex flex-wrap gap-2">

          {skills?.split(",").map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm"
            >
              {skill.trim()}
            </span>
          ))}

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex gap-3">

          {onEdit && (
            <button
              onClick={() =>
                onEdit({
                  id,
                  company,
                  role,
                  salaryPackage,
                  location,
                  eligibility,
                  deadline,
                  skills,
                  status,
                })
              }
              className="rounded-xl bg-amber-100 p-3 text-amber-600 transition hover:bg-amber-200"
            >
              <Pencil size={18} />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
            >
              <Trash2 size={18} />
            </button>
          )}

        </div>

        {onApply && (
          isApplied ? (
            <button
              onClick={() => onWithdraw(id)}
              className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white"
            >
              Withdraw
            </button>
          ) : (
            <button
              onClick={() => onApply(id)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Apply Now
              <ArrowRight size={18} />
            </button>
          )
        )}

      </div>

    </div>
  );
}

export default CompanyCard;