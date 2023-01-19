import UserOTPVerification from "../models/UserOTPVerification";
import User from "../models/user";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

async function sendOTPVerificationEmail(email, id) {
  if (!id) {
    const user = User.findOne({ email }).exec();
    if (!user) {
      return { error: true, message: "user not found" };
    } else {
      id = user._id;
    }
  }
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up</p>
                <p>This code <b>expires in 1hr</b></p>`,
    };

    const hashedOTP = await bcrypt.hash(otp, 10);
    const newOTPVerification = await new UserOTPVerification({
      userId: id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAT: addHours(5),
    });
    await newOTPVerification.save();

    console.log('i got here 2')
    
    await transporter.sendMail(mailOptions);
    console.log('i got here 3')
    return { error: false, message: "otp verification sent to your email" };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.message };
  }
}

export default sendOTPVerificationEmail;
