import User from "../../models/user";
import dbConnect from "../../lib/dbConnect";
import authentication from "../../lib/authentication";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  const { user, error, status, message } = await authentication(req);
  if (error) {
    return res.status(status).json({ success: false, message: message });
  }

  if (method === "GET") {
    const userInfo = {
      fullName: user.fullName,
    };

    res.status(200).json({ success: true, data: userInfo });
  } else if(method == "DELETE") {
    const foundUser = await User.findOne({_id: user._id}).exec();
    if(!foundUser) return res.status(204).json({success: true, message: 'user not found'})
    const res = await foundUser.deleteOne({_id: user._id})
    res.status(204).json(res); 

  } else {
    res.status(400).json({ success: false, message: "resource not found" });
  }
}
