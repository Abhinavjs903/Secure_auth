const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/otpGenerator");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;
        const otp = generateOTP();

        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

           name,
           email,
           phone,
           password: hashedPassword,

           otp,
           otpExpiry,

           isVerified: false

            });;

        await user.save();
        console.log("Generated OTP:", otp);

        res.json({

            success: true,
            message: "User Registered Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

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

module.exports = {

    signup,
    login

};