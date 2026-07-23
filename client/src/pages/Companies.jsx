import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import CompanyCard from "../components/companies/CompanyCard";
import CompanyToolbar from "../components/companies/CompanyToolbar";
import CompanyModal from "../components/companies/CompanyModal";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ConfirmModal from "../components/common/ConfirmModal";
import EmptyState from "../components/common/EmptyState";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../services/companyService";
import { applyToCompany, withdrawApplication, getMyApplications } from "../services/applicationService";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      const companyList = Array.isArray(data) ? data : data.companies || [];
      setCompanies(companyList);
      return companyList;
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch companies");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentApplications = async (companyList) => {
    if (user.role !== "student") return;
    try {
      const data = await getMyApplications();
      const appliedIds = new Set(data.applications.map((app) => app.company._id));
      setCompanies(companyList.map((company) => ({ ...company, isApplied: appliedIds.has(company._id) })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (companyId) => {
    try {
      await applyToCompany(companyId);
      const companyList = await fetchCompanies();
      await fetchStudentApplications(companyList);
      toast.success("Application submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleWithdraw = async (companyId) => {
    try {
      await withdrawApplication(companyId);
      const companyList = await fetchCompanies();
      await fetchStudentApplications(companyList);
      toast.success("Application withdrawn");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to withdraw");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const companyList = await fetchCompanies();
      if (user.role === "student") {
        await fetchStudentApplications(companyList);
      }
    };
    loadData();
  }, []);

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const openModal = (company = null) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const filteredCompanies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return companies.filter((c) => {
      const matchesSearch = [c.name, c.role, c.location].filter(Boolean).some((val) => val.toLowerCase().includes(term));
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, statusFilter]);

  const onSave = async (companyData) => {
    setSaving(true);
    try {
      if (editingCompany) {
        const updated = await updateCompany(editingCompany._id, companyData);
        setCompanies((prev) => prev.map((c) => (c._id === editingCompany._id ? updated.company || updated : c)));
        toast.success("Company updated successfully");
      } else {
        const created = await createCompany(companyData);
        setCompanies((prev) => [created.company || created, ...prev]);
        toast.success("Company created successfully");
      }
      setSearchTerm("");
      setStatusFilter("All");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save company");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;
    setDeleting(true);
    try {
      await deleteCompany(companyToDelete._id);
      setCompanies((prev) => prev.filter((c) => c._id !== companyToDelete._id));
      toast.success("Company deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete company");
    } finally {
      setDeleting(false);
      setCompanyToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Companies</span>
            <h1 className="text-3xl font-black text-slate-900">Placement Drives</h1>
          </div>
          {user.role === "admin" && (
            <button onClick={() => openModal()} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
              + Add Company
            </button>
          )}
        </div>

        <CompanyToolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-800">{filteredCompanies.length}</span> of <span className="font-semibold text-slate-800">{companies.length}</span> companies
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.length === 0 ? (
              <EmptyState title={searchTerm || statusFilter !== "All" ? "No matching companies" : "No companies available"} description={searchTerm || statusFilter !== "All" ? "Try changing your search or filters." : "Companies will appear here once they are added."} />
            ) : (
              filteredCompanies.map((company) => (
                <CompanyCard key={company._id} id={company._id} company={company.name} role={company.role} salaryPackage={company.package} location={company.location} eligibility={company.eligibility} deadline={company.deadline} skills={company.skills?.join(", ")} status={company.status} isApplied={company.isApplied} onApply={user.role === "student" ? handleApply : null} onWithdraw={user.role === "student" ? handleWithdraw : null} onEdit={user.role === "admin" ? () => openModal(company) : null} onDelete={user.role === "admin" ? () => setCompanyToDelete(company) : null} />
              ))
            )}
          </div>
        )}
      </div>

      <CompanyModal isOpen={isModalOpen} company={editingCompany} saving={saving} onClose={closeModal} onSave={onSave} />
      <ConfirmModal isOpen={companyToDelete !== null} title="Delete Company" message={`Are you sure you want to delete ${companyToDelete?.name || "this company"}? This action cannot be undone.`} loading={deleting} onConfirm={confirmDelete} onClose={() => setCompanyToDelete(null)} />
    </DashboardLayout>
  );
}