const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    verifyOTP
} = require("../controllers/authController");

// Signup Routes
router.get("/signup", (req, res) => {
    res.send("Signup Route Working");
});
router.post("/verify-otp", verifyOTP);

router.post("/signup", signup);

// Login Route
router.post("/login", login);

module.exports = router;