import dbConnect from "../../../lib/dbConnect";
import authentication from "../../../lib/authentication";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const { user, error, status, message } = await authentication(req);
  if (error)
    return res.status(status).json({ success: false, message: message });

  if (method === "POST") {
    const { colorCombination } = req.body;

    const match =
      JSON.stringify(colorCombination) ===
      JSON.stringify(user.colorCombination);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "incorrect combination" });
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
