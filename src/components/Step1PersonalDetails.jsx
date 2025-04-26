import React, { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "./Step1PersonalDetails.css";

countries.registerLocale(enLocale);

const Step1PersonalDetails = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const formatPhoneDisplay = (rawPhone, userCountryName = "India") => {
    if (!rawPhone) return "";
    const isoCode = countries.getAlpha2Code(userCountryName, "en") || "IN";
    const phoneNumber = parsePhoneNumberFromString(rawPhone, isoCode);
    return phoneNumber && phoneNumber.isValid()
      ? phoneNumber.formatInternational()
      : rawPhone;
  };

  return (
    <div className="step1-container">
      <h2 className="step1-title">Personal Details</h2>

      <div className="step1-form-group">
        <label htmlFor="title">Title</label>
        <select
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="step1-input"
        >
          <option value="">Select Title</option>
          <option value="Dr.">Dr.</option>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Prof.">Prof.</option>
        </select>
      </div>

      <div className="step1-form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your full name"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your email"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formatPhoneDisplay(formData.phone, formData.country)} // ✅ Display formatted, but save normally
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="affiliation">Affiliation</label> {/* Affiliation instead of Designation */}
        <input
          type="text"
          id="affiliation"
          name="affiliation"
          value={formData.affiliation || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your affiliation"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your address"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your country"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your zipcode"
        />
      </div>
    </div>
  );
};

export default Step1PersonalDetails;
