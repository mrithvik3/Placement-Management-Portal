function CompanyCard({ company, salaryPackage, location }) {
  return (
    <div className="company-card">
      <h2>{company}</h2>

      <p>Package : {salaryPackage}</p>

      <p>Location : {location}</p>
    </div>
  );
}

export default CompanyCard;