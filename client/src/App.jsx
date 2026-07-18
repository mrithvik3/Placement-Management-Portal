import "./styles/App.css";
import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { useState } from "react";

function App() {
  const [applications, setApplications] = useState(0);

  return (
    <>
      <Navbar />

      <button onClick={() => setApplications(applications + 1)}>
        Apply
      </button>

      <button
        onClick={() => {
          if (applications > 0) {
            setApplications(applications - 1);
          }
        }}
      >
        Withdraw
      </button>

      <button onClick={() => setApplications(0)}>
        Reset
      </button>

      <h2>Applications Submitted: {applications}</h2>

      {applications > 0 && (
        <p>Application Submitted Successfully ✅</p>
      )}

      <div className="company-container">
        <CompanyCard
          company="Amazon"
          salaryPackage="28 LPA"
          location="Hyderabad"
        />

        <CompanyCard
          company="Microsoft"
          salaryPackage="32 LPA"
          location="Bengaluru"
        />

        <CompanyCard
          company="Google"
          salaryPackage="40 LPA"
          location="Hyderabad"
        />
      </div>
    </>
  );
}

export default App;