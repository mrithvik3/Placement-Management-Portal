import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaLinkedin,
  FaGithub,
  FaTools,
  FaInfoCircle,
  FaFilePdf,
} from "react-icons/fa";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import { getProfile, updateProfile, uploadResume } from "../services/userApi";

const clean = (val) => val?.trim() || "";
const calculateCompletion = (user) => {
  if (!user) return 0;
  const fields = [user.phone, user.branch, user.cgpa, user.graduationYear, user.linkedin, user.github, user.bio, user.skills?.length, user.resume?.url];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initials = user?.name?.split(" ").map((w) => w[0]).join("").toUpperCase() || "";
  const completion = calculateCompletion(user);

  useEffect(() => { getProfile().then((res) => setUser(res.data.user)).catch(console.error); }, []);

  const handleChange = (e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    if (clean(user.linkedin) && !clean(user.linkedin).startsWith("https://")) return toast.error("LinkedIn URL must start with https://");
    if (clean(user.github) && !clean(user.github).startsWith("https://")) return toast.error("GitHub URL must start with https://");
    if (user.cgpa !== undefined && (user.cgpa < 0 || user.cgpa > 10)) return toast.error("CGPA must be between 0 and 10.");
    if (user.graduationYear && (user.graduationYear < 2020 || user.graduationYear > 2035)) return toast.error("Enter a valid graduation year.");

    setLoading(true);
    try {
      const payload = {
        ...user,
        phone: clean(user.phone), branch: clean(user.branch), linkedin: clean(user.linkedin), github: clean(user.github), bio: clean(user.bio),
        skills: typeof user.skills === "string" ? user.skills.split(",").map((s) => s.trim()).filter(Boolean) : user.skills,
      };
      const res = await updateProfile(payload);
      setUser(res?.data?.user || (await getProfile()).data.user);
      toast.success("Profile Updated");
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleResumeUpload = async () => {
    if (!resume) return toast.error("Select a PDF");
    if (!resume.name.toLowerCase().endsWith(".pdf")) return toast.error("Only PDF files allowed.");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const res = await uploadResume(formData);
      setUser(res?.data?.user || (await getProfile()).data.user);
      toast.success("Resume Uploaded Successfully!");
      setResume(null);
      setFileKey((k) => k + 1);
    } catch (err) { console.error(err); toast.error("Resume upload failed."); } finally { setUploading(false); }
  };

  if (!user) return <DashboardLayout><h2>Loading Profile...</h2></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-hero">
            <div className="avatar-circle">{initials}</div>
            <div className="hero-info">
              <h1 className="profile-title">{user.name}</h1>
              <p className="profile-subtitle">{user.branch || "Branch not added"} • Batch {user.graduationYear || "----"}</p>
              <p className="hero-tagline">Complete your profile to improve placement opportunities.</p>
              <div className="completion-wrapper">
                <div className="completion-header"><span>Profile Completion</span><span>{completion}%</span></div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${completion}%`,
                      background: completion < 40 ? "#ef4444" : completion < 70 ? "#f59e0b" : "#22c55e",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-grid">
            <div className="form-group"><label><FaUser className="label-icon" />Name</label><input value={user.name || ""} disabled /></div>
            <div className="form-group"><label><FaEnvelope className="label-icon" />Email</label><input value={user.email || ""} disabled /></div>
            <div className="form-group"><label><FaPhone className="label-icon" />Phone</label><input type="tel" name="phone" value={user.phone || ""} onChange={handleChange} /></div>
            <div className="form-group"><label><FaGraduationCap className="label-icon" />Branch</label><input name="branch" value={user.branch || ""} onChange={handleChange} /></div>
            <div className="form-group"><label><FaGraduationCap className="label-icon" />CGPA</label><input type="number" step="0.1" min="0" max="10" name="cgpa" value={user.cgpa || ""} onChange={handleChange} /></div>
            <div className="form-group"><label><FaGraduationCap className="label-icon" />Graduation Year</label><input type="number" name="graduationYear" value={user.graduationYear || ""} onChange={handleChange} /></div>
            <div className="form-group"><label><FaLinkedin className="label-icon" />LinkedIn</label><input name="linkedin" value={user.linkedin || ""} onChange={handleChange} /></div>
            <div className="form-group"><label><FaGithub className="label-icon" />GitHub</label><input name="github" value={user.github || ""} onChange={handleChange} /></div>
            <div className="form-group full-width"><label><FaTools className="label-icon" />Skills</label><textarea name="skills" value={Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || ""} onChange={handleChange} /></div>
            <div className="form-group full-width"><label><FaInfoCircle className="label-icon" />Bio</label><textarea name="bio" value={user.bio || ""} onChange={handleChange} /></div>
          </div>
          <div className="button-row">
            <button className="primary-btn" disabled={loading} onClick={handleUpdate}>{loading ? "Updating..." : "Save Changes"}</button>
          </div>
        </div>
        <div className="resume-card">
          <h2 className="resume-title"><FaFilePdf />Resume</h2>
          <p className="resume-description">Upload your latest resume in PDF format. Recruiters will use this during placements.</p>
          <input className="file-input" key={fileKey} type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
          <br />
          <button className="primary-btn" disabled={uploading} onClick={handleResumeUpload}>{uploading ? "Uploading..." : "Upload Resume"}</button>
          {user.resume?.url && (
            <>
              <p className="success-text">✅ Resume Uploaded Successfully</p>
              <a className="resume-link" href={user.resume.url} target="_blank" rel="noreferrer">View / Download Resume</a>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}