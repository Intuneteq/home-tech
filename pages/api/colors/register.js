import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { encrypt } from "../../../lib/crypto";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const {user, error, status, message} = await authentication(req);
  const _id = user._id;

  if(error) return res.status(status).json({success: false, message})

  if (method === "POST") {
    const { colorCombination } = req.body;
    if (colorCombination.length < 3) {
      return res
        .status(400)
        .json({ success: false, message: "please select three colors" });
    } else if (colorCombination.length > 3) {
      return res
        .status(400)
        .json({ success: false, message: "You can only select 3 colors" });
    }

    const foundUser = await User.findOne({ _id }).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

        const encryptedPattern = await Promise.all(colorCombination.map(item => {
          return encrypt(item)
      }));

    foundUser.colorCombination = encryptedPattern;
    await foundUser.save();

    res.status(201).json({
      success: true,
      message: "color combination successfully updated",
    });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
