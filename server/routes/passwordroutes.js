
const express = require("express");

const router = express.Router();

const {

    sendResetOTP,

    verifyResetOTP,

    resetPassword

} = require("../controllers/passwordcontroller");

router.post("/send-otp", sendResetOTP);

router.post("/verify-otp", verifyResetOTP);

router.post("/reset", resetPassword);

module.exports = router;