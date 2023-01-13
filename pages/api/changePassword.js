import bcrypt from "bcrypt";

import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  console.log('i got here')
  if (method === "POST") {
    const { userId, password } = req.body;
    console.log('user', userId)

    if(!userId || !password) return res.status(422).json({success: false, message: 'incomplete payload'});

    const foundUser = await User.findOne({_id: userId}).exec();
    if(!foundUser) return res.status(404).json({success: false, message: 'invalid user Id'})

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        foundUser.password = hashedPwd;
        await foundUser.save();
        res.status(201).json({success: true, message: 'user password successfully updated'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}