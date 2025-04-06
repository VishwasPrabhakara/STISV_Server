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

        const rawData = response.data.abstracts || [];

        const latestAbstractsMap = new Map();
        rawData.forEach(entry => {
          const { uid, abstractSubmission } = entry;

          if (abstractSubmission?.abstractCode) {
            const current = latestAbstractsMap.get(uid);
            const newTimestamp = new Date(abstractSubmission.updatedAt || abstractSubmission.createdAt || entry.updatedAt || entry.createdAt);
            const oldTimestamp = current ? new Date(current.updatedAt || current.createdAt) : 0;

            if (!current || newTimestamp > oldTimestamp) {
              latestAbstractsMap.set(uid, {
                uid,
                ...abstractSubmission
              });
            }
          }
        });

        setAbstracts(Array.from(latestAbstractsMap.values()));
      } catch (error) {
        console.error("Error fetching abstracts:", error);
        setError("Error fetching abstracts");
      } finally {
        setLoading(false);
      }
    };

    fetchAbstracts();
  }, []);

  const updateStatus = async (uid, status) => {
    try {
      const remarkText = remarks[uid] || "";
      await axios.put("https://stisv.onrender.com/admin/update-abstract-status", {
        uid,
        status,
        remarks: remarkText
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` }
      });

      setAbstracts(prev =>
        prev.map(abs => (abs.uid === uid ? { ...abs, status } : abs))
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
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {abstracts.map((abstract) => (
                  <tr key={abstract.uid}>
                    <td>{abstract.abstractCode}</td>
                    <td>{abstract.title}</td>
                    <td>{abstract.firstAuthorName}</td>
                    <td className={`status ${abstract.status?.toLowerCase() || "pending"}`}>
                      {abstract.status || "Pending"}
                    </td>
                    <td>
                      <textarea
                        className="remarks-box"
                        placeholder="Add remarks (optional)"
                        value={remarks[abstract.uid] || ""}
                        onChange={(e) =>
                          setRemarks({ ...remarks, [abstract.uid]: e.target.value })
                        }
                        rows={2}
                      />
                    </td>
                    <td>
                      <button
                        className="approve-button"
                        onClick={() => updateStatus(abstract.uid, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => updateStatus(abstract.uid, "Rejected")}
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
