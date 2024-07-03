const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index')
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username, password
    })
    res.status(200).json({
        msg: "User created successfully"
    })
});

router.post('/signin', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            username,
            password
        })
        if (user) {
            const token = JWT.sign({
                username,
            }, JWT_SECRET)
            res.status(200).json({
                token,
            })
        }


    } catch (e) {
        res.status(411).json({
            msg: "Invalid Credentials"
        })
    }


});

router.get('/courses', async (req, res) => {
    const courses = await Course.find({})
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.username
    console.log(courseId);

     try {
        await User.updateOne({
            username: username,
        }, {
            "$push": {
                purchasedCourse: courseId
            }
        })
    } catch (e) {
        console.log(e);
    }
    res.json({
        msg: "Purchased Successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.username
    })
    console.log(user);

    const course = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    })
    // console.log(course);

    res.status(200).json({
        course,
    })
})

module.exports = router