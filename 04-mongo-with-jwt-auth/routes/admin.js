const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username, password
    })
    res.status(200).json({
        msg: "Admin created successfully"
    })

});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username,
        password
    })
    if (admin) {

        const token = JWT.sign({
            username,
        }, JWT_SECRET)

        res.status(200).json({
            token,
        })
    }
    else {

    } res.status(411).json({
        msg: "Invalid Credentials"
    })




});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        msg: "New Course Succesfully Created",
        course: newCourse._id,
    })
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({});
    res.json({
     courses : response
    })
 });

module.exports = router;