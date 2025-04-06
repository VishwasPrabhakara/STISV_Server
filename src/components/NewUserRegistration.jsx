import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./NewUserRegistration.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Select from "react-select";
import countryList from "react-select-country-list";

const options = countryList().getData();

const NewUserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    givenName: "",
    familyName: "",
    fullName: "",
    country: "India",
    affiliation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const getPasswordValidationStatus = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[\W_]/.test(password),
  });

  const isPasswordValid = (password) =>
    Object.values(getPasswordValidationStatus(password)).every(Boolean);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://stisv.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login-signup"), 3000);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error, please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="registration-page">
        <h2 className="page-title"><br />Join STIS 2025 Today!</h2>
        <p className="page-subtext">Create your account to access exclusive content and submit your abstract.</p>
        <div className="registration-container">
          <form onSubmit={handleSubmit} className="form-content">

            <div className="floating-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
              <label htmlFor="email">E-mail <span className="required">*</span></label>
            </div>

            <div className={`floating-group password-group ${isPasswordValid(formData.password) && passwordTouched ? "valid-input" : ""}`}>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordTouched(true);
                  }}
                  placeholder=" "
                  required
                />
                <label htmlFor="password">Create Password <span className="required">*</span></label>
                <span className="password-toggle" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {isPasswordValid(formData.password) && passwordTouched && (
                  <span className="success-check">&#10003;</span>
                )}
              </div>
              {formData.password && !isPasswordValid(formData.password) && (
                <div className="password-validation">
                  <ul>
                    {[
                      { key: "length", text: "Minimum 8 characters" },
                      { key: "uppercase", text: "At least one uppercase letter" },
                      { key: "lowercase", text: "At least one lowercase letter" },
                      { key: "number", text: "At least one number" },
                      { key: "specialChar", text: "At least one special character" },
                    ].map(({ key, text }) => (
                      <li key={key} className={getPasswordValidationStatus(formData.password)[key] ? "valid" : "invalid"}>
                        {getPasswordValidationStatus(formData.password)[key] ? "✅" : "❌"} {text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={`floating-group password-group ${formData.confirmPassword && formData.confirmPassword === formData.password ? "valid-input" : ""}`}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                  setConfirmTouched(true);
                }}
                placeholder=" "
                required
              />
              <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
              <span className="password-toggle" onClick={() => setShowConfirmPassword(prev => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formData.confirmPassword && formData.confirmPassword === formData.password && confirmTouched && (
                <span className="success-check">&#10003;</span>
              )}
            </div>

            <div className="floating-group phone-group">
              <label className="static-label">Telephone <span className="required">*</span></label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputClass="input-field"
                enableSearch
                autoFormat
                required
              />
            </div>

            <div className="floating-group">
              <input type="text" name="givenName" value={formData.givenName} onChange={handleChange} placeholder=" " required />
              <label htmlFor="givenName">Given Name / First Name <span className="required">*</span></label>
            </div>

            <div className="floating-group">
              <input type="text" name="familyName" value={formData.familyName} onChange={handleChange} placeholder=" " />
              <label htmlFor="familyName">Family Name / Surname</label>
            </div>

            <div className="floating-group">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder=" " required />
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
            </div>

            <div className="floating-group">
  <label className="static-label">Country/Region <span className="required">*</span></label>
  <div className="react-select-wrapper">
    <Select
      options={options}
      value={options.find(opt => opt.label === formData.country)}
      onChange={(val) => setFormData({ ...formData, country: val.label })}
      classNamePrefix="country-select"
      placeholder="Select your country"
    />
  </div>
</div>

            <div className="floating-group">
              <input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} placeholder=" " required />
              <label htmlFor="affiliation">Affiliation <span className="required">*</span></label>
            </div>

            <div className="button-row">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className="return-btn" onClick={() => navigate("/login-signup")}>Back to Login</button>
            </div>

            {message && <p className="message">{message}</p>}
            {loading && (
              <div className="overlay">
                <div className="loader"></div>
                <p style={{ color: "#fff", marginTop: "1rem" }}>Processing your registration...</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default NewUserRegistration;
