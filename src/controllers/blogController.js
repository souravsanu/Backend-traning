const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


const createBlog = async function (req, res) {
    try {
        let data = req.body
        let AuthorId = data.authorId
        if(!AuthorId) return res.status(404).send({status : false,msg : "AuthorId Missing"})
 
        let correctAuthorId =  await authorModel.findById(AuthorId)
        if (!correctAuthorId) return res.status(404).send({ status: false, msg: "AuthorId is not Valid" })
        let timeElapsed = Date.now();
        let today = new Date(timeElapsed);
        if (data.isPublished) {
            data.publishedAt = today
        }
        if (data.deletedAt) {
            data.deletedAt = today
        }
        console.log(data)

        let savedData = await blogModel.create(data)
        res.status(201).send({ msg: savedData })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

const getBlogs = async function (req, res) {

    try {
        let filters = req.query;
        filters["isDeleted"] = false;
        filters["isPublished"] = true;
        let data = await blogModel.findOne(filters)
        if (!data) res.status(404).send({ status: false, msg: "file not found!" })
        res.status(200).send({ status: true, data: { data } })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog