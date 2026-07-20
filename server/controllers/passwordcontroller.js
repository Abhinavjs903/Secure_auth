const User = require("../models/User");
const OTP = require("../models/OTP");

const bcrypt = require("bcrypt");

const generateOTP = require("../utils/otpGenerator");
const sendOTPEmail = require("../utils/mail");

// ==============================
// SEND RESET OTP
// ==============================

const sendResetOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const otp = generateOTP();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.deleteMany({ email });

        await OTP.create({

            email,

            otp,

            expiresAt,

            verified: false

        });

        await sendOTPEmail(email, otp);

        res.json({

            success: true,

            message: "OTP sent successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// VERIFY RESET OTP
// ==============================

const verifyResetOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {

            return res.status(400).json({

                success: false,

                message: "OTP not found"

            });

        }

        if (otpRecord.otp !== otp) {

            return res.status(400).json({

                success: false,

                message: "Invalid OTP"

            });

        }

        if (new Date() > otpRecord.expiresAt) {

            return res.status(400).json({

                success: false,

                message: "OTP Expired"

            });

        }

        otpRecord.verified = true;

        await otpRecord.save();

        res.json({

            success: true,

            message: "OTP Verified"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// RESET PASSWORD
// ==============================

const resetPassword = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord || !otpRecord.verified) {

            return res.status(400).json({

                success: false,

                message: "Please verify OTP first."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne(

            { email },

            {

                password: hashedPassword

            }

        );

        await OTP.deleteOne({ email });

        res.json({

            success: true,

            message: "Password Updated Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    sendResetOTP,

    verifyResetOTP,

    resetPassword

};