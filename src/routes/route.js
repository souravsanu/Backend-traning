const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

//author api
router.post("/authors", authorController.createAuthor);

//Blog api
router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.allBlogs);
router.put("/blogs/:blogId", blogController.updateBlog);
router.delete("/blogs/:blogId", blogController.deleteBlogById);
router.delete("/blogs", blogController.deleteBlogByQuery);

module.exports = router;
