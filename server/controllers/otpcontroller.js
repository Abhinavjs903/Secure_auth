const OTP = require("../models/OTP");
const User = require("../models/User");

const generateOTP = require("../utils/otpGenerator");
const sendOTPEmail = require("../utils/mail");

// ==============================
// SEND OTP
// ==============================

const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email already registered"

            });

        }

        // Generate OTP
        const otp = generateOTP();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Remove previous OTP if any
        await OTP.deleteMany({ email });

        // Save new OTP
        const otpData = new OTP({

            email,
            otp,
            expiresAt

        });

        await otpData.save();

        // Send email
        await sendOTPEmail(email, otp);

        res.json({

            success: true,
            message: "OTP Sent Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==============================
// VERIFY OTP
// ==============================

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const otpData = await OTP.findOne({ email });

        if (!otpData) {

            return res.status(404).json({

                success: false,
                message: "OTP not found"

            });

        }

        if (otpData.otp !== otp) {

            return res.status(400).json({

                success: false,
                message: "Invalid OTP"

            });

        }

        if (new Date() > otpData.expiresAt) {

            return res.status(400).json({

                success: false,
                message: "OTP Expired"

            });

        }

        otpData.verified = true;

        await otpData.save();

        res.json({

            success: true,
            message: "Email Verified Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==============================
// RESEND OTP
// ==============================

const resendOTP = async (req, res) => {

    try {

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    sendOTP,
    verifyOTP,
    resendOTP

};