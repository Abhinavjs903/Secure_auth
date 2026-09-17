const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");


// ==============================
// PASSWORD STRENGTH VALIDATION
// ==============================

function isStrongPassword(password) {

    if (typeof password !== "string") {

        return false;

    }

    const minLength = password.length >= 8;

    const hasUppercase = /[A-Z]/.test(password);

    const hasLowercase = /[a-z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSpecialChar = /[^A-Za-z0-9\s]/.test(password);

    return (

        minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar

    );

};


// ==============================
// SIGNUP
// ==============================

const signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;


        // ==============================
        // CHECK PASSWORD STRENGTH
        // ==============================

        if (!isStrongPassword(password)) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be 8+ characters with uppercase, lowercase, number and special character"

            });

        }


        // ==============================
        // VERIFY EMAIL OTP
        // ==============================

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord || !otpRecord.verified) {

            return res.status(400).json({

                success: false,

                message: "Please verify your email first."

            });

        }


        // ==============================
        // CHECK EMAIL
        // ==============================

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already exists"

            });

        }


        // ==============================
        // CHECK PHONE
        // ==============================

        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {

            return res.status(400).json({

                success: false,

                message: "Phone number already exists"

            });

        }


        // ==============================
        // HASH PASSWORD
        // ==============================

        const hashedPassword = await bcrypt.hash(password, 10);


        // ==============================
        // CREATE USER
        // ==============================

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


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


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