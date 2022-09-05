const blogModel = require("../models/blogModel");
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