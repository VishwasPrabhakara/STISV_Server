import React, { useState } from "react";
import "./Step3AccompanyingDetails.css";

const Step3AccompanyingDetails = ({ formData, updateFormData }) => {
  const accompanyingPersons = formData.accompanyingPersons || [];

  const handleChange = (index, field, value) => {
    const updatedPersons = [...accompanyingPersons];
    updatedPersons[index] = {
      ...updatedPersons[index],
      [field]: value,
    };
    updateFormData({ accompanyingPersons: updatedPersons });
  };

  const handleAddPerson = () => {
    updateFormData({
      accompanyingPersons: [
        ...accompanyingPersons,
        { name: "", relation: "", dietaryPreference: "" },
      ],
    });
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = [...accompanyingPersons];
    updatedPersons.splice(index, 1);
    updateFormData({ accompanyingPersons: updatedPersons });
  };

  return (
    <div className="step3-container">
      <h2 className="step3-title">Personal Details of Accompanying Person</h2>

      {accompanyingPersons.map((person, idx) => (
        <div key={idx} className="accompanying-person-card">
          <div className="step3-form-group">
            <label>Name</label>
            <input
              type="text"
              value={person.name || ""}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              className="step3-input"
              placeholder="Enter name"
            />
          </div>

          <div className="step3-form-group">
            <label>Relation</label>
            <input
              type="text"
              value={person.relation || ""}
              onChange={(e) => handleChange(idx, "relation", e.target.value)}
              className="step3-input"
              placeholder="Enter relation"
            />
          </div>

          <div className="step3-form-group">
            <label>Dietary Preference</label>
            <select
              value={
                person.dietaryPreference === "Vegetarian" ||
                person.dietaryPreference === "Non-Vegetarian"
                  ? person.dietaryPreference
                  : "Other"
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Other") {
                  handleChange(idx, "dietaryPreference", ""); // empty initially
                } else {
                  handleChange(idx, "dietaryPreference", value);
                }
              }}
              className="step3-input"
            >
              <option value="">Select dietary preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Other">Other</option>
            </select>

            {/* If Other, show input */}
            {(
              person.dietaryPreference !== "Vegetarian" &&
              person.dietaryPreference !== "Non-Vegetarian"
            ) && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={person.dietaryPreference || ""}
                  onChange={(e) => handleChange(idx, "dietaryPreference", e.target.value)}
                  className="step3-input"
                  placeholder="Please specify your dietary preference"
                />
                <p className="note">
                  <strong>
                    <span className="red-asterisk">*</span> Note:
                  </strong>{" "}
                  The organizers will make every effort to accommodate your request; however, it cannot be guaranteed.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemovePerson(idx)}
          >
            - Remove
          </button>
        </div>
      ))}

      {/* Add New Accompanying Person Button */}
      <button
        type="button"
        className="add-person-button"
        onClick={handleAddPerson}
      >
        ➕ Add Accompanying Person
      </button>

      <div className="note-text">
        📌 <i>Accompanying persons must register separately if they wish to attend conference sessions.</i>
      </div>
    </div>
  );
};

export default Step3AccompanyingDetails;
