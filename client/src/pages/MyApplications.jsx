import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getMyApplications,
  withdrawApplication,
} from "../services/applicationService";

import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationToolbar from "../components/applications/ApplicationToolbar";

import LoadingSkeleton from "../components/common/LoadingSkeleton";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [applicationToWithdraw, setApplicationToWithdraw] =
    useState(null);

  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications || []);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!applicationToWithdraw) return;

    try {
      setWithdrawing(true);

      await withdrawApplication(
        applicationToWithdraw.company._id
      );

      setApplications((prev) =>
        prev.filter(
          (app) => app._id !== applicationToWithdraw._id
        )
      );

      toast.success("Application withdrawn");

      setApplicationToWithdraw(null);
    } catch (error) {
      toast.error("Failed to withdraw application");
    } finally {
      setWithdrawing(false);
    }
  };

return (
  <DashboardLayout>
    <div className="space-y-6">
      <ApplicationToolbar totalApplications={applications.length} />

      {loading ? (
        <LoadingSkeleton />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No Applications Yet"
          description="Start applying to companies to track your applications here."
        />
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onWithdraw={() => setApplicationToWithdraw(application)}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!applicationToWithdraw}
        title="Withdraw Application"
        message={`Are you sure you want to withdraw your application for ${
          applicationToWithdraw?.company?.name || ""
        }?`}
        loading={withdrawing}
        onConfirm={handleWithdraw}
        onClose={() => setApplicationToWithdraw(null)}
      />
    </div>
  </DashboardLayout>
);
}