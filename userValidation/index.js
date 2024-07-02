const express = require('express');
const jwt = require('jsonwebtoken')
const jwtPassword = '123456'

const app = express();
app.use(express.json())

const ALL_USER = [
    {
        name: 'Raj',
        username: "raj@gmail.com",
        password: '12344'
    },
    {
        name: 'Arya',
        username: "arya1@gmail.com",
        password: '12334'
    },
    {
        name: 'Satyam',
        username: "satyamt154@gmail.com",
        password: '1234'
    },
];

function userExist(username, password) {
    let isUser = false;

    for (let i = 0; i < ALL_USER.length; i++) {
        if (ALL_USER[i].username == username && ALL_USER[i].password == password) {
            isUser = true;
        }
    }
    return isUser;

    // ALL_USER.forEach((val) => {
    //     if (val.username == username && val.password == password) {
    //         isUser = true
    //     }
    //     return isUser;
    // })
}

app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!(userExist(username, password))) {
        return res.status(404).json({
            msg: " USer not exist in my DB"
        })
    };

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
})

app.get('/users', (req, res) => {

    const token = req.header.authorization;
    try {
        const decode = jwt.verify(token, jwtPassword);
        const username = decode.username;
        //return all the list of user other than this user;
    } catch (error) {
        return res.status(200).json({
            user : ALL_USER
        })
    }


});

app.listen(3000);


// BId5a58J7cI4P1CU