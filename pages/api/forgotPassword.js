import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";
import sendOTPVerificationEmail from "../../lib/otpVerification";
import { createToken } from "../../lib/jwt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res
        .status(422)
        .json({ success: false, message: "Incomplete request" });
    } else {
      const foundUser = await User.findOne({ email }).exec();
      if (!foundUser)
        return res
          .status(404)
          .json({ sucess: false, message: "email does not exist" });

      try {
        const { error, message } = await sendOTPVerificationEmail(
          email,
          foundUser._id
        );

        if (error) {
          console.log(error);
          return res.status(500).json({ message });
        }

        const accessToken = createToken(foundUser._id);

        res.status(201).json({
          success: "PENDING",
          message,
          accessToken,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
