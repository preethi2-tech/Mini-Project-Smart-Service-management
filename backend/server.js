const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Middleware
const defaultOrigins = [
  "http://localhost:5173",
  "https://smart-frontend-kqm8.onrender.com",
];

const allowedOrigins = [
  ...defaultOrigins,
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
    : []),
].filter(Boolean);

const corsOptions = allowedOrigins.length
  ? {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS policy blocked origin: ${origin}`));
        }
      },
      credentials: true,
    }
  : {
      origin: true,
      credentials: true,
    };

app.use(cors(corsOptions));
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

// Debug log (optional)
console.log("authRoutes 👉", typeof authRoutes);

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Smart Service Management Backend Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});