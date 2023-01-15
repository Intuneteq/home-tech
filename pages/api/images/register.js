import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    
  const {user, error, status, message} = await authentication(req);
  const _id = user._id;

  if(error) return res.status(status).json({success: false, message})

    if(method === 'POST') {
        const { imageString} = req.body;
        if(!imageString) return res.status(400).json({success: false, message: 'bad request'});

        const foundUser = await User.findOne({_id}).exec();
        if(!foundUser) return res.status(404).json({ success: false, message: `user not found` });

        const authImage = foundUser.authImage
        authImage.imageString = imageString;
        await foundUser.save();

        res.status(200).json({success: true, message: 'image upload successful'})
    } else if(method==="GET") {
        const auth = req.headers.authorization;
        if(!auth) return res.status(401).json({success: false, message: 'resource not available to user'});

        const email = auth.split(" ")[1];
        const foundUser = await User.findOne({email}).exec();
        if(!foundUser) return res.status(404).json({ success: false, message: `user with ${email} not found` });

        const authImage = foundUser.authImage.imageString
        res.status(200).json({success: true, data: authImage})
    } else {
        res.status(404).json({ success: false, message: "resource not found" });
    }

}