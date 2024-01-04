const jwtUtils = require("../utils/jwt");
const authenticateToken = (req,res,next) => {
    const authorization = req.header('Authorization');

    if(!authorization){
        return res.status(401).json({message: "Unauthorized - Missing Token"});
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwtUtils.verifyToken(token);

    if(!decodedToken){
        return res.status(401).json({message: "Unauthorized - Invalid Token"});
    }

    req.userID = decodedToken.userID;
    next();
}

module.exports = authenticateToken;