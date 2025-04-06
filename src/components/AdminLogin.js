import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://stisv.onrender.com/admin/login", {
        email,
        password,
      });

      sessionStorage.setItem("adminToken", response.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-login-page">
        <div className="admin-login-box">
          <h2>Administrator Login</h2>

          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="form-field">
              <input
                type="email"
                id="adminEmail"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <label htmlFor="adminEmail">Email</label>
            </div>

            <div className="form-field">
              <input
                type={showPassword ? "text" : "password"}
                id="adminPassword"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <label htmlFor="adminPassword">Password</label>
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="error-message">{error || "\u00A0"}</p>
          </form>
        </div>
      </div>

      <br /><br />
      <Footer />
    </>
  );
};

export default AdminLogin;
