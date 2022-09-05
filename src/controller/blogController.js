const blogModel = require("../models/blogModel");

const updateBlog = async function (req, res) {
  try {
    let id = req.params.blogId;
    let blog = await blogModel.findById(id);
    if (!blog && blog.isDeleted === true) {
      res.status(404).send({
        status: false,
        msg: "",
      });
    }

    let blog2 = await blogModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.updateBlog = updateBlog;
