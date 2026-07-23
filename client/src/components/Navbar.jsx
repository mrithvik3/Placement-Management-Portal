import {
  Bell,
  Search,
  CalendarDays,
} from "lucide-react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 flex items-center gap-2">
            <CalendarDays size={16} />
            {today}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {greeting}
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-slate-900">
              {user?.name || "User"}
            </span>
          </p>

        </div>

        <div className="flex items-center gap-5">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search companies..."
              className="w-72 rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200 transition">

            <Bell size={20} />

            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>

          </button>

          <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2">

            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold">
                {user?.name || "User"}
              </p>

              <p className="text-sm text-slate-500 capitalize">
                {user?.role || "Student"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;