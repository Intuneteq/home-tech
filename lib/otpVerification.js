import UserOTPVerification from '../models/UserOTPVerification';

import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  })

const sendOTPVerificationEmail = async (email, id) => {
    console.log(email, id)
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const mailOptions = {
        from: process.env.AUTH_MAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up</p>
                <p>This code <b>expires in 1hr</b></p>`
      }
  
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(otp, saltRounds);
  
      const newOTPVerification = await new UserOTPVerification({
        userId: id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000
      });
  
      await newOTPVerification.save();
      await transporter.sendMail(mailOptions);
      return { error: false, message: '' }
  
    } catch (error) {
      return { error: true, message: error.message}
    }
  };

  export default sendOTPVerificationEmail;