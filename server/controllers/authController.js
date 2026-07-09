const User = require("../models/User");
const bcrypt = require("bcrypt");
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

}const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({

    name,
    email,
    phone,
    password: hashedPassword

});

        await user.save();

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

module.exports = {

    signup

};