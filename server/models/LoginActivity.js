const mongoose = require("mongoose");

const loginActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        ipAddress: {
            type: String,
            required: true
        },

        userAgent: {
            type: String
        },

        status: {
            type: String,
            enum: ["success", "failed"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("LoginActivity", loginActivitySchema);