import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [assignData, setAssignData] = useState({
    complaintId: "",
    staffAssigned: "",
  });

  /* ================= FETCH ================= */
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ================= FILTERS ================= */
  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  );

  const assignedComplaints = complaints.filter(
    (c) => c.status === "In Progress" || c.status === "Completed"
  );

  /* ================= ASSIGN STAFF ================= */
  const handleAssignChange = (e) => {
    setAssignData({ ...assignData, [e.target.name]: e.target.value });
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${assignData.complaintId}/assign`,
        { staffAssigned: assignData.staffAssigned }
      );

      alert("Staff assigned successfully ✅");
      setAssignData({ complaintId: "", staffAssigned: "" });
      fetchComplaints();
    } catch (error) {
      console.error("Error assigning staff:", error);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={{ padding: "10px" }}>
      {/* Welcome */}
      <div className="welcome-box1">
        <h1>Welcome Admin 👋</h1>
        <p>Manage student complaints and staff assignments</p>
      </div>

      {/* ================= PENDING COMPLAINTS ================= */}
      <div className="section-card">
        <h2 className="section-title">Pending Complaints</h2>

        <table className="complaint-table">
          <thead style={{ background: "#1f3c88", color: "white" }}>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Problem</th>
              
              <th>Date</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {pendingComplaints.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No pending complaints
                </td>
              </tr>
            ) : (
              pendingComplaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.studentName}</td>
                  <td>{c.registerNo}</td>
                  <td>{c.type}</td>
                  
                  <td>{new Date(c.date).toLocaleDateString()}</td>
                  <td>{c.contactNo}</td>
                  <td><span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "14px",
                        color: "white",
                        background:
                          c.status === "In Progress"
                            ? "blue"
                            : "orange",
                      }}
                    >
                      {c.status}
                    </span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= ASSIGN STAFF ================= */}
      <div className="section-card">
        <h2 className="section-title">Assign Staff (Pending Only)</h2>

        <form
          className="assign-form"
          onSubmit={handleAssignSubmit}
           style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
        >
          <select
            name="complaintId"
            value={assignData.complaintId}
            onChange={handleAssignChange}
            required
          >
            <option value="">Select Complaint</option>
            {pendingComplaints.map((c) => (
              <option key={c._id} value={c._id}>
                {c.studentName} - {c.registerNo}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="staffAssigned"
            placeholder="Staff Name"
            value={assignData.staffAssigned}
            onChange={handleAssignChange}
            required
          />

          <button type="submit">Assign</button>
        </form>
      </div>

      {/* ================= ASSIGNED / COMPLETED ================= */}
      <div className="section-card">
        <h2 className="section-title">Staff Assigned & Completed</h2>

        <table className="complaint-table">
          <thead style={{ background: "#1f3c88", color: "white" }}>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Problem</th>
              <th>Staff Assigned</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {assignedComplaints.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No assigned complaints
                </td>
              </tr>
            ) : (
              assignedComplaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.studentName}</td>
                  <td>{c.registerNo}</td>
                  <td>{c.type}</td>
                  <td>{c.staffAssigned}</td>
                  <td>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "14px",
                        color: "white",
                        background:
                          c.status === "In Progress"
                            ? "blue"
                            : "green",
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
