import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { encrypt } from "../../../lib/crypto";
import { createRegisterToken } from "../../../lib/jwt";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  const { user, error, status, message } = await authentication(req);
  if(error){
    console.log(error)
    await User.deleteMany({email: req.body.email})
    return res.status(status).json({success: false, message})
   } 

   const _id = user._id;

  if (method === "POST") {
    const { imageObject } = req.body;
    if (!imageObject || Object.keys(imageObject).length === 0)
      return res.status(400).json({ success: false, message: "bad request" });

    const foundUser = await User.findOne({ _id }).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

    const { src, children } = imageObject
    const encryptedImage = encrypt(src);
    const encryptedImageChildren = await Promise.all(children.map(item => {
      const encryptedChild = encrypt(item);
      return encryptedChild
    }));

    const newImageObject = {
      src: encryptedImage,
      children: encryptedImageChildren
    }

    foundUser.authImage.imageObject = {...foundUser.authImage.imageObject, ...newImageObject }
    await foundUser.save();
    res.status(200).json({ success: true, message: "image upload successful" });
  } else if (method === "GET") {
    const auth = req.headers.authorization;
    if (!auth)
      return res
        .status(401)
        .json({ success: false, message: "resource not available to user" });

    const email = auth.split(" ")[1];
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ success: false, message: `user with ${email} not found` });

    const authImage = foundUser.authImage.imageString;
    const registerToken = createRegisterToken(_id);
    res.status(200).json({ success: true, data: authImage, registerToken });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
