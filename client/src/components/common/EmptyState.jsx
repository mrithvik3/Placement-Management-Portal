export default function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-slate-700">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}