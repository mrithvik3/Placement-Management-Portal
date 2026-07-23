import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicationCard({
  application,
  onWithdraw,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {application.company.name}
          </h2>

          <p className="text-slate-600">
            {application.company.role}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            📍 {application.company.location}
          </p>

          <p className="text-sm text-slate-500">
            Applied on{" "}
            {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <ApplicationStatusBadge
            status={application.status}
          />

          {application.status === "Applied" && (
            <button
              onClick={() =>
                onWithdraw(application.company._id)
              }
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
}