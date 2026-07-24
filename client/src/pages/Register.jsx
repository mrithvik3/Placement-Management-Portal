import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: "student",
      });

      toast.success("Registration Successful!");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left */}

      <div className="auth-left">
        <div className="auth-brand">
          <h1>
            <FaGraduationCap /> PlacePro
          </h1>

          <p>
            Join PlacePro and manage your campus
            placement journey with ease.
          </p>

          <ul>
            <li>✔ Create your profile</li>
            <li>✔ Upload Resume</li>
            <li>✔ Apply to Companies</li>
            <li>✔ Track Application Status</li>
          </ul>
        </div>
      </div>

      {/* Right */}

      <div className="auth-right">
        <div className="auth-card">

          <h2>Create Account 🚀</h2>

          <p className="auth-subtitle">
            Register as a Student
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>
                <FaUser /> Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope /> Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
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
                  placeholder="Create password"
                  value={form.password}
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

            <div className="form-group">
              <label>
                <FaLock /> Confirm Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? (
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
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}