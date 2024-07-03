const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })
    res.json({
        msg: "User Created Successfully"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
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
    const user = await User.find({
        username : req.headers.username
    })

    const course = await Course.find({
        courseId : {
            "$in" : user.purchasedCourse
        }
    })
    res.json({
        course : course
    })


});

module.exports = router