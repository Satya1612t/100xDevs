// Middleware for handling auth
const { User } =  require('../db/index')

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username : username,
        password : password
    })
    .then(function(response){
        if(response){
            next();
        }
        else{
            res.status(403).json({
                msg : "User doesn't exist"
            })
        }
    })
    
}

module.exports = userMiddleware;