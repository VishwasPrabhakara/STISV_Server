import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MemberAccess.css";

const MemberAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/abstract-submission";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    try {
      const response = await axios.post("https://stisv.onrender.com/login", {
        email,
        password,
      });

      if (response.data.token) {
        const { token, uid, fullName, email, country, phone } = response.data;

        // ✅ Store in sessionStorage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("uid", uid);
        sessionStorage.setItem("fullName", fullName);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("country", country);
        sessionStorage.setItem("phone", phone);

        // ✅ Also store in localStorage (fallback for pages like PaymentSuccess)
        localStorage.setItem("token", token);
        localStorage.setItem("uid", uid);

        // ✅ Redirect user
        navigate(
          redirectPath.startsWith("/stis2025")
            ? redirectPath.replace("/stis2025", "")
            : redirectPath
        );
      }
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="member-access-page">
        <main className={`member-access-container ${loading ? "blur" : ""}`}>
          {/* Login Section */}
          <div className="login-box">
            <h2>Member Login</h2>

            <div className="form-field">
              <input
                type="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <label htmlFor="password">Password</label>
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
            </div>

            <div className="login-actions">
              <p
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {message && <p className="login-error-message">{message}</p>}
          </div>

          {/* Register Section */}
          <div className="register-box">
            <h2>New Member</h2>
            <p>
              Join <strong>STIS 2025</strong> to build your online profile,
              showcase your research, and enjoy exclusive conference benefits.
            </p>
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </main>

        {loading && (
          <div className="overlay">
            <div className="loader" />
            <p style={{ color: "#fff", marginTop: "1rem" }}>Logging in...</p>
          </div>
        )}
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
};

export default MemberAccess;
