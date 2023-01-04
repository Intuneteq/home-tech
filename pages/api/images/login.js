import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const { user, error, status, message } = await authentication(req);
  if (error)
    return res.status(status).json({ success: false, message: message });

    if(method === 'POST') {
        const { imageString } = req.body;

        const match = user.authImage.imageString === imageString
        if (!match)
        return res
          .status(401)
          .json({ success: false, message: "incorrect Image" });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "resource not found" });
    }
}
