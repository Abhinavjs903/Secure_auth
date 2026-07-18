const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
// ==============================
// SIGNUP
// ==============================

const signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;
        const otpRecord = await OTP.findOne({ email });

if (!otpRecord || !otpRecord.verified) {

    return res.status(400).json({

        success: false,
        message: "Please verify your email first."

    });

}
        
        // Check Email
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email already exists"

            });

        }

        // Check Phone
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {

            return res.status(400).json({

                success: false,
                message: "Phone number already exists"

            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({

            name,
            email,
            phone,
            password: hashedPassword,
            isVerified: true

        });

        await user.save();
        await OTP.deleteOne({ email });

        res.json({

            success: true,
            message: "Account Created Successfully"

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
// EXPORTS
// ==============================

module.exports = {

    signup,
    login

};