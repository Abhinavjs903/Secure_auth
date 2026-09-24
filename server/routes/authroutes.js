const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    getLoginHistory
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Test Route
router.get("/signup", (req, res) => {
    res.send("Signup Route Working");
});

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);
// Login Activity Route
router.get("/login-history", authMiddleware, getLoginHistory);

module.exports = router;