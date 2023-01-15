import jwt from "jsonwebtoken";

function createToken (id) {
    console.log('here', id)
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "5h"
    });
    return accessToken;
};

export default createToken;