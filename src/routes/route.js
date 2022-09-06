const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

//------------------------(create authors Api)----------------------------------

router.post("/authors", authorController.CreateAuthor);

//-------------------------(create blogs api)-----------------------------------

router.post("/blogs", blogController.createBlog);

//-------------------------(get blogs api)--------------------------------------

router.get("/blogs", blogController.allBlogs);

//--------------------------(update blogs api)----------------------------------

//-------------------------(get blogs api)--------------------------------------

router.get("/blogs", blogController.allBlogs);

//--------------------------(update blogs api)----------------------------------

router.put("/blogs/:blogId", blogController.updateBlog);

router.get("/deleteBlog/:blogId", blogController.deleteBlog);

module.exports = router;
