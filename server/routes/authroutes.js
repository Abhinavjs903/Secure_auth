const express = require("express");

const router = express.Router();

const {
    signup,
    login
} = require("../controllers/authController");

// Signup Routes
router.get("/signup", (req, res) => {
    res.send("Signup Route Working");
});

router.post("/signup", signup);

// Login Route
router.post("/login", login);

module.exports = router;