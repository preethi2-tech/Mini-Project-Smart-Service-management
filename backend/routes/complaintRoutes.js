const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// POST new complaint
router.post("/", async (req, res) => {
  console.log("🚀 POST /api/complaints called");
  console.log("📦 Request body:", req.body);

  try {
    const complaint = new Complaint({
      ...req.body,
      date: new Date(req.body.date), // ✅ FIX
    });

    const saved = await complaint.save();
    console.log("✅ Complaint saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving complaint:", err);
    res.status(400).json({ message: err.message });
  }
});


// GET all complaints
router.get("/", async (req, res) => {
  console.log("GET /api/complaints called");
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE staff assignment
router.put("/:id/assign", async (req, res) => {
  try {
    const { staffAssigned } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        staffAssigned,
        status: "In Progress", // auto change status
      },
      { new: true }
    );

    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ GET all assigned complaints (Staff Page)
router.get("/assigned", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      staffAssigned: { 
        $exists: true,
        $nin: ["", "Not Assigned", null]
      }
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* ===== UPDATE COMPLAINT BY STAFF ===== */
router.put("/update/:id", async (req, res) => {
  try {
    const { remarks, status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        remarks: remarks,
        status: status,
      },
      { new: true }
    );

    res.json(updatedComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});



module.exports = router;
