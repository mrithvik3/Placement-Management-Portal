import { X } from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  role: "",
  package: "",
  location: "",
  eligibility: "",
  skills: "",
  status: "Open",
  deadline: "",
};

export default function CompanyModal({
  isOpen,
  onClose,
  onSave,
  company = null,
  saving = false,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (company) {
      setFormData({
        ...company,
        skills: Array.isArray(company.skills)
          ? company.skills.join(", ")
          : company.skills || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [company]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {company ? "Edit Company" : "Add Company"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid max-h-[80vh] gap-4 overflow-y-auto p-6 md:grid-cols-2"
        >
          <input
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          <input
            name="package"
            placeholder="Package (e.g. 12 LPA)"
            value={formData.package}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            name="eligibility"
            placeholder="Eligibility (e.g. 7.0 CGPA)"
            value={formData.eligibility}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:col-span-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="Open">Open</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? company
                  ? "Updating..."
                  : "Creating..."
                : company
                ? "Update Company"
                : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}