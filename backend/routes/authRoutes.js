const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login success" });
  } catch (err) {
    console.error("LOGIN ERROR ❌", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;   // 🔥 MUST BE THIS
