// src/pages/Student.jsx
import React, { useState, useEffect } from "react";
import { api } from "../api";
//import "./Student.css"; // optional: for extra styling

const Student = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    registerNo: "",
    type: "",
    description: "",
    date: "",
    contactNo: "",
  });

  const [success, setSuccess] = useState("");
  // Fetch all complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await api.get("/api/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/complaints", formData);
      setSuccess("Complaint submitted successfully!");
      setFormData({
        studentName: "",
        registerNo: "",
        type: "",
        description: "",
        date: "",
        contactNo: "",
      });
      fetchComplaints(); // Refresh table after submitting
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="student-page">
      {/* Welcome Box */}
      <div className="welcome-box">
        <h1>Welcome Student 👋</h1>
        <p>
          This is your student dashboard.  
          You can view complaints, track updates, and manage your requests here.
        </p>
      </div>

       {success && <p style={{ color: "green" }}>{success}</p>}
      {/* Complaint Form */}
      <form className="complaint-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registerNo"
          placeholder="Register No"
          value={formData.registerNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type of Problem"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No"
          value={formData.contactNo}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Complaint</button>
      </form>

      {/* Complaint Table */}
      <h3 className="section-title">Complaint Table</h3>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Register No</th>
            <th>Type</th>
            
            <th>Date</th>
            <th>Contact No</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td>{c.studentName}</td>
              <td>{c.registerNo}</td>
              <td>{c.type}</td>
              
              <td>{new Date(c.date).toLocaleDateString()}</td>
              <td>{c.contactNo}</td>
               {/* ✅ STATUS COLUMN */}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
