const express = require('express');
const app = express();
const zod = require('zod');
app.use(express.json());

//validate input by Zod lib.

function validateUser(obj) {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
    })
    const response = schema.safeParse(obj)
    console.log(response);
    return response;
}

function userMiddleware(req, res, next) {
    const response = validateUser(req.body)
    if (!response.success) {    
        res.json({
            msg: "user entered invalid inputs"
        })
    }
    else{
        res.send("Logged In")
    }
}

app.post('/health-check', userMiddleware, (req, res) => {  //we can range of function here;
    res.status(200).send(`Hello world`)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})