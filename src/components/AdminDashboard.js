import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminDashboard = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbstracts = async () => {
      try {
        const response = await axios.get("https://stisv.onrender.com/get-all-abstracts", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` }
        });

        const allAbstracts = [];

        (response.data.abstracts || []).forEach(entry => {
          const { uid, fullName, email, abstractSubmissions = [] } = entry;

          abstractSubmissions.forEach(abs => {
            if (abs.abstractCode) {
              allAbstracts.push({ uid, fullName, email, ...abs });
            }
          });
        });

        setAbstracts(allAbstracts);
      } catch (error) {
        console.error("Error fetching abstracts:", error);
        setError("Error fetching abstracts");
      } finally {
        setLoading(false);
      }
    };

    fetchAbstracts();
  }, []);

  const updateStatus = async (uid, abstractCode, status) => {
    try {
      const remarkText = remarks[abstractCode] || "";
      await axios.put("https://stisv.onrender.com/admin/update-abstract-status", {
        uid,
        abstractCode,
        status,
        remarks: remarkText
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` }
      });

      setAbstracts(prev =>
        prev.map(abs =>
          abs.abstractCode === abstractCode ? { ...abs, status } : abs
        )
      );
    } catch (error) {
      setError("Error updating abstract status");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h2>Admin Dashboard</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        {abstracts.length === 0 ? (
          <p className="no-data">No abstracts found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="abstract-table">
              <thead>
                <tr>
                  <th>Abstract Code</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {abstracts.map((abstract, index) => (
                  <tr key={index}>
                    <td>{abstract.abstractCode}</td>
                    <td>{abstract.title}</td>
                    <td>{abstract.firstAuthorName || abstract.presentingAuthorName}</td>
                    <td>{abstract.email}</td>
                    <td className={`status ${abstract.status?.toLowerCase() || "pending"}`}>
                      {abstract.status || "Pending"}
                    </td>
                    <td>
                      <textarea
                        className="remarks-box"
                        placeholder="Add remarks (optional)"
                        value={remarks[abstract.abstractCode] || ""}
                        onChange={(e) =>
                          setRemarks({ ...remarks, [abstract.abstractCode]: e.target.value })
                        }
                        rows={2}
                      />
                    </td>
                    <td>
                      <button
                        className="approve-button"
                        onClick={() => updateStatus(abstract.uid, abstract.abstractCode, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => updateStatus(abstract.uid, abstract.abstractCode, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminDashboard;
