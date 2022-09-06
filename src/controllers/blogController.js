const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


const createBlog = async function (req, res) {
    try {
        let data = req.body
        let AuthorId = data.authorId
        if (!AuthorId) return res.status(404).send({ status: false, msg: "AuthorId Missing" })

        let correctAuthorId = await authorModel.findById(AuthorId)
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
        res.status(201).send({status: true, data: savedData })
    } catch (error) {
        res.status(500).send({ status: false,msg: error.message })
    }

}

const getBlogs = async function (req, res) {

    try {
        let filters = req.query;
        filters["isDeleted"] = false;
        filters["isPublished"] = true;
        let data = await blogModel.findOne(filters).populate("authorId")
        if (!data) res.status(404).send({ status: false, msg: "file not found!" })
        res.status(200).send({ status: true, data:  data  })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const updateBlog = async function (req, res) {
    try{
    let blogId = req.params.blogId;
    if (!blogId)
    return  res.status(404).send({ status: false, msg: "enter a blog ID" })
    let valid = await blogModel.findById(blogId)
    if (!valid)
    return    res.status(404).send({ status: false, msg: "invalid blog ID" })
    if (valid.isDeleted == true)
    return   res.status(404).send({ status: false, msg: "no such blog exists" })
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    let updates = req.body
    if (!updates)
    return res.status(400).send({ status: false, msg: "send something to update" })
    let stringUpdates = {};
    let arrayUpdates = {};
    if (updates["title"])
        stringUpdates["title"] = updates.title;
    if (updates["body"])
        stringUpdates["body"] = updates.body;
    if (updates["tags"])
        arrayUpdates["tags"] = updates.tags;
    if (updates["subcategory"])
        arrayUpdates["subcategory"] = updates.subcategory;
    stringUpdates["isPublished"] = true;
    stringUpdates["publishedAt"] = today;
    let updatedBlog = await blogModel.findByIdAndUpdate({_id: blogId }, { $set: stringUpdates, $push: arrayUpdates }, { new: true })
    return res.status(200).send({ status: true, data: updatedBlog })
    }
    catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}

const deleteBlogsParam = async (req, res) => {
    try {
        let iDfromParams = req.params.blogId
       if(iDfromParams.length>24 ||iDfromParams.length<24)
      return res.status(400).send({ status: false, msg: "Invalid ID" })
      
        let data03 = await blogModel.findById(iDfromParams)
        console.log(data03)
        if (!data03)
        res.status(400).send({ status: false, msg: "Invalid ID" })
        if (data03.isDeleted) {
        return  res.status(404).send({ status: false, msg: "blog document doesn't exist" })
        }
        let data04 = await blogModel.updateOne((data03), { $set: { isDeleted: true } })
        return  res.status(200).send({ status: true, data: data04 })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlogsQuery = async function (req, res) {
    try {
        let data0 = req.query
        const data1 = await blogModel.findOne(data0)
        if (data1.isDeleted) {
            return res.status(404).send({ status: false, msg: "blog document doesn't exist" })
        }
        const data2 = await blogModel.updateOne(data1, { $set: { isDeleted: true } })
        res.status(200).send({ status: true, data: data2 })

    } catch (error) {
        res.status(500).send({ mas: error.message })
    }
}

module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlogsParam=deleteBlogsParam;
module.exports.deleteBlogsQuery=deleteBlogsQuery;