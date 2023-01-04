import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if(method === "POST") {
        const { email, imgPattern } = req.body;

        if(!email || !imgPattern) return res.status(400).json({success: 'false', message: 'bad request'}).end();

        const foundUser = await User.findOne({email}).exec();
        if(!foundUser) return res.status(404).json({success: false, message: 'user does not exist'}).exec();

        foundUser.authImage.imageCombination = imgPattern;
        await foundUser.save();

        res.status(201).json({success: true, message: 'image pattern successfully created'})

    } else {
        res.status(404).json({ success: false, message: "resource not found" });
    }
}