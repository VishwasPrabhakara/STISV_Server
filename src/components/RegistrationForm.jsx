import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Step1PersonalDetails from "./Step1PersonalDetails";
import Step2AbstractDetails from "./Step2AbstractDetails";
import Step3AccompanyingDetails from "./Step3AccompanyingDetails";
import Step4PaymentSelection from "./Step4PaymentSelection";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./RegistrationForm.css";

const API_BASE_URL = "https://stisv.onrender.com";
const steps = ["Author Details", "Abstract Details", "Accompanying Person", "Payment"];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [abstractsError, setAbstractsError] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    givenName: "",
    familyName: "",
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    country: "",
    zipcode: "",
    dietaryPreferenceAuthor: "",
    accompanyingPersons: [],
    selectedCategory: "",
    selectedCategoryDetails: {
      totalAmount: 0,
      categories: [],
    },
    abstractSubmissions: [],
  });

  useEffect(() => {
    const storedUid = sessionStorage.getItem("uid");
    if (!storedUid) {
      window.location.href = `/stis2025/login-signup?redirect=/stis2025/registration-form`;
    } else {
      fetchUserInfo(storedUid);
    }
  }, []);

  const fetchUserInfo = async (uid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-info/${uid}`);
      if (response.data) {
        setFormData(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.error("❌ Error fetching user info:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (updatedFields) => {
    try {
      const storedUid = sessionStorage.getItem("uid");
      if (!storedUid) return;
      await axios.put(`${API_BASE_URL}/user-info/update/${storedUid}`, updatedFields);
    } catch (error) {
      console.error("❌ Error updating user info:", error.message);
    }
  };

  const nextStep = async () => {
    if (abstractsError && step === 1) {
      alert("❌ Please ensure each abstract has a different Presenting Author.");
      return;
    }
    if (step < steps.length - 1) {
      await updateUserInfo(formData);
      setStep(prev => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmitFinalForm = async () => {
    try {
      const storedUid = sessionStorage.getItem("uid");
      if (!storedUid) {
        console.error("User ID missing. Cannot submit.");
        return;
      }
      await updateUserInfo(formData);
      alert("✅ Registration Form Saved Successfully!");
      navigate("/stis2025/payment");
    } catch (error) {
      console.error("❌ Error submitting final form:", error.message);
      alert("❌ Submission failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="registration-form-container">
        <div className="step-indicator">
          {steps.map((s, idx) => (
            <div key={idx} className={`step ${idx === step ? "active" : ""}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="form-content">
          {step === 0 && (
            <Step1PersonalDetails
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 1 && (
            <Step2AbstractDetails
              formData={formData}
              updateFormData={updateFormData}
              setAbstractsError={setAbstractsError}
            />
          )}
          {step === 2 && (
            <Step3AccompanyingDetails
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 3 && (
            <Step4PaymentSelection
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
        </div>

        <div className="form-navigation">
          {step > 0 && (
            <button className="nav-button" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < steps.length - 1 ? (
            <button className="nav-button" onClick={nextStep}>
              Next
            </button>
          ) : (
            showConfirmation && (
              <button className="nav-button" onClick={handleSubmitFinalForm}>
                Final Submit
              </button>
            )
          )}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default RegistrationForm;
