const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");

console.log("authRoutes 👉", authRoutes);

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

app.use("/api/auth", authRoutes);
const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api/complaints", complaintRoutes);
app.use("/api/complaints", require("./routes/complaintRoutes"));



// DB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
