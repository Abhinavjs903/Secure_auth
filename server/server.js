require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const express = require("express");
const dashboardroutes = require("./routes/dashboardroutes");
const authroutes = require("./routes/authroutes");
const app = express();
const cors = require("cors");
const otproutes = require("./routes/otproutes");
const passwordroutes = require("./routes/passwordroutes");
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



app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});