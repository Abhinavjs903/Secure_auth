const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, (req, res) => {

    res.json({

        success: true,

        message: "Welcome to Dashboard",

        user: req.user

    });

});

module.exports = router;