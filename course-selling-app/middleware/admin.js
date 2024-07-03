// Middleware for handling auth
const { Admin } =  require('../db/index')



function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
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

module.exports = adminMiddleware;