import { LayoutDashboard, Building2, FileText, User, Settings, LogOut, GraduationCap } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Companies", icon: Building2, path: "/companies" },
  { name: "Applications", icon: FileText, path: "/applications" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col justify-between min-h-screen border-r border-slate-800">
      <div>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PlacePro
              </h2>
              <p className="text-xs text-slate-400">Smart Placement System</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-slate-300 hover:bg-slate-800/80 hover:translate-x-1 hover:text-white"
                  }`
                }
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="mb-5 rounded-2xl bg-slate-800 p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold">{user?.name || "User"}</p>
              <p className="text-sm text-slate-400 capitalize">{user?.role || "Student"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium transition-all duration-300 hover:bg-red-600 hover:scale-[1.02] active:scale-95 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

        <p className="mt-5 text-center text-xs text-slate-500">PlacePro v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;