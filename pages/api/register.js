import bcrypt from "bcrypt";
import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";
import sendOTPVerificationEmail from "../../lib/otpVerification";
import {createRegisterToken} from "../../lib/jwt";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  

  if (method === "POST") {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res
        .status(422)
        .json({ success: false, message: "Incomplete request" });
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate)
      return res
        .status(400)
        .json({ success: false, message: "email already in use" });
    try {
      const hashedPwd = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullName,
        email,
        password: hashedPwd,
      });
      await newUser.save();

      //call the otp function here
      const { error, message } = await sendOTPVerificationEmail(
        email,
        newUser._id
      );

      if (error) {
        console.log(error)
        await newUser.delete();
        return res.status(500).json({ message: 'server could not generate otp' });
      };

      const registerToken = createRegisterToken(newUser._id);

      res.status(201).json({
        success: "PENDING",
        message,
        userId: newUser._id,
        registerToken
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
