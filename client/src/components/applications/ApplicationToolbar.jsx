export default function ApplicationToolbar({
  totalApplications,
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="text-slate-500">
          Total Applications: {totalApplications}
        </p>
      </div>
    </div>
  );
}