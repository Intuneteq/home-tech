import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";
import authentication from "../../lib/authentication";
import sendOTPVerificationEmail from "../../lib/otpVerification";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  const { user, error, status, message } = await authentication(req);
  const userId = user._id;

  if (error) return res.status(status).json({ success: false, message });

  if (method === "GET") {
    const { email } = await User.findOne({ _id: userId }).exec();

    const { error, message } = await sendOTPVerificationEmail(email, userId);
    if (error) {
      return res.status(500).json({ message });
    }

    res.status(200).json({ success: true, message: "otp sent to " + email });
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
