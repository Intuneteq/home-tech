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

function createLoginToken(id, key) {
    const loginToken = jwt.sign({id, key}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return loginToken;
}

export {createToken, createRegisterToken, createLoginToken};