import React, { useEffect, useState } from "react";
import { api } from "../api";

const Home = () => {
  const [complaints, setComplaints] = useState([]);

  // 🔹 Fetch complaints from database
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/api/complaints");
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  // 🔹 Status counts
  const completedCount = complaints.filter(
    (c) => c.status === "Completed"
  ).length;

  const progressCount = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const pendingCount = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const total = complaints.length || 1;

  const completedPercent = Math.round((completedCount / total) * 100);
  const progressPercent = Math.round((progressCount / total) * 100);
  const pendingPercent = Math.round((pendingCount / total) * 100);

  return (
    <div className="dashboard">
      {/* ✅ Welcome Box */}
      <div className="welcome-box1">
        <h1>Smart Service Management</h1>
        <p className="welcome-text">
          Welcome! Manage and track service complaints efficiently.
        </p>
      </div>

      {/* ✅ Status Summary Boxes */}
      <div className="status-box-container">
        <div className="status-box completed-box">
          <h4>Completed</h4>
          <p>{completedPercent}%</p>
        </div>

        <div className="status-box progress-box">
          <h4>In Progress</h4>
          <p>{progressPercent}%</p>
        </div>

        <div className="status-box pending-box">
          <h4>Pending</h4>
          <p>{pendingPercent}%</p>
        </div>
      </div>

      {/* ✅ Stats Section */}
      <div className="stats-container">
        {/* Pie Chart Placeholder */}
        <div className="card">
          <h3>Task Completion Chart</h3>
            <div
              className="pie-placeholder"
              style={{
                background: `conic-gradient(
                  #16a34a 0% ${completedPercent}%,
                  #2563eb ${completedPercent}% ${completedPercent + progressPercent}%,
                  #f59e0b ${completedPercent + progressPercent}% 100%
                )`,
              }}
            >
              {completedPercent}%
            </div>


          <ul className="legend">
            <li><span className="dot green"></span> Completed</li>
            <li><span className="dot blue"></span> In Progress</li>
            <li><span className="dot orange"></span> Pending</li>
          </ul>
        </div>

        {/* Summary Table */}
        <div className="card">
          <h3>Task Summary</h3>
          <table className="task-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Completed</td>
                <td>{completedCount}</td>
              </tr>
              <tr>
                <td>In Progress</td>
                <td>{progressCount}</td>
              </tr>
              <tr>
                <td>Pending</td>
                <td>{pendingCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Student Complaints Table */}
      <div className="table-card">
        <h3>Student Complaints</h3>

        <table className="complaint-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Problem</th>
              
              <th>Staff Assigned</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No complaints found
                </td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.studentName}</td>
                  <td>{c.registerNo}</td>
                  <td>{c.type}</td>
                  
                  <td>{c.staffAssigned || "-"}</td>
                  <td>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "14px",
                        fontWeight: "600",
                        color: "white",
                        backgroundColor:
                          c.status === "Pending"
                            ? "orange"
                            : c.status === "In Progress"
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

export default Home;
