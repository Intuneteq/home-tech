import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import NextCors from 'nextjs-cors';

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
    const { imageString, email } = req.body;

    if (!email || !imageString)
      return res
        .status(400)
        .json({ success: false, message: "Incomplete payload" });

    const user = await User.findOne({ email }).exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user with ${email} not found` });

    const match = user.authImage.imageString === imageString;
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "incorrect Image" });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
