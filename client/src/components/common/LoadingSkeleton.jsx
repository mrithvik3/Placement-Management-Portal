export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div className="h-6 w-2/3 rounded bg-slate-200" />

            <div className="h-4 w-1/2 rounded bg-slate-200" />

            <div className="h-4 w-3/4 rounded bg-slate-200" />

            <div className="h-4 w-2/5 rounded bg-slate-200" />

            <div className="flex gap-2 pt-4">
              <div className="h-9 flex-1 rounded-lg bg-slate-200" />
              <div className="h-9 flex-1 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}