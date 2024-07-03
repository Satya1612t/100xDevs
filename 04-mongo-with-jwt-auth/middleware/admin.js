// Middleware for handling 
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')


function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    console.log(token)
    const words = token.split(" ");
    const jwtToken = words[1]
    console.log(jwtToken);
    const decodeValue = JWT.verify(jwtToken, JWT_SECRET);
    console.log(decodeValue)
    if (decodeValue.username) {
        next();
    }
    else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }

}

module.exports = adminMiddleware;