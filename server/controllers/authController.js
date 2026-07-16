const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/otpGenerator");
const sendOTPEmail = require("../utils/mail");

// ==============================
// SIGNUP
// ==============================

const signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email already exists"

            });

        }

        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {

            return res.status(400).json({

                success: false,
                message: "Phone number already exists"

            });

        }

        const otp = generateOTP();

        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false

        });

        await user.save();

        try {

            await sendOTPEmail(email, otp);

            console.log("✅ OTP Email Sent Successfully");

        } catch (error) {

            console.log("❌ Email Sending Failed");
            console.error(error);

        }

        res.json({

            success: true,
            message: "Account created successfully. Please verify your email.",
            email

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==============================
// LOGIN
// ==============================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (!user.isVerified) {

            return res.status(401).json({

                success: false,
                message: "Please verify your email first."

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Incorrect Password"

            });

        }

        const token = jwt.sign(

            {

                id: user._id,
                email: user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            success: true,
            message: "Login Successful",
            token

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

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                success: false,
                message: "Invalid OTP"

            });

        }

        if (new Date() > user.otpExpiry) {

            return res.status(400).json({

                success: false,
                message: "OTP Expired"

            });

        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

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
// EXPORTS
// ==============================

module.exports = {

    signup,
    login,
    verifyOTP

};