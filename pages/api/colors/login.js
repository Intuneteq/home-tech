import { setCookie, deleteCookie } from "cookies-next";
import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";
import { getSession } from "../../../lib/get-session";
import { decrypt } from "../../../lib/crypto";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  const { user, error, status, message } = await authentication(req);
  const _id = user._id;

  if (error) return res.status(status).json({ success: false, message });
  const session = await getSession(req, res);
  session.views = session.views ? session.views + 1 : 1;
  const views = session.views;

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

        const decryptedPattern = await Promise.all(user.colorCombination.map(item => {
          return decrypt(item)
        }))

    const match =
      JSON.stringify(colorCombination) ===
      JSON.stringify(decryptedPattern);
    if (!match && views == 1) {
      return res
        .status(401)
        .json({
          success: false,
          message: "incorrect combination, you have two attempts left",
          views,
        });
    } else if (!match && views == 2) {
      return res
        .status(401)
        .json({
          success: false,
          message: "incorrect combination, you have one attempt left",
          views,
        });
    } else if (!match && views >= 3) {
      const date = new Date();
      function addMins(numOfMins) {
        date.setTime(date.getTime() + numOfMins * 60 * 1000);

        return date;
      }
      const after10Mins = addMins(10);
      if (after10Mins < date) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "incorrect combination, you have no more attempts left, try again in 10 mins",
            views,
          });
      } else {
        session.views = 0;
        return res
          .status(401)
          .json({
            success: false,
            message: "incorrect combination, you have two attempts left",
            views,
          });
      }
    }

    deleteCookie('form_key', { req, res });
    setCookie("color_key", 'color key', { req, res, maxAge: 60 * 60 });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
