

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConRegistration.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ConferenceRegistration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post("https://stisv.onrender.com/login", {
        email,
        password,
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("uid", response.data.uid);
        sessionStorage.setItem("fullName", response.data.fullName);

        navigate("/abstractsubmission");
      }
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="registration-page">
      <h2 className="page-title">Member Login</h2>

      <form className={`login-container ${loading ? "blur" : ""}`} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Please enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)"
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="remember-forgot">
          <div className="remember-me-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="forgot-password"
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          New User Registration
        </button>
        {message && <p className="message">{message}</p>}
      </form>

      {loading && (
        <div className="overlay">
          <div className="loader">Loading...</div>
          <p style={{ color: "#fff", marginTop: "1rem" }}>Logging in...</p>
        </div>
      )}
    </div>
  );
};

export default ConferenceRegistration;

