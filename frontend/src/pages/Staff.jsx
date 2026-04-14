import React, { useEffect, useState } from "react";
import { api } from "../api";

const Staff = () => {
  const [complaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [updateData, setUpdateData] = useState({
    complaintId: "",
    staffAssigned: "",
    remarks: "",
  });

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchAssignedComplaints();
    fetchResolvedComplaints();
  }, []);

  // Fetch Assigned Complaints
  const fetchAssignedComplaints = async () => {
    try {
      const res = await api.get("/api/complaints/assigned");

      const inProgress = res.data.filter(
        (c) => c.status === "In Progress"
      );

      setComplaints(inProgress);
    } catch (error) {
      console.error("Error fetching staff complaints", error);
    }
  };

  // Fetch Completed Complaints
  const fetchResolvedComplaints = async () => {
    try {
      const res = await api.get("/api/complaints");

      const completed = res.data.filter(
        (c) =>
          c.status === "Completed" &&
          c.staffAssigned &&
          c.remarks
      );

      setResolvedComplaints(completed);
    } catch (error) {
      console.error("Error fetching resolved complaints", error);
    }
  };

  /* ================= UPDATE ================= */

  const handleUpdateChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/api/complaints/update/${updateData.complaintId}`,
        {
          remarks: updateData.remarks,
          staffAssigned: updateData.staffAssigned,
          status: "Completed",
        }
      );

      alert("Complaint marked as completed ✅");

      setUpdateData({
        complaintId: "",
        staffAssigned: "",
        remarks: "",
      });

      setSelectedComplaint(null);

      fetchAssignedComplaints();
      fetchResolvedComplaints();
    } catch (error) {
      console.error("Error updating complaint", error);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={{ padding: "10px" }}>

      {/* Welcome */}
      <div className="welcome-box1">
        <h1>Welcome Staff 👋</h1>
        <p>View and resolve assigned student complaints.</p>
      </div>

      {/* ================= ASSIGNED TABLE ================= */}

      <div className="section-card">

        <h3 className="section-title">
          Assigned Complaints (In Progress)
        </h3>

        <table className="complaint-table">

          <thead style={{ background: "#1f3c88", color: "white" }}>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Problem</th>
              
              <th>Date</th>
              <th>Contact No</th>
              <th>Assigned Staff</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No In-Progress complaints
                </td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.studentName}</td>
                  <td>{c.registerNo}</td>
                  <td>{c.type}</td>
                  
                  <td>{new Date(c.date).toLocaleDateString()}</td>
                  <td>{c.contactNo}</td>
                  <td>{c.staffAssigned}</td>

                  <td>
                    <span className="status-badge status-inprogress">
                      In Progress
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* ================= RESOLVE FORM ================= */}

      <div className="section-card">

        <h3 style={{ marginTop: "30px" }}>
          Resolve Complaint
        </h3>

        <form
          onSubmit={handleUpdateSubmit}
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

          {/* Complaint Select */}

          <select
            name="complaintId"
            value={updateData.complaintId}
            onChange={(e) => {

              const selected = complaints.find(
                (c) => c._id === e.target.value
              );

              setSelectedComplaint(selected);

              setUpdateData({
                complaintId: e.target.value,
                staffAssigned: selected?.staffAssigned || "",
                remarks: "",
              });

            }}
            required
          >

            <option value="">
              Select Complaint
            </option>

            {complaints.map((c) => (
              <option key={c._id} value={c._id}>
                {c.studentName} - {c.registerNo}
              </option>
            ))}

          </select>


          {/* Complaint Details Box */}

          {selectedComplaint && (

            <div
              style={{
                width: "100%",
                background: "#f5f7fb",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "10px",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "10px",
              }}
            >

              <div>
                <b>Student Name :</b>{" "}
                {selectedComplaint.studentName}
              </div>

              <div>
                <b>Roll No :</b>{" "}
                {selectedComplaint.registerNo}
              </div>

              <div>
                <b>Problem :</b>{" "}
                {selectedComplaint.type}
              </div>

              <div>
                <b>Description :</b>{" "}
                {selectedComplaint.description}
              </div>

            </div>

          )}


          {/* Staff Assigned */}

          <input
            type="text"
            value={updateData.staffAssigned}
            readOnly
            placeholder="Staff Assigned"
          />


          {/* Remarks */}

          <input
            type="text"
            name="remarks"
            placeholder="Remarks / Work Done"
            value={updateData.remarks}
            onChange={handleUpdateChange}
            required
            style={{ flex: "1" }}
          />


          {/* Submit */}

          <button
            type="submit"
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Mark Completed
          </button>

        </form>

      </div>


      {/* ================= SUMMARY TABLE ================= */}

      <div className="section-card">

        <h3 style={{ marginTop: "40px" }}>
          Complaint Resolution Summary
        </h3>

        <table className="complaint-table">

          <thead style={{ background: "#1f3c88", color: "white" }}>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Problem</th>
              <th>Staff Assigned</th>
              <th>Remarks</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {resolvedComplaints.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No completed complaints
                </td>
              </tr>
            ) : (
              resolvedComplaints.map((c) => (
                <tr key={c._id}>

                  <td>{c.studentName}</td>

                  <td>{c.registerNo}</td>

                  <td>{c.type}</td>

                  <td>{c.staffAssigned}</td>

                  <td>{c.remarks}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        background: "green",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Completed
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

export default Staff;