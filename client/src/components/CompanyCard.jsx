import {
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaCalendarAlt,
  FaCode,
  FaEdit,
  FaTrash
} from "react-icons/fa";

export default function CompanyCard(props) {
  const {
  id,
  company,
  role,
  salaryPackage,
  location,
  eligibility,
  deadline,
  skills,
  status = "Open",
  isApplied,
  onApply,
  onWithdraw,
  onDelete,
  onEdit
} = props;

  return (
    <div className="company-card">
      <div className="card-header">
        <div className="company-title">
          <FaBuilding className="icon-building" />
          <h2>{company}</h2>
        </div>
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="card-body">
        <div className="info-row highlight">
          <FaBriefcase />
          <div>
            <label>Role</label>
            <strong>{role}</strong>
          </div>
        </div>

        <div className="info-row">
          <FaMoneyBillWave />
          <div>
            <label>Package</label>
            <span>{salaryPackage}</span>
          </div>
        </div>

        <div className="info-row">
          <FaMapMarkerAlt />
          <div>
            <label>Location</label>
            <span>{location}</span>
          </div>
        </div>

        <div className="info-row">
          <FaUserGraduate />
          <div>
            <label>Eligibility</label>
            <span>{eligibility}</span>
          </div>
        </div>

        <div className="info-row">
          <FaCalendarAlt />
          <div>
            <label>Deadline</label>
            <span>{deadline}</span>
          </div>
        </div>

        <div className="info-row full-width">
          <FaCode />
          <div>
            <label>Skills</label>
            <span>{skills}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {isApplied ? (
        <button
          className="apply-btn applied"
          onClick={() => onWithdraw(id)}
        >
          Withdraw
        </button>
      ) : (
        <button
          className="apply-btn"
          onClick={() => onApply(id)}
        >
          Apply Now
        </button>
      )}

        {onEdit && (
          <button className="icon-btn edit" onClick={() => onEdit(props)}>
            <FaEdit />
          </button>
        )}

        {onDelete && (
          <button className="icon-btn delete" onClick={() => onDelete(id)}>
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}
