import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

import authentication from "../../../lib/authentication";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  console.log('i got here 1')
  const { user, error, status, message } = await authentication(req);
  console.log('i got here 2')
  if(error) return res.status(status).json({success: false, message: message});
  console.log('i got here 3')

  if(method === 'POST') {
    const { colorCombination } = req.body;
    console.log('from db', user.colorCombination)
    console.log('user', colorCombination)

    const match = JSON.stringify(colorCombination) === JSON.stringify(user.colorCombination);
    if(!match) return res.status(401).json({success: false, message: 'incorrect combination'});
    res.status(200).json({success: true})
  } else {
    res.status(404).json({ success: false, message: "resource not found" });
  }
}