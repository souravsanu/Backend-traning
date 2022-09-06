const express = require('express');
const router = express.Router();
const authorcontroller = require('../controllers/authorController')
const blogcontroller = require('../controllers/blogController')




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors",authorcontroller.createAuthor)
router.post("/blogs",blogcontroller.createBlog)
router.get("/blogs",blogcontroller.getBlogs)
router.put("/blogs/:blogId",blogcontroller.updateBlog)
router.delete ("/blogs/:blogId",blogcontroller.deleteBlogsParam)
router.delete("/blogs",blogcontroller.deleteBlogsQuery)




            


module.exports = router;