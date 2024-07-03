const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({
        msg: "Admin Created Successfully"
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