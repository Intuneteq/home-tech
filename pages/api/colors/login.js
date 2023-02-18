import { setCookie, deleteCookie } from "cookies-next";
import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { getSession } from "../../../lib/get-session";
import { decrypt } from "../../../lib/crypto";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  //authenticate user
  const { user, error, status, message } = await authentication(req); 
  if (error) return res.status(status).json({ success: false, message });
  const _id = user._id;

  //Assign session view
  const session = await getSession(req, res);
  session.views = session.views ? session.views + 1 : 1;

  //Check Login attempts
  if (session.views > 3) {
    const date = new Date();
    const elapse = new Date(session.elapse);
    const after10Mins = new Date(elapse.getTime() + 10 * 60000);
    const timeLeft = Math.round((after10Mins - date) / 60000);

    //after more than 3 failed attempts, pend for 10 minutes
    if (date < after10Mins) {
      return res.status(401).json({
        success: false,
        message:
          timeLeft == 0 || timeLeft == 1
            ? "Try again In 1 minute"
            : `Try again In ${timeLeft} minutes`,
        views: session.views,
      });
    }

    //after 10 minutes elapse, reset session views and elapes properties, so the user can start over.
    session.views = 1;
    session.elapse = null;
  }

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

    const decryptedPattern = await Promise.all(
      user.colorCombination.map((item) => {
        return decrypt(item);
      })
    );

    const match =
      JSON.stringify(colorCombination) === JSON.stringify(decryptedPattern);
    const currentViews = session.views;

    if (!match && currentViews == 1) {
      return res.status(401).json({
        success: false,
        message: "Incorrect combination, you have two attempts left",
        views: currentViews,
      });
    } else if (!match && currentViews == 2) {
      return res.status(401).json({
        success: false,
        message: "Incorrect combination, you have one attempt left",
        views: currentViews,
      });
    } else if (!match && currentViews == 3) {
      session.elapse = new Date();
      return res.status(401).json({
        success: false,
        message: "Try again in 10 mins",
        views: currentViews,
      });
    }

    deleteCookie("form_key", { req, res });
    setCookie("color_key", "color key", { req, res, maxAge: 60 * 60 });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
