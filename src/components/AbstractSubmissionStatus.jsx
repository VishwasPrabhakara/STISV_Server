import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbstractSubmissionStatus.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const DEADLINE = new Date("2025-04-30T23:59:59");

const AbstractSubmissionStatus = () => {
  const [abstract, setAbstract] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [isFinalized, setIsFinalized] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedAbstract, setUpdatedAbstract] = useState({});
  const [newFile, setNewFile] = useState(null);
  const [showFinalizePopup, setShowFinalizePopup] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    const now = new Date();
    setDeadlinePassed(now > DEADLINE);

    if (!uid || !token) {
      setShowLoginMessage(true);
      setTimeout(() => {
        window.location.href = "/stis2025/login-signup";
      }, 4000);
      return;
    }

    const fetchAbstract = async () => {
      try {
        const res = await axios.get(`https://stisv.onrender.com/get-abstract/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.abstract;
        let authors = [];

        try {
          authors = Array.isArray(data.otherAuthors)
            ? data.otherAuthors
            : JSON.parse(data.otherAuthors || "[]");
        } catch {
          authors = [];
        }

        setAbstract({ ...data, otherAuthors: authors, remarks: data.remarks || "" }); // ✅ include remarks
        setUpdatedAbstract({ ...data, otherAuthors: authors, remarks: data.remarks || "" });
        setStatus(data.status || "Pending");
        setIsFinalized(data.isFinalized || false);
      } catch {
        setError("Failed to fetch abstract");
      } finally {
        setLoading(false);
      }
    };

    fetchAbstract();
  }, []);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("uid", uid);

      let hasUpdates = false;
      const fields = [
        "title", "scope", "presentingType",
        "firstAuthorName", "firstAuthorAffiliation",
        "otherAuthors", "presentingAuthorName",
        "presentingAuthorAffiliation", "mainBody"
      ];

      fields.forEach(field => {
        if (JSON.stringify(updatedAbstract[field]) !== JSON.stringify(abstract[field])) {
          formData.append(field, JSON.stringify(updatedAbstract[field]));
          hasUpdates = true;
        }
      });

      if (newFile) {
        formData.append("abstractFile", newFile);
        hasUpdates = true;
      }

      if (!hasUpdates) {
        setError("No changes detected.");
        setUpdating(false);
        return;
      }

      const res = await axios.put("https://stisv.onrender.com/update-abstract", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = res.data.abstract;
      updated.otherAuthors = Array.isArray(updated.otherAuthors)
        ? updated.otherAuthors
        : JSON.parse(updated.otherAuthors || "[]");

      setAbstract(updated);
      setUpdatedAbstract(updated);
      setEditMode(false);
      setNewFile(null);
      setError(null);
    } catch {
      setError("Error updating abstract.");
    } finally {
      setUpdating(false);
    }
  };

  const confirmFinalize = async () => {
    setFinalizing(true);
    try {
      await axios.post("https://stisv.onrender.com/finalize-abstract", { uid }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFinalized(true);
      setEditMode(false);
      setShowFinalizePopup(false);
    } catch {
      setError("Error finalizing.");
    } finally {
      setFinalizing(false);
    }
  };

  const handleFileChange = (e) => {
    if (!deadlinePassed) setNewFile(e.target.files[0]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(abstract.abstractCode);
    alert("Abstract Code copied to clipboard!");
  };

  const goHome = () => {
    window.location.href = "/stis2025/";
  };

  const formatTimestamp = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  const renderField = (label, key, type = "text", options = []) => (
    <div className="abstract-row" key={key}>
      <strong>{label}:</strong>
      {type === "textarea" ? (
        editMode && !deadlinePassed ? (
          <textarea
            value={updatedAbstract[key] || ""}
            onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [key]: e.target.value })}
          />
        ) : (
          <span>{abstract[key]}</span>
        )
      ) : type === "select" ? (
        editMode && !deadlinePassed ? (
          <select
            value={updatedAbstract[key]}
            onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [key]: e.target.value })}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <span>{abstract[key]}</span>
        )
      ) : (
        editMode && !deadlinePassed ? (
          <input
            type="text"
            value={updatedAbstract[key] || ""}
            onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [key]: e.target.value })}
          />
        ) : (
          <span>{abstract[key]}</span>
        )
      )}
    </div>
  );

  const renderOtherAuthors = () => (
    <div className="abstract-row">
      <strong>Other Authors:</strong>
      {editMode && !deadlinePassed ? (
        <div className="authors-edit-list">
          {updatedAbstract.otherAuthors?.map((author, idx) => (
            <div key={idx} className="author-edit-row">
              <input
                type="text"
                placeholder="Name"
                value={author.name}
                onChange={(e) => {
                  const newAuthors = [...updatedAbstract.otherAuthors];
                  newAuthors[idx].name = e.target.value;
                  setUpdatedAbstract({ ...updatedAbstract, otherAuthors: newAuthors });
                }}
              />
              <input
                type="text"
                placeholder="Affiliation"
                value={author.affiliation}
                onChange={(e) => {
                  const newAuthors = [...updatedAbstract.otherAuthors];
                  newAuthors[idx].affiliation = e.target.value;
                  setUpdatedAbstract({ ...updatedAbstract, otherAuthors: newAuthors });
                }}
              />
              <button onClick={() => {
                const filtered = updatedAbstract.otherAuthors.filter((_, i) => i !== idx);
                setUpdatedAbstract({ ...updatedAbstract, otherAuthors: filtered });
              }}>❌</button>
            </div>
          ))}
          {updatedAbstract.otherAuthors?.length < 5 && (
            <button
              className="add-author-button"
              onClick={() => {
                const newList = [...updatedAbstract.otherAuthors, { name: "", affiliation: "" }];
                setUpdatedAbstract({ ...updatedAbstract, otherAuthors: newList });
              }}
            >
              + Add Author
            </button>
          )}
        </div>
      ) : (
        <ul>
          {abstract.otherAuthors?.length > 0 ? (
            abstract.otherAuthors.map((a, i) => (
              <li key={i}><strong>{a.name}</strong> – {a.affiliation}</li>
            ))
          ) : (
            <li>No additional authors</li>
          )}
        </ul>
      )}
    </div>
  );

  if (showLoginMessage) {
    return (
      <>
        <Navbar />
        <div className="abstract-status-container">
          <h2>Please login to view your abstract status</h2>
          <p>Redirecting to login page...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="abstract-status-container">
        <h2>Abstract Submission Status</h2>

        {abstract && (
          <>
            <div className="abstract-row abstract-code-row">
              <strong>Abstract Code:</strong>
              <div className="abstract-code-box">
                <span className="abstract-code">{abstract.abstractCode}</span>
                <FontAwesomeIcon icon={faCopy} className="copy-icon" onClick={copyToClipboard} />
              </div>
            </div>

            {renderField("Title", "title")}
            {renderField("Theme", "scope")}
            {renderField("Mode of Presentation", "presentingType", "select", ["Oral", "Poster"])}
            {renderField("First Author Name", "firstAuthorName")}
            {renderField("First Author Affiliation", "firstAuthorAffiliation")}
            {renderOtherAuthors()}
            {renderField("Presenting Author Name", "presentingAuthorName")}
            {renderField("Presenting Author Affiliation", "presentingAuthorAffiliation")}
            {renderField("Main Body", "mainBody", "textarea")}

            <div className="abstract-row">
              <strong>Status:</strong>
              <span className={
                status === "Approved" ? "status-accepted" :
                status === "Rejected" ? "status-rejected" :
                "status-pending"
              }>
                {status}
              </span>
            </div>

            {/* ✅ REMARKS Display (if Rejected) */}
            {abstract.remarks && status === "Rejected" && (
              <div className="abstract-row">
                <strong>Remarks:</strong>
                <div className="remarks-box">{abstract.remarks}</div>
              </div>
            )}

            <div className="abstract-row">
              <strong>Abstract File:</strong>
              {abstract.abstractFile ? (
                <a href={abstract.abstractFile} target="_blank" className="download-link" rel="noopener noreferrer">Download</a>
              ) : (
                <span>No file uploaded</span>
              )}
            </div>

            {abstract.lastSubmitted && (
              <div className="abstract-row">
                <strong>Last Submitted:</strong>
                <span>{formatTimestamp(abstract.lastSubmitted)}</span>
              </div>
            )}

            {editMode && !deadlinePassed && (
              <>
                <div className="abstract-row">
                  <strong>Upload New File:</strong>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                </div>
                <div className="edit-action-row">
                  <button className="save-button" onClick={handleUpdate} disabled={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </>
            )}
            {editMode && error && <p className="error-message">{error}</p>}

            <div className="main-action-row">
              {status === "Approved" && isFinalized && (
                <>
                  <button className="pay-button" onClick={() => window.location.href = "https://www.onlinesbi.sbi/sbicollect/"}>Pay Now</button>
                  <button className="back-button" onClick={goHome}>Back to Home</button>
                </>
              )}

              {status === "Rejected" && (
                !deadlinePassed ? (
                  <>
                    <button className="submit-again-button" onClick={() => window.location.href = "/stis2025/submit-abstract"}>Resubmit Abstract</button>
                    <button className="back-button" onClick={goHome}>Back to Home</button>
                  </>
                ) : (
                  <p className="finalized-message">The deadline has passed. Please try again in the next series.</p>
                )
              )}

              {status !== "Approved" && status !== "Rejected" && !deadlinePassed && (
                <>
                  {!editMode && (
                    <button className="edit-button" onClick={() => setEditMode(true)}>Edit / Resubmit Abstract</button>
                  )}
                  <button className="finalize-button" onClick={() => setShowFinalizePopup(true)}>Submit Abstract</button>
                  <button className="back-button" onClick={goHome}>Back to Home</button>
                </>
              )}

              {status !== "Approved" && status !== "Rejected" && deadlinePassed && (
                <p className="finalized-message">The deadline has passed. Please wait for further updates.</p>
              )}
            </div>

            
          </>
        )}

        {showFinalizePopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Are you sure you want to submit?</h3>
              <p>You can still edit until April 30.</p>
              <div className="popup-buttons">
                <button className="confirm-button" onClick={confirmFinalize} disabled={finalizing}>
                  {finalizing ? "Submitting..." : "Yes, Submit"}
                </button>
                <button className="cancel-button" onClick={() => setShowFinalizePopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AbstractSubmissionStatus;
