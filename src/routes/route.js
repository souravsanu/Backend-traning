const express = require('express');
const router = express.Router();
const authorcontroller = require('../controllers/authorController')
const blogcontroller = require('../controllers/blogController')
const middleware = require("../middlewares/auth")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", authorcontroller.createAuthor)
router.post("/login", authorcontroller.login)

router.post("/blogs", middleware.authenticate, blogcontroller.createBlog)
router.get("/blogs", middleware.authenticate, blogcontroller.getBlogs)
router.put("/blogs/:blogId", middleware.authenticate, middleware.authorise, blogcontroller.updateBlog)
router.delete("/blogs/:blogId", middleware.authenticate, middleware.authorise, blogcontroller.deleteBlogsParam)
router.delete("/blogs", middleware.authenticate, middleware.authorise, blogcontroller.deleteBlogsQuery)







module.exports = router;