const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const sendOTPEmail = async (email, otp) => {

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Verify Your Email",

        html: `
            <div style="font-family: Arial; padding:20px;">

                <h2>🔐 Login Authentication System</h2>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing:5px;">${otp}</h1>

                <p>This OTP is valid for <b>5 minutes</b>.</p>

                <p>If you didn't request this, please ignore this email.</p>

            </div>
        `

    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
};

module.exports = sendOTPEmail;