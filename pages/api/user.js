import dbConnect from "../../lib/dbConnect";
import authentication from "../../lib/authentication";
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

  const { user, error, status, message } = await authentication(req);
  if (error) {
    return res.status(status).json({ success: false, message: message });
  }

  if (method === "GET") {
    const userInfo = {
      fullName: user.fullName,
    };

    res.status(200).json({ success: true, data: userInfo });
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}
