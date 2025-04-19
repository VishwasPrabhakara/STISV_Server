import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Autofill if previously saved
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedAdminEmail");
    const savedPassword = localStorage.getItem("rememberedAdminPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

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

      // ✅ Remember email & password
      if (rememberMe) {
        localStorage.setItem("rememberedAdminEmail", email);
        localStorage.setItem("rememberedAdminPassword", password);
      } else {
        localStorage.removeItem("rememberedAdminEmail");
        localStorage.removeItem("rememberedAdminPassword");
      }

      navigate("/admin-dashboard");
    } catch {
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
              />
              <label htmlFor="adminEmail">Email</label>
            </div>

            <div className="form-field password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="adminPassword"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="adminPassword">Password</label>
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="form-extra">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
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
