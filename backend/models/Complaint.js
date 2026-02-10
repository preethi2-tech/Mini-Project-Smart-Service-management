const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  registerNo: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  contactNo: { type: String, required: true },
  staffAssigned: {
  type: String,
  default: "Not Assigned",
   },

   status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  remarks: {
  type: String,
  default: "",
},

});

module.exports = mongoose.model("Complaint", complaintSchema);
