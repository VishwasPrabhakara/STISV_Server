import React, { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "./Step1PersonalDetails.css";

countries.registerLocale(enLocale);

const Step1PersonalDetails = ({ formData, updateFormData }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDietary, setOtherDietary] = useState("");

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

  useEffect(() => {
    // 🛑 When loading from DB, decide if Other input should be shown
    if (
      formData.dietaryPreferenceAuthor &&
      formData.dietaryPreferenceAuthor !== "Vegetarian" &&
      formData.dietaryPreferenceAuthor !== "Non-Vegetarian"
    ) {
      setShowOtherInput(true);
      setOtherDietary(formData.dietaryPreferenceAuthor);
    }
  }, [formData.dietaryPreferenceAuthor]);

  return (
    <div className="step1-container">
      <h2 className="step1-title">Author Details</h2>

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

        {/* First Name */}
        <div className="step1-form-group">
        <label htmlFor="givenName">First Name</label>
        <input
          type="text"
          id="givenName"
          name="givenName"
          value={formData.givenName || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your first name"
        />
      </div>

      {/* Last Name */}
      <div className="step1-form-group">
        <label htmlFor="familyName">Last Name</label>
        <input
          type="text"
          id="familyName"
          name="familyName"
          value={formData.familyName || ""}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your last name"
        />
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
          value={formatPhoneDisplay(formData.phone, formData.country)}
          onChange={handleChange}
          className="step1-input"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="step1-form-group">
        <label htmlFor="dietary">Dietary Preference of Author</label>
        <select
          id="dietaryPreferenceAuthor"
          name="dietaryPreferenceAuthor"
          value={
            showOtherInput ? "Other" : (formData.dietaryPreferenceAuthor || "")
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value === "Other") {
              setShowOtherInput(true);
              setOtherDietary(""); // reset
              updateFormData({ dietaryPreferenceAuthor: "" }); // empty initially
            } else {
              setShowOtherInput(false);
              updateFormData({ dietaryPreferenceAuthor: value });
            }
          }}
          className="step1-input"
        >
          <option value="">Select dietary preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Other">Other</option>
        </select>

        {showOtherInput && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={otherDietary}
              onChange={(e) => {
                const val = e.target.value;
                setOtherDietary(val);
                updateFormData({ dietaryPreferenceAuthor: val });
              }}
              className="step1-input"
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
