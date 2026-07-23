import {
  TrendingUp,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
} from "lucide-react";

const icons = {
  companies: Building2,
  applied: BriefcaseBusiness,
  upcoming: CalendarDays,
  offers: TrendingUp,
};

function StatsCard({
  title,
  value,
  type,
}) {
  const Icon = icons[type];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-slate-100">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="bg-blue-100 p-3 rounded-xl">

          <Icon
            className="text-blue-600"
            size={28}
          />

        </div>

      </div>

    </div>
  );
}

export default StatsCard;