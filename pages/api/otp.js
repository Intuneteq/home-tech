import bcrypt from "bcrypt";

import User from "../../models/user";
import UserOTPVerification from "../../models/UserOTPVerification";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    const { otp } = req.body;
    // const { userId } = req.param;

    console.log(req.param)
    try {
      if (!userId || !otp)
        return res.status(400).json({ success: false, message: "bad request" });
      const verifyRecords = await UserOTPVerification.find({ userId });
      if (verifyRecords <= 0) {
        res.status(404).json({
          success: false,
          message:
            "Account records does not exist or has already been verified",
        });
      } else {
        const { expiresAt, otp: hashedOTP } = verifyRecords[0];
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          res.status(401).json({
            success: false,
            message: "code has expired, Please request again",
          });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            return res.json(401).status({
              success: false,
              message: "Invalid code passed. Check your inbox",
            });
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId: userId });
            res.status(200).json({
              success: true,
              status: "VERIFIEID",
              message: "user email verified successfully",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
