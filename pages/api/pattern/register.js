import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    const {user, error, status, message} = await authentication(req);
    const _id = user._id;
  
    if(error) return res.status(status).json({success: false, message})

    if(method === "POST") {
        const { imgPattern } = req.body;

        if(!imgPattern) return res.status(400).json({success: 'false', message: 'bad request'}).end();

        const foundUser = await User.findOne({_id}).exec();
        if(!foundUser) return res.status(404).json({success: false, message: 'user does not exist'}).exec();

        foundUser.authImage.imageCombination = imgPattern;
        await foundUser.save();

        res.status(201).json({success: true, message: 'image pattern successfully created'})

    } else {
        res.status(404).json({ success: false, message: "resource not found" });
    }
}