import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}

      <div className="auth-left">
        <div className="auth-brand">
          <h1>
            <FaGraduationCap /> PlacePro
          </h1>

          <p>
            A modern Placement Management Portal that helps students,
            recruiters and placement officers manage the complete campus
            recruitment process.
          </p>

          <ul>
            <li>✔ Track Applications</li>
            <li>✔ Manage Companies</li>
            <li>✔ Resume Management</li>
            <li>✔ Placement Dashboard</li>
          </ul>
        </div>
      </div>

      {/* Right Side */}

      <div className="auth-right">
        <div className="auth-card">

          <h2>Welcome Back 👋</h2>

          <p className="auth-subtitle">
            Login to continue
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>
                <FaEnvelope /> Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">

              <label>
                <FaLock /> Password
              </label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <button
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}