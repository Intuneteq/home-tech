import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(404).json({ message: "user not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "unauthorized user" });

    const accessToken = jsonwebtoken.sign({email}, process.env.JWT_SECRET, { expiresIn: "5h" });

    res.status(200).json({success: true, token: accessToken, message: 'user sign In successfull'})
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
