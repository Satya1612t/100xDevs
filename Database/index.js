const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const PORT = 3000
const app = express()
app.use(express.json());

mongoose.connect('mongodb+srv://admin:Z3uwzJHJd2uZBplA@cluster0.tb9ncne.mongodb.net/user_app')

const User =  mongoose.model('Users', {
    name : String,
    email : String,
    password : String
});

app.post('/signup', async function(req, res){

    const username =  req.body.email;
    const password =  req.body.password;
    const name =  req.body.name;

    const userExist = await User.findOne({email : username})
    console.log(userExist);
    if(userExist){
        res.status(401).json({
            msg : "Email alredy Exist"
        })
    }
    
    const check = new User({
        name : name,
        email : username,
        password : password
    })
    check.save();
    res.json({
        msg : "Successfully Saved"
    })
})

app.get('/')

app.listen(PORT,  () => {
    console.log(`server is running at ${PORT}`)
})