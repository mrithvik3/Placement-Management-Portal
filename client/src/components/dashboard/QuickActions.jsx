import { PlusCircle, Building2, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
  { title: "Add Company", description: "Create a new placement drive", icon: PlusCircle, color: "bg-blue-100 text-blue-600", route: "/companies?action=new" },
  { title: "Browse Companies", description: "View all active companies", icon: Building2, color: "bg-green-100 text-green-600", route: "/companies" },
  { title: "Applications", description: "Track student applications", icon: FileText, color: "bg-purple-100 text-purple-600", route: "/applications" },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
        <p className="text-sm text-slate-500">Frequently used shortcuts</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.title} onClick={() => navigate(action.route)} className="group rounded-2xl border border-slate-200 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-900">{action.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{action.description}</p>
              <div className="mt-5 flex items-center text-blue-600 font-medium">
                Open
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;