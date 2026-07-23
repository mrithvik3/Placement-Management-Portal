import { Search, Filter } from "lucide-react";

function CompanyToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">

      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search by name, role, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative flex items-center">
        <Filter
          size={18}
          className="absolute left-3 text-slate-400 pointer-events-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Open</option>
          <option>Closed</option>
          <option>Upcoming</option>
        </select>
      </div>

      {(searchTerm || statusFilter !== "All") && (
        <button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("All");
          }}
          className="rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default CompanyToolbar;