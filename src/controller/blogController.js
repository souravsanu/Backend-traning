const blogModel = require("../models/blogModel");
<<<<<<< HEAD

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
=======
const authorModel = require("../models/authorModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body;
        let authorId = data.authorId
        let author = await authorModel.findById({ _id: authorId });
        if (!author) {
            return res.status(404).send({ msg: "Enter a valid authorId" })
        }
        let createdBlog = await blogModel.create(data);
        res.status(201).send({ data: createdBlog })
    }catch(error){
        res.status(400).send({msg : error.message });
    }
}

module.exports.createBlog = createBlog
>>>>>>> f9758e0b3d1c6394e2dff7f21dfa6beef821de1c
