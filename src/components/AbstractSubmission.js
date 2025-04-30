import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AbstractSubmission.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AbstractSubmission = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const uid = sessionStorage.getItem('uid');

    if (token && uid) {
      setIsAuthenticated(true);
      axios
        .get(`https://stisv.onrender.com/get-abstracts-by-user/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAbstracts(res?.data?.abstracts || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching abstracts:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleRedirect = () => navigate('/contact');

  const handleSubmitRedirect = () => {
    if (isAuthenticated) {
      navigate('/submit-abstract');
    } else {
      setErrorMessage('Please log in before submitting an abstract.');
      setTimeout(() => navigate('/login-signup'), 2000);
    }
  };

  const handleRegisterRedirect = () => {
    if (isAuthenticated) {
      navigate('/registration-form');
    } else {
      setErrorMessage('Please log in before registering for the conference.');
      setTimeout(() => {
        navigate('/login-signup?redirect=/registration-form');
      }, 2000);
    }
  };

  const handleViewStatus = (abstractCode) => {
    navigate(`/abstract-submission-status?code=${abstractCode}`);
  };

  return (
    <>
      <Navbar />
      <div className='abstract-submission'>
        <div className="marquee-banner" onClick={handleSubmitRedirect}>
          <div className="marquee-text">
            Abstract Submission Open! — Submit before May 31, 2025 — Click here to submit your abstract now!
          </div>
        </div>

        <div className="abstract-submission-wrapper">
          {/* === Header === */}
          <header className="abstract-header">
            <h1>Abstract Submission</h1>
            <p className="abstract-description">
              Submit your abstract aligned with the conference themes.
            </p>
          </header>

          <div className="note-box">
            <strong>Note: One registered author can present only one paper/poster</strong>
          </div>

          {/* === Abstract Actions === */}
          <section className="abstract-actions">
            {isAuthenticated && (
              <>
                <h2 className="section-subtitle">Your Submissions</h2>

                {loading ? (
                  <p>Loading your abstracts...</p>
                ) : abstracts.length > 0 ? (
                  <>
                    <ul className="submitted-abstracts-list">
                      {abstracts.map((abs, index) => (
                        <li key={index} className="abstract-entry">
                          <strong>{abs.title || `Abstract ${index + 1}`}</strong><br />
                          Code: <code>{abs.abstractCode}</code><br />
                          <button
                            className="btn btn-primary small"
                            onClick={() => handleViewStatus(abs.abstractCode)}
                          >
                            View Abstract Status
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>You have not submitted any abstracts yet.</p>
                )}
              </>
            )}

            {/* This part always visible */}
            <h2>Kindly submit your abstract in accordance with the provided abstract template.</h2>
            <div className="button-group center-buttons">
              <button className="btn btn-primary" onClick={handleSubmitRedirect}>
                Submit Abstract Now
              </button>
              <button className="btn btn-primary" onClick={handleRegisterRedirect}>
                Proceed to Payment
              </button>
              <a
                className="btn btn-secondary"
                href="/stis2025/assets/Abstract-Template.docx"
                download
              >
                Download Abstract Template
              </a>
            </div>

            {errorMessage && <p className="error-message centered-text">{errorMessage}</p>}
          </section>

          {/* === Additional Info Sections === */}
          <div className="submission-info-sections">
            <section className="abstract-instructions">
              <h2 className="section-subtitle">Instructions to Authors</h2>
              <ul>
                <li>🔹 Abstracts must be within <strong>250 words</strong>.</li>
                <li>🔹 Provide full contact details and affiliations.</li>
                <li>🔹 All abstracts will undergo peer review.</li>
                <li>🔹 Use only the official template provided.</li>
              </ul>
              <a
                href="/stis2025/assets/Abstract-Template.docx"
                className="template-download"
                download
              >
                Download Abstract Template
              </a>
            </section>

            <section className="abstract-contact">
              <h2 className="section-subtitle">Need Help?</h2>
              <p>
                For submission-related queries, contact us at: <br />
                <a href="mailto:stis.mte@iisc.ac.in" className="email-link">
                  stis.mte@iisc.ac.in
                </a>
                <br /> or <br />
                <button className="btn btn-primary" onClick={handleRedirect}>
                  Contact Us
                </button>
              </p>
            </section>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AbstractSubmission;
