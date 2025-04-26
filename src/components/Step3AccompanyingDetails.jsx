import React from "react";
import "./Step3AccompanyingDetails.css";

const Step3AccompanyingDetails = ({ formData, updateFormData }) => {
  const accompanyingPersons = formData.accompanyingPersons || [];

  const validAccompanyingPersons = accompanyingPersons.filter(
    (person) => person.name && person.relation
  );

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
      <h2 className="step3-title">Accompanying Persons Details</h2>

      {/* Author's Dietary Preference */}
      <div className="step3-form-group">
        <label>Dietary Preference of Author</label>
        <select
          name="dietaryPreferenceAuthor"
          value={formData.dietaryPreferenceAuthor || ""}
          onChange={(e) => updateFormData({ dietaryPreferenceAuthor: e.target.value })}
          className="step3-input"
        >
          <option value="">Select dietary preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Accompanying Persons Count */}
      <div className="accompanying-summary">
        <strong>Number of Accompanying Persons:</strong> {validAccompanyingPersons.length}
      </div>

      {/* Accompanying Persons Form */}
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
              placeholder="Enter relation "
            />
          </div>

          <div className="step3-form-group">
            <label>Dietary Preference</label>
            <select
              value={person.dietaryPreference || ""}
              onChange={(e) => handleChange(idx, "dietaryPreference", e.target.value)}
              className="step3-input"
            >
              <option value="">Select dietary preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemovePerson(idx)}
          >
            Remove
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
