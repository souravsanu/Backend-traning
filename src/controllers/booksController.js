const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const { isNotEmpty, isValidName, isValidPhone, isValid, isValidEmail, isValidPass, isstreatValid, isValidPin, isValidISBN } = require("../validators/validators")



const createBook = async function (req, res) {
    try {
        let requestbody = req.body
        let requestQuery = req.que
        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                send({ status: false, msg: "Data is required in Request Body" })
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, msg: "Invalid entry in Request Query" })
        const { title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt } = requestbody
        if(Object.keys(requestbody).length>9)
            return res.
                status(400).
                    send({status:false,msg:"Invalid data in request body"})
        if (!title)
            return res.
                status(400).
                send({ status: false, msg: "title is required" })
        //*************************** title Validation *********************************
        if (!isValidName(title))
            return res.
                status(400).
                send({ status: false, msg: "title is invalid" })
        if (!excerpt)
            return res.
                status(400).
                send({ status: false, msg: "excert is required" })
        //************************************ excert Validation ***************************/
        if (!isValidName(excerpt))
            return res.
                status(400).
                send({ status: false, msg: "excert is invalid" })
        if (!userId)
            return res.
                status(400).
                send({ status: false, msg: "userId is required" })
        //************************************ UserId Validation  ****************************/
        if (!mongoose.Schema.Types.isValid(userId))
            return res.
                status(400).
                send({ status: false, msg: "userId is Invalid" })
        let data=await userModel.findById(userId)
        if(!data)
            return res.
                status(404).
                    send({status:false,msg:"user is not exist"})
        if (!ISBN)
            return res.
                status(400).
                send({ status: false, msg: "ISBN is required" })
        //*********************************** ISBN Validation  ***************************************/
        if (!isValidISBN())
            return res.send({ status: false, msg: "invalid ISBN , Plz check  the formate of Input" })
        if (!category)
            return res.
                status(400).
                send({ status: false, msg: "category is required" })
        //****************************************** Category Validation  *****************************/
        if (!isValidName(category))
            return res.
                status(400).
                send({ status: false, msg: "invalid category" })
        if (!subcategory)
            return res.
                status(400).
                send({ status: false, msg: "subcategory is required" })
        //************************************ Subcategory Validation ***************************************/
        if (!isValidName(subcategory))
            return res.
                status(400).
                send({ status: false, msg: "subcategory is invalid" })
        if (reviews) {
            if (typeof reviews != Number || reviews == null || reviews == " ")
                return res.
                    status(400).
                    send({ status: false.valueOf, msg: "invalid entry inside reviews" })
        }
        if (isDeleted) {
            if (isDeleted != "false")
                return res.
                    status(400).
                    send({ status: false, msg: "invalid entry inside Isdeleted" })
        }
        if (!releasedAt)
            return res.
                status(400).
                send({ status: false, msg: "Released At is required" })
        //*************************** releasedAt Validation  ********************************/
        if (!Date.parse(releasedAt))
            return res.send({ status: false, msg: "invalid value inside releasedAt" })
        //********************************** Title match checking ***************************/
        let titledata = await bookModel.findOne({ title: title })
        if (titledata)
            return res.
                status(400).
                send({ status: false, msg: "This title is Allready Prasent" })
        //********************************************** ISBN match checking **********************/
        let isbndata = await bookModel.findOne({ ISBN: ISBN })
        if (isbndata)
            return res.
                status(400).
                send({ status: false, msg: "ISBN data is also exist" })
        let book = {
            title: title.trim(),
            excerpt: excerpt.trim(),
            userId: userId.trim(),
            ISBN: ISBN.trim(),
            category: category.trim(),
            subcategory: subcategory.trim(),
            reviews: reviews.trim(),
            isDeleted: isDeleted.trim(),
            releasedAt: releasedAt.trim()
        }
        let result = await bookModel.create(book)
        res.
            status(201).
            send({ status: true, msg: "Books Successfully Created", data: result })
    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}