import "./styles/App.css";
import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { useState, useEffect } from "react";

function App() {
const [appliedCompanies, setAppliedCompanies] = useState(() => {
  const saved = localStorage.getItem("appliedCompanies");
  return saved ? JSON.parse(saved) : [];
});
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [salaryPackage, setSalaryPackage] = useState("");
  const [location, setLocation] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const defaultCompanies = [
    {
      id: 1,
      company: "Amazon",
      role: "Software Development Engineer",
      salaryPackage: "28 LPA",
      location: "Hyderabad",
      eligibility: "7.5 CGPA",
      deadline: "25 Jul 2026",
      skills: "Java, DSA, DBMS",
      status: "Open",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer",
      salaryPackage: "32 LPA",
      location: "Bengaluru",
      eligibility: "7.0 CGPA",
      deadline: "30 Jul 2026",
      skills: "Java, OOP, SQL",
      status: "Open",
    },
    {
      id: 3,
      company: "Google",
      role: "Software Engineer",
      salaryPackage: "40 LPA",
      location: "Hyderabad",
      eligibility: "8.0 CGPA",
      deadline: "5 Aug 2026",
      skills: "DSA, System Design",
      status: "Open",
    },
    {
      id: 4,
      company: "Adobe",
      role: "Frontend Developer",
      salaryPackage: "26 LPA",
      location: "Noida",
      eligibility: "7.0 CGPA",
      deadline: "10 Aug 2026",
      skills: "React, JavaScript",
      status: "Open",
    },
  ];

  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem("companies");
    return saved ? JSON.parse(saved) : defaultCompanies;
  });

  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(
      "appliedCompanies",
      JSON.stringify(appliedCompanies)
    );
  }, [appliedCompanies]);

  const handleAddCompany = () => {
    if (!companyName.trim()) return;

    if (editingId !== null) {
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === editingId
            ? {
                ...company,
                company: companyName,
                role,
                salaryPackage,
                location,
                eligibility,
                deadline,
                skills,
              }
            : company
        )
      );
      setEditingId(null);
    } else {
      setCompanies((prev) => [
        ...prev,
        {
          id: Date.now(),
          company: companyName,
          role,
          salaryPackage,
          location,
          eligibility,
          deadline,
          skills,
          status: "Open",
        },
      ]);
    }

    setCompanyName("");
    setRole("");
    setSalaryPackage("");
    setLocation("");
    setEligibility("");
    setDeadline("");
    setSkills("");
  };

  const handleDelete = (id) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    setAppliedCompanies((prev) => prev.filter((appId) => appId !== id));
  };

  const handleApply = (id) => {
    if (!appliedCompanies.includes(id)) {
      setAppliedCompanies((prev) => [...prev, id]);
    }
  };

  const handleWithdraw = (id) => {
    setAppliedCompanies((prev) =>
      prev.filter((companyId) => companyId !== id)
    );
  };

  const handleReset = () => {
    setAppliedCompanies([]);
  };

  const handleEdit = (company) => {
    setEditingId(company.id);
    setCompanyName(company.company);
    setRole(company.role);
    setSalaryPackage(company.salaryPackage);
    setLocation(company.location);
    setEligibility(company.eligibility);
    setDeadline(company.deadline);
    setSkills(company.skills);
  };

  const locations = [
    "All",
    ...new Set(companies.map((company) => company.location)),
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "All" || company.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="page-intro">
          <div className="hero-content">
            <p className="eyebrow">Placement Dashboard</p>
            <h1>Discover Your Next Opportunity 🚀</h1>
            <p>
              Manage placement drives, track applications and prepare for your
              dream company from one dashboard.
            </p>
          </div>

          <div className="hero-badge">
            <span>Open Roles</span>
            <strong>{filteredCompanies.length}</strong>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Companies</h3>
            <h1>{companies.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Applications</h3>
            <h1>{appliedCompanies.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Open Roles</h3>
            <h1>
              {
                companies.filter((company) => company.status === "Open")
                  .length
              }
            </h1>
          </div>

          <div className="stat-card">
            <h3>Locations</h3>
            <h1>{locations.length > 1 ? locations.length - 1 : 0}</h1>
          </div>
        </section>

        {/* ================= ADD COMPANY ================= */}
        <section className="form-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recruiter Panel</p>
              <h2>
                {editingId !== null ? "Update Company" : "Add New Company"}
              </h2>
            </div>
            <p>Create and manage placement opportunities.</p>
          </div>

          <div className="company-form">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Package"
              value={salaryPackage}
              onChange={(e) => setSalaryPackage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Eligibility"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
            />
            <input
              type="text"
              placeholder="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button
              className="primary-button company-submit"
              onClick={handleAddCompany}
            >
              {editingId !== null ? "Update Company" : "Add Company"}
            </button>
          </div>
        </section>

        {/* ================= APPLICATIONS ================= */}
        <section className="application-panel">
          <div className="application-copy">
            <p className="eyebrow">My Applications</p>
            <h2>Applications Submitted : {appliedCompanies.length}</h2>
          </div>

          <div className="application-actions">
            <button
              className="secondary-button"
              onClick={handleWithdraw}
              disabled={appliedCompanies.length === 0}
            >
              Withdraw
            </button>
            <button className="text-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </section>

        {/* ================= AVAILABLE COMPANIES ================= */}
        <section className="companies-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Available Opportunities</p>
              <h2>Featured Companies</h2>
            </div>
            <span className="company-count">
              {filteredCompanies.length}{" "}
              {filteredCompanies.length === 1 ? "Role" : "Roles"}
            </span>
          </div>

          {/* Search & Filter Bar */}
          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-box">
              <label>📍</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          <div className="company-container">
            {filteredCompanies.length === 0 ? (
              <div className="empty-state">
                <h2>No Companies Found 😔</h2>
                <p>
                  Try searching with another company name or change the location
                  filter.
                </p>
              </div>
            ) : (
              filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  id={company.id}
                  company={company.company}
                  role={company.role}
                  salaryPackage={company.salaryPackage}
                  location={company.location}
                  eligibility={company.eligibility}
                  deadline={company.deadline}
                  skills={company.skills}
                  status={company.status}
                  isApplied={appliedCompanies.includes(company.id)}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onApply={handleApply}
                  onWithdraw={handleWithdraw}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Placement Management Portal | Built with ❤️ using React</p>
      </footer>
    </>
  );
}

export default App;