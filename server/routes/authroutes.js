const express = require("express");

const router = express.Router();

const {

    signup

} = require("../controllers/authController");

router.post("/signup", signup);

router.get("/signup", (req, res) => {

    res.send("Signup Route Working");

});

module.exports = router;