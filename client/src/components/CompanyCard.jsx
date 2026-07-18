function CompanyCard({
  company,
  role,
  salaryPackage,
  location,
  eligibility,
  deadline,
  skills,
  status,
}) {
  return (
    <div className="company-card">
  <h2>{company}</h2>

  <p><strong>Role:</strong> {role}</p>

  <p><strong>Package:</strong> {salaryPackage}</p>

  <p><strong>Location:</strong> {location}</p>

  <p><strong>Eligibility:</strong> {eligibility}</p>

  <p><strong>Deadline:</strong> {deadline}</p>

  <p><strong>Skills:</strong> {skills}</p>

  <p><strong>Status:</strong> {status}</p>

  <button>Apply</button>
</div>
  );
}

export default CompanyCard;