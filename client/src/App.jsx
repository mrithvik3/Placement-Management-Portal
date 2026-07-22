import "./styles/App.css";
import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { useState, useEffect } from "react";

function App() {
  const [applications, setApplications] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [salaryPackage, setSalaryPackage] = useState("");
  const [location, setLocation] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
  const savedCompanies = localStorage.getItem("companies");
  return savedCompanies
    ? JSON.parse(savedCompanies)
    : defaultCompanies;
});

useEffect(() => {
  localStorage.setItem("companies", JSON.stringify(companies));
}, [companies]);

const handleAddCompany = () => {
  if (!companyName.trim()) return;

  if (editingId !== null) {
    setCompanies((currentCompanies) =>
      currentCompanies.map((company) =>
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
    setCompanies((currentCompanies) => [
      ...currentCompanies,
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
    setCompanies((currentCompanies) =>
      currentCompanies.filter((company) => company.id !== id)
    );
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

  const filteredCompanies = companies.filter((company) =>
  company.company.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="page-intro">
          <div>
            <p className="eyebrow">Placement dashboard</p>
            <h1>Discover your next opportunity.</h1>
            <p>Track applications and explore campus hiring opportunities in one place.</p>
          </div>
          <div className="opportunity-stat"><span>Open roles</span><strong>{companies.length}</strong></div>
        </section>

      <section className="form-section">
        <div className="section-heading"><div><p className="eyebrow">Recruiter tools</p><h2>Add a company</h2></div><p>Create a new opportunity for students.</p></div>
      <div className="company-form">
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input type="text" placeholder="Package" value={salaryPackage} onChange={(e) => setSalaryPackage(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="Eligibility" value={eligibility} onChange={(e) => setEligibility(e.target.value)} />
        <input type="text" placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <input type="text" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <button
          type="button"
          className="primary-button company-submit"
          onClick={handleAddCompany}
        >
          {editingId !== null ? "Update Company" : "Add Company"}
        </button>      </div>
      </section>  

      <section className="application-panel">
        <div className="application-copy"><p className="eyebrow">My applications</p><h2>Applications submitted: {applications}</h2></div>
        <div className="application-actions">
      <button className="primary-button" onClick={() => setApplications(applications + 1)}>
        Apply
      </button>

      <button className="secondary-button"
        onClick={() => {
          if (applications > 0) {
            setApplications(applications - 1);
          }
        }}
      >
        Withdraw
      </button>

      <button className="text-button" onClick={() => setApplications(0)}>
        Reset
      </button>
        </div>

      <div className="application-status">
      {applications > 0 && (
        <p>Application Submitted Successfully </p>
      )}
      </div>

      </section>

      <section className="companies-section">
        <div className="section-heading">
          <div><p className="eyebrow">Available roles</p><h2>Featured companies</h2></div>
          <span className="company-count">
            {filteredCompanies.length} role{filteredCompanies.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="company-container">
      {filteredCompanies.map((company) => (
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
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    ))}
        </div>
      </section>
      </main>
    </>
  );
}

export default App;
