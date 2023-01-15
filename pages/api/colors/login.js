import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";

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

    const user = await User.findOne({ _id }).exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

    const match =
      JSON.stringify(colorCombination) ===
      JSON.stringify(user.colorCombination);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "incorrect combination" });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
