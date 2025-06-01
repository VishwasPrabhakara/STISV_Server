// StudentDocsUpload.jsx
import React, { useState, useMemo } from "react";
import axios from "axios";
import "./StudentDocsUpload.css";

const API_BASE_URL = "https://stisv.onrender.com";

const StudentDocsUpload = ({ categories, onUploadDone }) => {
  // build an initial empty map for each category
  const initialFiles = useMemo(() =>
    categories.reduce((acc, cat) => {
      acc[cat] = { idFile: null, bonafideFile: null };
      return acc;
    }, {}), [categories]
  );

  const [filesByCat, setFilesByCat] = useState(initialFiles);
  const [results, setResults]       = useState([]);
  const [uploading, setUploading]   = useState(false);
  const [error, setError]           = useState("");

  // clear everything so form comes back
  const handleEdit = () => {
    setResults([]);
    setError("");
    setFilesByCat(initialFiles);
  };

  // handle selecting files
  const handleFileChange = (cat, field) => e => {
    setFilesByCat(f => ({
      ...f,
      [cat]: { ...f[cat], [field]: e.target.files[0] }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setResults([]);

    // validate
    for (let cat of categories) {
      const { idFile, bonafideFile } = filesByCat[cat];
      if (!idFile || !bonafideFile) {
        setError(`Please upload both files for "${cat}".`);
        return;
      }
    }

    // build FormData
    const formData = new FormData();
    const catList = [];
    categories.forEach(cat => {
      formData.append("docs", filesByCat[cat].idFile);
      formData.append("docs", filesByCat[cat].bonafideFile);
      catList.push(cat, cat);
    });
    formData.append("categories", JSON.stringify(catList));

    try {
      setUploading(true);
      const res = await axios.post(
        `${API_BASE_URL}/api/upload-student-docs`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResults(res.data.uploaded);
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // if uploaded, show results + Edit / Continue
  if (results.length) {
    return (
      <div className="student-upload-container">
        <h2>Uploaded Successfully:</h2>
        <ul className="upload-results">
          {results.map((u, i) => (
            <li key={i}>
              <strong>{u.category}:</strong>{" "}
              <a href={u.url} target="_blank" rel="noopener noreferrer">
                View Document #{i + 1}
              </a>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="edit-button" onClick={handleEdit}>
            Edit Documents
          </button>
          <button
            className="continue-button"
            onClick={() => {
              sessionStorage.setItem("studentUploadDone", "true");
              onUploadDone();
            }}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }

  // else render the upload form
  return (
    <div className="student-upload-container">
     
      <form onSubmit={handleSubmit} className="student-upload-form">
        {categories.map(cat => (
          <fieldset className="category-block" key={cat}>
            <legend>{cat}</legend>

            <label>
              Student ID ({cat}):
              <input
                type="file"
                accept=".doc,.docx,image/jpeg,image/png"
                onChange={handleFileChange(cat, "idFile")}
                required
              />
            </label>

            <label>
              Bonafide Certificate ({cat}):
              <input
                type="file"
                accept=".doc,.docx,image/jpeg,image/png"
                onChange={handleFileChange(cat, "bonafideFile")}
                required
              />
            </label>
          </fieldset>
        ))}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading…" : "Submit Documents"}
        </button>
      </form>
    </div>
  );
};

export default StudentDocsUpload;
