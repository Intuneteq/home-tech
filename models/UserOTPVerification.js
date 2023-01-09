import mongoose from "mongoose";

const UserOTPVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: Date,
    expiresAt: Date 
});

module.exports = mongoose.models.UserOTPVerification || mongoose.model("UserOTPVerification", UserOTPVerificationSchema);