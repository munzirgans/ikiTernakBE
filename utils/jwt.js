require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userID) => {
    const secretKey = process.env.JWT_SECREY_KEY;
    const expiresIn = '365d';
    const token = jwt.sign({userID}, secretKey, {expiresIn});
    return token;
};

const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECREY_KEY;
    try{
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }catch(error){
        console.error(error);
        return null;
    }
};

module.exports = {generateToken, verifyToken};