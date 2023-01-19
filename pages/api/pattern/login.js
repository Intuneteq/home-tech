import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { decrypt } from "../../../lib/crypto";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const {user, error, status, message} = await authentication(req);
  const _id = user._id;

  if(error) return res.status(status).json({success: false, message})

  if (method === "POST") {
    const { imgPattern } = req.body;

    if (imgPattern.length < 3)
      return res
        .status(400)
        .json({ success: false, message: "Incomplete payload" });

    const user = await User.findOne({ _id }).exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user with not found` });

    const decryptedPattern = await Promise.all(user.authImage.imageCombination.map(item => {
      return parseInt(decrypt(item))
    }))

    const match =
      JSON.stringify(imgPattern) ===
      JSON.stringify(decryptedPattern);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "incorrect combination" });

    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
