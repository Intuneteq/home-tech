import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if(method === 'POST') {
        const { imageString, email } = req.body;
        if(!imageString || !email) return res.status(400).json({success: false, message: 'bad request'});

        const foundUser = await User.findOne({email}).exec();
        if(!foundUser) return res.status(404).json({ success: false, message: `user with ${email} not found` });

        const authImage = foundUser.authImage
        authImage.imageString = imageString;
        await foundUser.save();

        res.status(200).json({success: true, message: 'image upload successful'})
    } else {
        res.status(404).json({ success: false, message: "resource not found" });
    }

}