import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import EmptyState from "../components/common/EmptyState";

import {
  getCompanyApplicants,
  updateApplicationStatus,
} from "../services/applicationService";

const STATUS_OPTIONS = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

export default function CompanyApplicants() {
  const { companyId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    setLoading(true);

    try {
      const data = await getCompanyApplicants(companyId);
      setApplications(data.applications || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Company Applicants
          </h1>
          <p className="text-slate-500">
            Manage application statuses
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : applications.length === 0 ? (
          <EmptyState
            title="No Applicants"
            description="No students have applied yet."
          />
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {application.student?.name}
                    </h2>

                    <p className="text-slate-500">
                      {application.student?.email}
                    </p>

                    <p className="mt-2 text-sm">
                      Applied On:{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <select
                    value={application.status}
                    onChange={(e) =>
                      handleStatusChange(
                        application._id,
                        e.target.value
                      )
                    }
                    className="rounded-lg border px-4 py-2"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}