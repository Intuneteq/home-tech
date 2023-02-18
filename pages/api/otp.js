import bcrypt from "bcrypt";

import User from "../../models/user";
import UserOTPVerification from "../../models/UserOTPVerification";
import dbConnect from "../../lib/dbConnect";
import authentication from "../../lib/authentication";
import { createRegisterToken } from "../../lib/jwt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
 const {user, error, status, message} = await authentication(req);

 if(error){
  console.log(error)
  await User.deleteMany({email: req.body.email})
  return res.status(500).json({success: false, message})
 } 

 const userId = user._id;

  if (method === "POST") {
    const { otp } = req.body;
    let registerToken
    try {
      if (!otp)
        return res.status(400).json({ success: false, message: "bad request" });
      const verifyRecords = await UserOTPVerification.find({ userId });
      if (verifyRecords <= 0) {
        return res.status(404).json({
          success: false,
          message:
            "Account records does not exist or has already been verified",
        });
      } else {
        console.log(verifyRecords)
        const { expiresAt, otp: hashedOTP } = verifyRecords[0];
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          return res.status(401).json({
            success: false,
            message: "code has expired, Please request again",
          });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            return res.status(401).json({
              success: false,
              message: "Invalid code passed. Check your inbox",
            });
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId: userId });
            registerToken = createRegisterToken(userId);
          }
        }
      }

      res.status(200).json({
        success: true,
        status: "VERIFIEID",
        registerToken,
        message: "user email verified successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
