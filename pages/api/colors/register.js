import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { email, colorCombination } = req.body;
    if (!email || !colorCombination)
      return res
        .status(400)
        .json({ success: false, message: "Incomplete payload" });

    const foundUser = await User.findOne({ email }).exec();
    console.log(foundUser)
    if (!foundUser)
      return res
        .status(404)
        .json({ success: false, message: `user with ${email} not found` });

    foundUser.colorCombination = colorCombination;
    await foundUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "color combination successfully updated",
      });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}