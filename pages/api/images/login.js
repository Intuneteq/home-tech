import { setCookie, deleteCookie } from "cookies-next";
import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { decrypt } from "../../../lib/crypto";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const { user, error, status, message } = await authentication(req);
  const _id = user._id;

  if (error) return res.status(status).json({ success: false, message });

  if (method === "POST") {
    const { imageString } = req.body;

    if (!imageString)
      return res
        .status(400)
        .json({ success: false, message: "Incomplete payload" });

    const user = await User.findOne({ _id }).exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

    const userImage = user.authImage.imageObject.src;
    const decryptedUserImage = decrypt(userImage);

    const match = decryptedUserImage === imageString;
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "incorrect Image" });
    deleteCookie("color_key", { req, res });
    setCookie("image_key", "Image key", { req, res, maxAge: 60 * 60 });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
