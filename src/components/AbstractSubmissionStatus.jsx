import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AbstractSubmissionStatus.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

// Deadline for finalization (May 31, 2025 11:59:59 PM)
const DEADLINE = new Date("2025-05-31T23:59:59");

const AbstractSubmissionStatus = () => {
  const [abstract, setAbstract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finalizing, setFinalizing] = useState(false);
  const [showFinalizedMessage, setShowFinalizedMessage] = useState(false);

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const abstractCodeParam = searchParams.get("code");

  // Fetch abstract (latest by user or by code), then force‐finalize if past deadline
  useEffect(() => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    const isLoggedIn = uid && token;

    if (!isLoggedIn) {
      setLoading(false);
      setError("Please log in to view your abstract submission status.");
      setTimeout(() => {
        navigate("/login-signup?redirect=/stis2025/abstract-submission-status");
      }, 2500);
      return;
    }

    const fetchAbstract = async () => {
      try {
        const url = abstractCodeParam
          ? `https://stisv.onrender.com/get-abstract-by-code/${uid}/${abstractCodeParam}`
          : `https://stisv.onrender.com/get-abstracts-by-user/${uid}`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If a specific code was requested, res.data.abstract will hold one object.
        // Otherwise, grab the last‐submitted one from res.data.abstracts.
        const fetched = abstractCodeParam
          ? res.data.abstract
          : res.data.abstracts?.slice(-1)[0] || null;

        if (!fetched) {
          setError("No abstracts submitted yet.");
          setLoading(false);
          return;
        }

        setAbstract(fetched);
        setLoading(false);
      } catch (err) {
        console.error("AxiosError", err);
        if (err.response?.status === 401) {
          setError("Please log in to view your abstract submission status.");
          setTimeout(() => {
            navigate("/login-signup?redirect=/stis2025/abstract-submission-status");
          }, 2500);
        } else {
          setError("Failed to load abstract.");
        }
        setLoading(false);
      }
    };

    fetchAbstract();
  }, [abstractCodeParam, navigate]);

  // Once we have `abstract`, if the deadline has passed and it's not finalized, finalize automatically
  useEffect(() => {
    if (!abstract) return;

    const now = new Date();
    if (now <= DEADLINE) {
      // Still before or exactly at deadline—do nothing.
      return;
    }

    // If past deadline and not yet finalized, send finalize request once.
    if (!abstract.isFinalized) {
      const autoFinalize = async () => {
        setFinalizing(true);
        try {
          const uid = localStorage.getItem("uid");
          const token = localStorage.getItem("token");

          await axios.post(
            "https://stisv.onrender.com/finalize-abstract",
            { uid, abstractCode: abstract.abstractCode },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Locally mark as finalized
          setAbstract((prev) => ({ ...prev, isFinalized: true }));
          setShowFinalizedMessage(true);
        } catch (err) {
          console.error("Auto‐finalize error:", err);
          // (We choose not to set a user‐facing error here—backend could already be finalized.)
        } finally {
          setFinalizing(false);
        }
      };

      autoFinalize();
    }
  }, [abstract]);

  // Copy code to clipboard
  const copyToClipboard = () => {
    if (abstract?.abstractCode) {
      navigator.clipboard.writeText(abstract.abstractCode);
      alert("Copied to clipboard!");
    }
  };

  // “Back to Home” button
  const goHome = () => {
    window.location.href = "/stis2025/";
  };

  return (
    <>
      <Navbar />

      <div className="abstract-status-container">
        <h2>Abstract Submission Status</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {abstract && (
          <>
            {/* Abstract Code + Copy Icon */}
            <div className="abstract-row abstract-code-row">
              <strong>Abstract Code:</strong>
              <div className="abstract-code-box">
                <span className="abstract-code">{abstract.abstractCode}</span>
                <FontAwesomeIcon icon={faCopy} onClick={copyToClipboard} />
              </div>
            </div>

            {/* Title, Theme, Presentation Type, etc. */}
            <div className="abstract-row">
              <strong>Title:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.title || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>Theme:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.scope || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>Presentation Type:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.presentingType || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>First Author:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.firstAuthorName || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>First Affiliation:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.firstAuthorAffiliation || "-"}
              </span>
            </div>

            {/* Other Authors (always read‐only) */}
            <div className="abstract-row">
              <strong>Other Authors:</strong>
              {Array.isArray(abstract.otherAuthors) && abstract.otherAuthors.length > 0 ? (
                <table className="authors-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Affiliation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abstract.otherAuthors.map((a, i) => (
                      <tr key={i}>
                        <td>{a.name || "-"}</td>
                        <td>{a.affiliation || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <span>No additional authors</span>
              )}
            </div>

            <div className="abstract-row">
              <strong>Presenting Author:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.presentingAuthorName || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>Presenting Affiliation:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.presentingAuthorAffiliation || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>Main Abstract:</strong>
              <span style={{ whiteSpace: "pre-line" }}>
                {abstract.mainBody || "-"}
              </span>
            </div>

            <div className="abstract-row">
              <strong>Status:</strong>
              <span
                className={
                  abstract.status === "Approved"
                    ? "status-accepted"
                    : abstract.status === "Rejected"
                    ? "status-rejected"
                    : "status-pending"
                }
              >
                {abstract.status}
              </span>
            </div>

            {abstract.remarks && (
              <div className="abstract-row">
                <strong>Remarks:</strong>
                <span>{abstract.remarks}</span>
              </div>
            )}

            {/* Show success message if auto‐finalized */}
            {showFinalizedMessage && (
              <div className="success-message">
                ✅ Your abstract has been successfully submitted. Our team is reviewing your abstract and will get back to you with an update by June 25th, 2025.
              </div>
            )}

            <div className="abstract-row">
              <strong>Abstract File:</strong>
              {abstract.abstractFile ? (
                <a href={abstract.abstractFile} target="_blank" rel="noreferrer">
                  Download
                </a>
              ) : (
                <span>No file uploaded</span>
              )}
              <span> (Open the downloaded file in .docx format.)</span>
            </div>

            {/* 
              === REMOVED ===
              • “Edit / Resubmit Abstract” button 
              • Manual “Submit Abstract” button 
              Since all abstracts are now automatically finalized past the deadline. 
            */}

            <div className="main-action-row">
              <button onClick={goHome}>Back to Home</button>
            </div>
          </>
        )}
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
};

export default AbstractSubmissionStatus;
