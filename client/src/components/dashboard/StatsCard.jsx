import "./StatsCard.css";
import {
  FaBuilding,
  FaFileAlt,
  FaCalendarCheck,
  FaTrophy,
} from "react-icons/fa";

const cardConfig = {
  companies: {
    icon: <FaBuilding />,
    color: "#3b82f6",
    growth: "+12%",
  },
  applied: {
    icon: <FaFileAlt />,
    color: "#8b5cf6",
    growth: "+18%",
  },
  upcoming: {
    icon: <FaCalendarCheck />,
    color: "#f59e0b",
    growth: "+6%",
  },
  offers: {
    icon: <FaTrophy />,
    color: "#22c55e",
    growth: "+9%",
  },
};

export default function StatsCard({ title, value, type }) {
  const config = cardConfig[type];

  return (
    <div className="stats-card">
      <div
        className="stats-icon"
        style={{ background: config.color }}
      >
        {config.icon}
      </div>

      <div className="stats-content">
        <h4>{title}</h4>
        <h2>{value}</h2>
        <span>{config.growth}</span>
      </div>
    </div>
  );
}