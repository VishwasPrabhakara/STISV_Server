import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AbstractSubmissionButton.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const themes = [
  "Fundamentals of Iron and Steelmaking.",
  "Raw Materials, use of Low-Grade Ores and Agglomeration.",
  "Coke, PCI, Hydrogen, Syngas, Biomass, and other Auxiliary Fuels.",
  "Blast Furnace and alternative routes for the production of Hot Metal.",
  "DRI/Solid-state Ironmaking processes.",
  "Primary, Secondary Steel making and Clean Steel Technology.",
  "Ingot and Continuous Casting.",
  "Electric arc/Induction furnace steelmaking.",
  "Process modelling and simulation in Iron and Steel making.",
  "Energy, Environment, and Sustainability in Iron and Steel making.",
  "Emerging and Sustainable Iron and Steelmaking processes.",
  "Refractories in Iron and Steel making.",
  "Digital transformation, Industry 4.0, and Data Analytics in Iron and Steel making.",
  "Waste Recycling and Circular Economy in Iron and Steel making."
];

const SubmitAbstractForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    presentingType: "",
    firstAuthorName: "",
    firstAuthorAffiliation: "",
    otherAuthors: [{ name: "", affiliation: "" }],
    presentingAuthorName: "",
    presentingAuthorAffiliation: "",
    abstractFile: null,
    mainBody: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const wordCount = formData.mainBody.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, abstractFile: e.target.files[0] }));
  };

  const handleOtherAuthorChange = (index, field, value) => {
    const updatedAuthors = [...formData.otherAuthors];
    updatedAuthors[index][field] = value;
    setFormData({ ...formData, otherAuthors: updatedAuthors });
  };

  const addOtherAuthorField = () => {
    if (formData.otherAuthors.length < 5) {
      setFormData({
        ...formData,
        otherAuthors: [...formData.otherAuthors, { name: "", affiliation: "" }]
      });
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "title", "theme", "presentingType",
      "firstAuthorName", "firstAuthorAffiliation",
      "presentingAuthorName", "presentingAuthorAffiliation",
      "abstractFile", "mainBody"
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });

    if (wordCount > 250) {
      newErrors.mainBody = "Abstract exceeds the 250-word limit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const token = sessionStorage.getItem("token");
    const uid = sessionStorage.getItem("uid");

    if (!token || !uid) {
      setMessage("Please log in before submitting.");
      setLoading(false);
      return;
    }

    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "otherAuthors") {
        submitFormData.append("otherAuthors", JSON.stringify(value));
      } else {
        submitFormData.append(key, value);
      }
    });
    submitFormData.append("uid", uid);

    try {
      const response = await fetch("https://stisv.onrender.com/submit-abstract", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: submitFormData,
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessPopup(true);
        setMessage("Submission successful!");
        setFormData({
          title: "", theme: "", presentingType: "",
          firstAuthorName: "", firstAuthorAffiliation: "",
          otherAuthors: [{ name: "", affiliation: "" }],
          presentingAuthorName: "", presentingAuthorAffiliation: "",
          abstractFile: null, mainBody: "",
        });
        setTimeout(() => navigate("/abstract-submission-status"), 3000);
      } else {
        setMessage(data.message || "Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const renderFloatingInput = (name, label, type = "text", isTextArea = false) => (
    <div className={`floating-group ${formData[name] ? "filled" : ""}`}>
      {isTextArea ? (
        <textarea name={name} value={formData[name]} onChange={handleChange} rows={6} required />
      ) : (
        <input type={type} name={name} value={formData[name]} onChange={handleChange} required />
      )}
      <label>{label}</label>
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="abstract-form-wrapper">
        {showSuccessPopup && (
          <div className="success-popup-overlay">
            <div className="success-popup">
              <h2>🎉 Success!</h2>
              <p>Your abstract was submitted successfully.</p>
            </div>
          </div>
        )}
        {loading && (
          <div className="overlay">
            <div className="loader"></div>
            <p style={{ color: "#fff", marginTop: "1rem" }}>Submitting your abstract...</p>
          </div>
        )}
        <h1 className="form-main-title">Submit Your Abstract</h1>
        <form className="abstract-form" onSubmit={handleSubmit}>
          {renderFloatingInput("title", "Title of the Paper *")}

          <div className={`floating-group ${formData.theme ? "filled" : ""}`}>
            <select name="theme" value={formData.theme} onChange={handleChange} required>
              <option value=""></option>
              {themes.map((theme, i) => (
                <option key={i} value={theme}>{theme}</option>
              ))}
            </select>
            <label>Select Conference Theme *</label>
            {errors.theme && <span className="error">{errors.theme}</span>}
          </div>

          <div className={`floating-group ${formData.presentingType ? "filled" : ""}`}>
            <select name="presentingType" value={formData.presentingType} onChange={handleChange} required>
              <option value=""></option>
              <option value="Oral">Oral</option>
              <option value="Poster">Poster</option>
            </select>
            <label>Preferred Mode of Presentation *</label>
            {errors.presentingType && <span className="error">{errors.presentingType}</span>}
          </div>

          <fieldset className="form-section">
            <legend>First Author *</legend>
            <div className="input-row">
              {renderFloatingInput("firstAuthorName", "Full Name")}
              {renderFloatingInput("firstAuthorAffiliation", "Affiliation")}
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Other Author(s), if any</legend>
            {formData.otherAuthors.map((author, index) => (
              <div className="input-row" key={index}>
                <div className={`floating-group ${author.name ? "filled" : ""}`}>
                  <input
                    type="text"
                    placeholder=" "
                    value={author.name}
                    onChange={(e) => handleOtherAuthorChange(index, "name", e.target.value)}
                  />
                  <label>Full Name</label>
                </div>
                <div className={`floating-group ${author.affiliation ? "filled" : ""}`}>
                  <input
                    type="text"
                    placeholder=" "
                    value={author.affiliation}
                    onChange={(e) => handleOtherAuthorChange(index, "affiliation", e.target.value)}
                  />
                  <label>Affiliation</label>
                </div>
              </div>
            ))}
            {formData.otherAuthors.length < 5 && (
              <div className="add-author-btn-wrapper">
                <button type="button" className="add-author-btn" onClick={addOtherAuthorField}>
                  + Add Another Author
                </button>
              </div>
            )}
          </fieldset>

          <fieldset className="form-section">
            <legend>Presenting Author *</legend>
            <div className="input-row">
              {renderFloatingInput("presentingAuthorName", "Full Name")}
              {renderFloatingInput("presentingAuthorAffiliation", "Affiliation")}
            </div>
          </fieldset>

          <div className={`floating-group abstract-file-group ${formData.abstractFile ? "filled" : ""}`}>
            <input type="file" name="abstractFile" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
            <label >Abstract File *</label>
            {errors.abstractFile && <span className="error">{errors.abstractFile}</span>}
          </div>

          <div className={`floating-group ${formData.mainBody ? "filled" : ""}`}>
            <textarea name="mainBody" value={formData.mainBody} onChange={handleChange} rows={6} required />
            <label>Main Abstract Text *</label>
            <div className={`word-counter ${wordCount > 250 ? "exceeded" : ""}`}>{wordCount} / 250 words</div>
            {errors.mainBody && <span className="error">{errors.mainBody}</span>}
          </div>

          {message && !showSuccessPopup && <p className="submission-message">{message}</p>}

          <div className="form-buttons">
            <button type="submit" className="btn-submit" disabled={loading}>Submit Abstract</button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default SubmitAbstractForm;
