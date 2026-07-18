import "./styles/App.css";
import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";

function App() {
  return (
    <>
      <Navbar />

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