const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");
const moment = require("moment");

const allBlogs = async function (req, res) {
  try {
    let { authorId, category, tag, subcategory } = req.query;
    console.log(tag);
    let query = {};
    if (authorId != null) query.authorId = authorId;
    if (category != null) query.category = category;
    if (tag != null) query.tags = tag;
    if (subcategory != null) query.subcategory = subcategory;

    let totalBlogs = await blogModel.find(
      { isDeleted: false },
      { isPublished: true }
    );

    if (totalBlogs.length === 0) {
      res
        .status(404)
        .send({ status: false, msg: "None of the Blogs are Published" });
    } else {
      let finalFilter = await blogModel.find(query);
      res.status(200).send({ status: true, msg: finalFilter });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

const updateBlog = async function (req, res) {
  try {
    let id = req.params.blogId;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send({
        status: false,
        msg: "invalid blogid  ",
      });
    }
    let blog = await blogModel.findById(id);
    if (!blog || blog.isDeleted === true) {
      res.status(404).send({
        status: false,
        msg: "",
      });
    }
    if (req.body.title) blog.title = req.body.title;
    if (req.body.body) blog.body = req.body.body;
    if (req.body.tags.length > 0) blog.tags = [...blog.tags, ...req.body.tags];
    if (req.body.subcategory.length > 0)
      blog.subcategory = [...blog.subcategory, ...req.body.subcategory];
    blog.isPublished = true;
    blog.publishedAt = moment();
    let blog2 = await blogModel.findByIdAndUpdate({ _id: id }, blog, {
      new: true,
    });
    res.status(200).send({ status: true, msg: blog2 });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    let author = await authorModel.findOne({ _id: authorId });
    if (!author) {
      return res
        .status(404)
        .send({ msg: "Enter a valid authorId , author doesn't exists" });
    }
    let createdBlog = await blogModel.create(data);
    res.status(201).send({ data: createdBlog });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// const deleteBlog = async function (req, res) {
//   let blogId = req.params.blogId;
//   let newdata = await blogModel.findByIdAndDelete(blogId);
//   console.log(blogId);
//   res.send(blogId);
// };

//DELETE /blogs/:blogId - Mark is Deleted:true if the blogId exists and it is not deleted.
const deleteBlogById = async function (req, res) {
  try {
    let id = req.params.blogId;

    if (!validator.isValidObjectId(id)) {
      return res
        .status(400)
        .send({ status: false, message: `BlogId is invalid.` });
    }

    let Blog = await blogModel.findOne({ _id: id });

    if (!Blog) {
      return res.status(400).send({ status: false, msg: "No such blog found" });
    }
    let data = await blogModel.findOne({ _id: id });
    if (data.isDeleted == false) {
      let Update = await blogModel.findOneAndUpdate(
        { _id: id },
        { isDeleted: true, deletedAt: Date() },
        { new: true }
      );
      res.status(200).send({
        status: true,
        message: "successfully deleted blog",
      });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "Blog already deleted" });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

// DELETE /blogs?queryParams - delete blogs by using specific queries or filters.
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
const deleteBlogByQuery = async function (req, res) {
  try {
    const filterQuery = { isDeleted: false, deletedAt: null };
    const queryParams = req.query;
    const authorIdFromToken = req.authorId;

    if (!validator.isValidObjectId(authorIdFromToken)) {
      res.status(400).send({
        status: false,
        message: `${authorIdFromToken} is not a valid token id`,
      });
      return;
    }

    if (!validator.isValidRequestBody(queryParams)) {
      res.status(400).send({
        status: false,
        message: "No query params received. Aborting delete operation",
      });
      return;
    }

    const { authorId, category, tags, subcategory, isPublished } = queryParams;

    if (validator.isValid(authorId) && validator.isValidObjectId(authorId)) {
      filterQuery["authorId"] = authorId;
    }
     if (validator.isValid(category)){filterQuery["category"]= category.trim()
    }
if (validator.isValid(tags)){
  const tagsArr = tags .trim().split(",").map((tag) => tag.trim())
}

    

  }
module.exports = {createBlog,updateBlog,allBlogs,deleteBlogById}

