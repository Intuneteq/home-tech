import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';

import User from "../../models/user";
// import UserOTPVerification from "../../models/UserOTPVerification"
import dbConnect from "../../lib/dbConnect";
// import {sendOTPVerificationEmail} from '../../lib/otpVerification';

// let transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com',
//   auth: {
//     user: process.env.AUTH_MAIL,
//     pass: process.env.AUTH_PASS
//   }
// })

// const sendOTPVerificationEmail = async (email, id) => {
//   console.log(email, id)
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     const mailOptions = {
//       from: process.env.AUTH_MAIL,
//       to: email,
//       subject: "Verify Your Email",
//       html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up</p>
//               <p>This code <b>expires in 1hr</b></p>`
//     }

//     const saltRounds = 10;
//     const hashedOTP = await bcrypt.hash(otp, saltRounds);

//     const newOTPVerification = await new UserOTPVerification({
//       userId: id,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 3600000
//     });

//     await newOTPVerification.save();
//     await transporter.sendMail(mailOptions);
//     return { error: false, message: '' }

//   } catch (error) {
//     return { error: true, message: error.message}
//   }
// };

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
        password: hashedPwd
      });
      await newUser.save();
      // console.log('newUser', newUser);

      // console.log('i got here 1')

      //call the otp function here
      // const { error, message } = await sendOTPVerificationEmail(email, newUser._id);

      // if(error) return res.status(500).json({message})

      res
        .status(201)
        .json({
          success: true,
          message: 'user sign up successful'
          // success: "pending",

          // message: `verification otp email sent`,
          // userId: newUser._id
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: 'resource not found' });
  }
}
