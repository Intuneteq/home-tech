import jwt from "jsonwebtoken";

function createToken (id) {
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "5h"
    });
    return accessToken;
};

function createRegisterToken(id) {
    const registerToken = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    return registerToken;
}

export {createToken, createRegisterToken};