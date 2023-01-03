import bcrypt from 'bcrypt';

import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";

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
      await User.create({
        fullName,
        email,
        password: hashedPwd,
      });
      res
        .status(201)
        .json({
          success: true,
          message: `successfully registered ${fullName}`,
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
