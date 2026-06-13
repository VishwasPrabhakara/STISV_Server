import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import "./ForgotPassword.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");
  const uid = searchParams.get("uid");
  const isResetStep = Boolean(resetToken && uid);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!isResetStep) {
      try {
        const response = await axios.post(`${API_BASE_URL}/request-password-reset`, { email });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to send the reset link.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        uid,
        token: resetToken,
        newPassword,
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login-signup"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
    <div className="forgot-password-page">
      <h2 className="forgot-title">{isResetStep ? "Choose a New Password" : "Reset Password"}</h2>
      <div className={`forgot-container ${loading ? "blur" : ""}`}>
        <form onSubmit={handleSubmit} className="forgot-form">
          {!isResetStep && <div className="floating-label">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>}

          {isResetStep && <div className="floating-label password-field">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="new-password">New Password</label>
            <span
              className="toggle-visibility"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>}

          {isResetStep && <div className="floating-label password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <span
              className="toggle-visibility"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Please wait..." : isResetStep ? "Reset Password" : "Email Reset Link"}
          </button>

          {message && <p className="message">{message}</p>}

          <button className="back-btn" onClick={() => navigate("/login-signup")}>
          Back to Login
        </button>
        </form>

       
      </div>

      {loading && (
        <div className="overlay">
          <div className="loader"></div>
          <p style={{ color: "#fff", marginTop: "1rem" }}>Please wait...</p>
        </div>
      )}
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default ForgotPassword;
