import React, { useState, useEffect } from "react";
import "./Step2AbstractDetails.css";

const Step2AbstractDetails = ({ formData, updateFormData, setAbstractsError }) => {
  const [selectedAbstractIndex, setSelectedAbstractIndex] = useState(0);
  const [error, setError] = useState("");

  const abstracts = formData.abstractSubmissions || [];

  // ✅ Universal function to check duplicates
  const checkForDuplicatePresenters = (abstractList) => {
    const names = abstractList.map(abs => abs.presentingAuthorName?.trim().toLowerCase()).filter(Boolean);
    const nameSet = new Set();
    for (const name of names) {
      if (nameSet.has(name)) {
        return true; // Duplicate found
      }
      nameSet.add(name);
    }
    return false;
  };

  useEffect(() => {
    if (abstracts.length > 0) {
      const hasDuplicate = checkForDuplicatePresenters(abstracts);
      if (hasDuplicate) {
        setError("❌ Each abstract must have a different presenting author. Duplicate found.");
        setAbstractsError(true);  // ✅ inform parent
      } else {
        setError("");
        setAbstractsError(false); // ✅ inform parent
      }
    }
  }, [abstracts, selectedAbstractIndex, setAbstractsError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedAbstracts = [...abstracts];

    updatedAbstracts[selectedAbstractIndex] = {
      ...updatedAbstracts[selectedAbstractIndex],
      [name]: value,
    };

    updateFormData({ abstractSubmissions: updatedAbstracts });

    // Immediate check for presenting author
    if (name === "presentingAuthorName") {
      const hasDuplicate = checkForDuplicatePresenters(updatedAbstracts);
      if (hasDuplicate) {
        setError("❌ This presenting author is already assigned to another abstract. Please use a different presenter.");
        setAbstractsError(true);
      } else {
        setError("");
        setAbstractsError(false);
      }
    }
  };

  return (
    <div className="step2-container">
      <h2 className="step2-title">Abstract Details</h2>

      <div className="abstract-summary">
        <strong>Number of Abstracts Submitted:</strong> {abstracts.length}
      </div>

      {abstracts.length > 0 && (
        <div className="abstract-tabs">
          {abstracts.map((abs, idx) => (
            <button
              key={idx}
              className={`abstract-tab ${idx === selectedAbstractIndex ? "active" : ""}`}
              onClick={() => setSelectedAbstractIndex(idx)}
            >
              {abs.abstractCode || `Abstract ${idx + 1}`}
            </button>
          ))}
        </div>
      )}

      {abstracts.length > 0 && abstracts[selectedAbstractIndex] && (
        <div className="abstract-details">
          <div className="step2-form-group">
            <label>Abstract Title</label>
            <input
              type="text"
              name="title"
              value={abstracts[selectedAbstractIndex].title || ""}
              onChange={handleChange}
              className="step2-input"
              placeholder="Enter abstract title"
            />
          </div>

          <div className="step2-form-group">
            <label>Presentation Type</label>
            <select
              name="presentingType"
              value={abstracts[selectedAbstractIndex].presentingType || ""}
              onChange={handleChange}
              className="step2-input"
            >
              <option value="">Select Type</option>
              <option value="Oral">Oral Presentation</option>
              <option value="Poster">Poster Presentation</option>
            </select>
          </div>

          <div className="step2-form-group">
            <label>Presenting Author</label>
            <input
              type="text"
              name="presentingAuthorName"
              value={abstracts[selectedAbstractIndex].presentingAuthorName || ""}
              onChange={handleChange}
              className="step2-input"
              placeholder="Enter presenting author's name"
            />
            {error && <div className="error-text">{error}</div>}
          </div>
        </div>
      )}

      <div className="abstract-note">
        📌 <i>One registered author can present only one paper/poster</i>
      </div>
    </div>
  );
};

export default Step2AbstractDetails;
