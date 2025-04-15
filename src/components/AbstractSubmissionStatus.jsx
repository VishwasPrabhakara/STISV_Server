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
  const [editMode, setEditMode] = useState(false);
  const [updatedAbstract, setUpdatedAbstract] = useState({});
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finalizing, setFinalizing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showFinalizePopup, setShowFinalizePopup] = useState(false);

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const uid = sessionStorage.getItem("uid") || localStorage.getItem("uid");
  const searchParams = new URLSearchParams(window.location.search);
  const abstractCode = searchParams.get("code");

  useEffect(() => {
    if (!uid || !token) {
      setError("Please log in to view your abstract submission status.");
      setTimeout(() => {
        window.location.href = "/stis2025/login-signup";
      }, 2000);
      setLoading(false);
      return;
    }

    const fetchAbstract = async () => {
      try {
        const url = abstractCode
          ? `https://stisv.onrender.com/get-abstract-by-code/${uid}/${abstractCode}`
          : `https://stisv.onrender.com/get-abstracts-by-user/${uid}`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const abstractData = abstractCode
          ? res.data.abstract
          : res.data.abstracts?.slice(-1)[0] || null;

        if (!abstractData) {
          setError("No abstracts submitted yet.");
        } else {
          let parsedAuthors = [];

          try {
            if (typeof abstractData.otherAuthors === "string") {
              parsedAuthors = JSON.parse(abstractData.otherAuthors);
            } else if (Array.isArray(abstractData.otherAuthors)) {
              parsedAuthors = abstractData.otherAuthors;
            }
          } catch {
            parsedAuthors = [];
          }

          const cleanData = {
            ...abstractData,
            otherAuthors: parsedAuthors || [],
          };

          setAbstract(cleanData);
          setUpdatedAbstract(cleanData);
        }
      } catch (err) {
        console.error("AxiosError", err);
        setError("Failed to load abstract.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbstract();
  }, [uid, token, abstractCode]);

  const handleFileChange = (e) => setNewFile(e.target.files[0]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("abstractCode", abstract.abstractCode);

      const fields = [
        "title", "scope", "presentingType", "firstAuthorName", "firstAuthorAffiliation",
        "presentingAuthorName", "presentingAuthorAffiliation", "mainBody"
      ];

      fields.forEach((field) => {
        if (updatedAbstract[field]) {
          formData.append(field, updatedAbstract[field]);
        }
      });

      formData.append("otherAuthors", JSON.stringify(updatedAbstract.otherAuthors || []));

      if (newFile) {
        formData.append("abstractFile", newFile);
      }

      const res = await axios.put("https://stisv.onrender.com/update-abstract", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Re-parse response
      const updated = res.data.abstract;
      const parsedAuthors = typeof updated.otherAuthors === "string"
        ? JSON.parse(updated.otherAuthors)
        : updated.otherAuthors;

      const cleanUpdated = { ...updated, otherAuthors: parsedAuthors || [] };

      setAbstract(cleanUpdated);
      setUpdatedAbstract(cleanUpdated);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update.");
    } finally {
      setUpdating(false);
    }
  };

  const confirmFinalize = async () => {
    setFinalizing(true);
    try {
      await axios.post(
        "https://stisv.onrender.com/finalize-abstract",
        { uid, abstractCode: abstract.abstractCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAbstract((prev) => ({ ...prev, isFinalized: true }));
      setShowFinalizePopup(false);
    } catch {
      setError("Finalization failed.");
    } finally {
      setFinalizing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(abstract.abstractCode);
    alert("Copied to clipboard!");
  };

  const renderField = (label, key, type = "text") => (
    <div className="abstract-row" key={key}>
      <strong>{label}:</strong>
      {editMode ? (
        type === "textarea" ? (
          <textarea value={updatedAbstract[key] || ""} onChange={(e) =>
            setUpdatedAbstract({ ...updatedAbstract, [key]: e.target.value })} />
        ) : (
          <input type={type} value={updatedAbstract[key] || ""} onChange={(e) =>
            setUpdatedAbstract({ ...updatedAbstract, [key]: e.target.value })} />
        )
      ) : (
        <span style={{ whiteSpace: "pre-line" }}>
          {abstract[key]?.length > 0 ? abstract[key] : "-"}
        </span>
      )}
    </div>
  );

  const renderOtherAuthors = () => {
    const authors = editMode ? updatedAbstract.otherAuthors : abstract.otherAuthors;
    const isArray = Array.isArray(authors);
    const safeAuthors = isArray ? authors : [];

    return (
      <div className="abstract-row">
        <strong>Other Authors:</strong>
        {editMode ? (
          <>
            <table className="authors-table">
              <thead><tr><th>Name</th><th>Affiliation</th><th>Action</th></tr></thead>
              <tbody>
                {safeAuthors.map((author, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="text"
                        value={author.name || ""}
                        onChange={(e) => {
                          const updated = [...safeAuthors];
                          updated[i].name = e.target.value;
                          setUpdatedAbstract({ ...updatedAbstract, otherAuthors: updated });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={author.affiliation || ""}
                        onChange={(e) => {
                          const updated = [...safeAuthors];
                          updated[i].affiliation = e.target.value;
                          setUpdatedAbstract({ ...updatedAbstract, otherAuthors: updated });
                        }}
                      />
                    </td>
                    <td>
                      <button onClick={() => {
                        const updated = [...safeAuthors];
                        updated.splice(i, 1);
                        setUpdatedAbstract({ ...updatedAbstract, otherAuthors: updated });
                      }} style={{ color: "red" }}>✖</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {safeAuthors.length < 5 && (
              <button className="add-author-btn" onClick={() => {
                const updated = [...safeAuthors, { name: "", affiliation: "" }];
                setUpdatedAbstract({ ...updatedAbstract, otherAuthors: updated });
              }} style={{ marginTop: "1rem" }}>+ Add Author</button>
            )}
          </>
        ) : (
          safeAuthors.length > 0 ? (
            <table className="authors-table">
              <thead><tr><th>Name</th><th>Affiliation</th></tr></thead>
              <tbody>
                {safeAuthors.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name || "-"}</td>
                    <td>{a.affiliation || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>No additional authors</span>
          )
        )}
      </div>
    );
  };

  const goHome = () => window.location.href = "/stis2025/";

  return (
    <>
      <Navbar />
      <div className="abstract-status-container">
        <h2>Abstract Submission Status</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {abstract && (
          <>
            <div className="abstract-row abstract-code-row">
              <strong>Abstract Code:</strong>
              <div className="abstract-code-box">
                <span className="abstract-code">{abstract.abstractCode}</span>
                <FontAwesomeIcon icon={faCopy} onClick={copyToClipboard} />
              </div>
            </div>

            {renderField("Title", "title")}
            {renderField("Theme", "scope")}
            {renderField("Presentation Type", "presentingType")}
            {renderField("First Author", "firstAuthorName")}
            {renderField("First Affiliation", "firstAuthorAffiliation")}
            {renderOtherAuthors()}
            {renderField("Presenting Author", "presentingAuthorName")}
            {renderField("Presenting Affiliation", "presentingAuthorAffiliation")}
            {renderField("Main Abstract", "mainBody", "textarea")}

            <div className="abstract-row">
              <strong>Status:</strong>
              <span className={
                abstract.status === "Approved" ? "status-accepted"
                  : abstract.status === "Rejected" ? "status-rejected"
                    : "status-pending"
              }>
                {abstract.status}
              </span>
            </div>

            {abstract.remarks && (
              <div className="abstract-row">
                <strong>Remarks:</strong>
                <span>{abstract.remarks}</span>
              </div>
            )}

            <div className="abstract-row">
              <strong>Abstract File:</strong>
              {abstract.abstractFile ? (
                <a href={abstract.abstractFile} target="_blank" rel="noreferrer">Download</a>
              ) : <span>No file uploaded</span>}
            </div>

            {editMode ? (
              <>
                <div className="abstract-row">
                  <strong>Upload New File:</strong>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                </div>
                <div className="edit-action-row">
                  <button onClick={handleUpdate} disabled={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <div className="main-action-row">
                <button onClick={() => setEditMode(true)}>Edit / Resubmit Abstract</button>
                {!abstract.isFinalized && (
                  <button onClick={() => setShowFinalizePopup(true)}>Submit Abstract</button>
                )}
                <button onClick={goHome}>Back to Home</button>
              </div>
            )}

            {showFinalizePopup && (
              <div className="popup-overlay">
                <div className="popup">
                  <h3>Submit Abstract?</h3>
                  <p>You can still edit until April 30.</p>
                  <button onClick={confirmFinalize} disabled={finalizing}>
                    {finalizing ? "Submitting..." : "Yes, Submit"}
                  </button>
                  <button onClick={() => setShowFinalizePopup(false)}>Cancel</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default AbstractSubmissionStatus;
