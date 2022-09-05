const blogModel = require("../models/blogModel");
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

const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    let author = await authorModel.findById({ _id: authorId });
    if (!author) {
      return res.status(404).send({ msg: "Enter a valid authorId" });
    }
    let createdBlog = await blogModel.create(data);
    res.status(201).send({ data: createdBlog });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.allBlogs = allBlogs;
