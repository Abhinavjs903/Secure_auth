require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const express = require("express");
const dashboardRoutes = require("./routes/dashboardroutes");
const authRoutes = require("./routes/authroutes");
const app = express();
const cors = require("cors");
const otpRoutes = require("./routes/otproutes");
const passwordRoutes = require("./routes/passwordroutes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authroutes);
app.use("/api/dashboard", dashboardroutes);
app.use("/api/otp", otproutes);
app.use("/api/password", passwordroutes);
const PORT = process.env.PORT;

app.get("/", (req, res) => {

    res.send("🚀 Server is running successfully!");

});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (email === "admin@mcd.gov.in" && password === "34567890-") {

        res.json({
            success: true,
            message: "Login Successful!"
        });

    } else {

        res.json({
            success: false,
            message: "Invalid Email or Password"
        });

    }

});

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});