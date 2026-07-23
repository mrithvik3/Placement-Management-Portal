const statusClasses = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  Interview: "bg-purple-100 text-purple-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-gray-100 text-gray-700",
};

export default function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        statusClasses[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}