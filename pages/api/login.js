import bcrypt from "bcrypt";
import NextCors from 'nextjs-cors';

import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  await dbConnect();

  if (method === "POST") {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(404).json({ message: "user not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "unauthorized user" });

    res.status(200).json({ success: true, message: "user sign In successful" });
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
