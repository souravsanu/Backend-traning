//================================= Imported all the modules here ======================================
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const {isValidString,  isValidDate, isNotEmpty, isValidName, isValidISBN } = require("../validators/validators");
const reviewModel = require('../models/reviewModel');


//================================= CREATE BOOK post/books ======================================
const createBook = async function (req, res) {
    try {
        let requestbody = req.body
        let requestQuery = req.query
        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                send({ status: false, msg: "Data is required in Request Body" })
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, msg: "Invalid entry in Request Query" })
        const { title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt } = requestbody
        if (Object.keys(requestbody).length > 9)
            return res.
                status(400).
                send({ status: false, msg: "Invalid data in request body" })

 // ****************** Title validation ***********************                 
        if (!title)
            return res.
                status(400).
                send({ status: false, msg: "title is required" })
        if (!isNotEmpty(title))
            return res.
                status(400).
                send({ status: false, msg: "title is empty" })
       
        if (!isValidString(title))
            return res.
                status(400).
                send({ status: false, msg: "title is invalid" })

        let duplicateTitle = await bookModel.findOne({ title: title })
        if ( duplicateTitle)
            return res.
                status(400).
                send({ status: false, msg: "This title is Allready Prasent" })

// ****************** Excerpt validation ***********************                  
        if (!excerpt)
            return res.
                status(400).
                send({ status: false, msg: "exceprt is required" })
        if (!isNotEmpty(excerpt))
            return res.
                status(400).
                send({ status: false, msg: "excerpt is empty" })
        
        if (!isValidName(excerpt))
            return res.
                status(400).
                send({ status: false, msg: "excert is invalid" })

// ****************** userId validation ***********************                  
        if (!userId)
            return res.
                status(400).
                send({ status: false, msg: "userId is required" })
       
        if (!mongoose.isValidObjectId(userId))
            return res.
                status(400).
                send({ status: false, msg: "userId is Invalid" })
        let data = await userModel.findById(userId)
        if (!data)
            return res.
                status(404).
                send({ status: false, msg: "user is not exist" })

// ****************** ISBN validation ***********************                  
        if (!ISBN)
            return res.
                status(400).
                send({ status: false, msg: "ISBN is required" })

        if (!isValidISBN(ISBN))
            return res.send({ status: false, msg: "invalid ISBN , Plz check  the formate of Input" })
        if (!category)
            return res.
                status(400).
                send({ status: false, msg: "category is required" })
        let duplicateISBN = await bookModel.findOne({ ISBN: ISBN })
        if (duplicateISBN)
            return res.
                status(400).
                send({ status: false, msg: "ISBN data is also exist" })

// ****************** Category validation ***********************  
        if (!isNotEmpty(category))
            return res.
                status(400).
                send({ status: false, msg: "empty category" })
        if (!isValidName(category))
            return res.
                status(400).
                send({ status: false, msg: "invalid category" })
 // ****************** Subcategory validation ***********************                 
        if (!subcategory)
            return res.
                status(400).
                send({ status: false, msg: "subcategory is required" })
        if (!isNotEmpty(subcategory))
            return res.
                status(400).
                send({ status: false, msg: "invalid subcategory" })
    
        if (!isValidName(subcategory))
            return res.
                status(400).
                send({ status: false, msg: "subcategory is invalid" })

// ****************** Reviews validation ***********************  
        if (reviews) {
            if (typeof reviews != Number || reviews == null || reviews == " ")
                return res.
                    status(400).
                    send({ status: false.valueOf, msg: "invalid entry inside reviews" })
        }
// ****************** isDeleted validation ***********************         
        if (isDeleted) {
            if (isDeleted != "false")
                return res.
                    status(400).
                    send({ status: false, msg: "invalid entry inside Isdeleted" })
        }

// ****************** IReleasedAt validation ***********************          
        if (!releasedAt)
            return res.
                status(400).
                send({ status: false, msg: "Released At is required" })
      
        if (!isValidDate(releasedAt))
            return res.
                status(400).
                send({ status: false, msg: "It must be present in YYYY-MM-DD formate" })

// ****************** book creation ***********************                  
        let book = {
            title: title.trim(),
            excerpt: excerpt.trim(),
            userId: userId.trim(),
            ISBN: ISBN.trim(),
            category: category.trim().toLowerCase(),
            subcategory: subcategory.trim().toLowerCase(),
            reviews: reviews,
            isDeleted: isDeleted,
            releasedAt: releasedAt
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

//================================= Get book by query  get/books ======================================
const getBooksByQuery = async function (req, res) {
    try {

        const queryParams = req.query;
        const { userId, category, subcategory } = queryParams; //destrucuring
        if (Object.keys(queryParams).length > 3)
            return res.send({ msg: "you have enter so many  query params" })

// ****************** userId validation ***********************            
        if (Object.keys(queryParams).some(a => a == "userId")) {
            if (!userId) return res.status(400).send({ status: false, msg: "provide userId" })
            if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, msg: "userId is not valid" });
        }

// ****************** category validation ***********************  
        if (Object.keys(queryParams).some(a => a == "category")) {
            if (!category) return res.status(400).send({ status: false, msg: "provide category" })
            if (!isValidName(category)) return res.status(400).send({ status: false, msg: "please provide catecory in string format " });
            queryParams.category = category.toLowerCase();
        }
// ****************** Subcategory validation ***********************          
        if (Object.keys(queryParams).some(a => a == "subcategory")) {
            if (!subcategory) return res.status(400).send({ status: false, msg: "provide subcategory" })
            if (!isValidName(subcategory)) return res.status(400).send({ status: false, msg: "please provide subcatecory in string format " });

        }
// ****************** find books ***********************  
        const books = await bookModel.find({ isDeleted: false, ...queryParams }).select({ title: 1, _id: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
        books.sort((a, b) => a.title.localeCompare(b.title))
        return res.status(200).send({ status: true, message: "Books list", data: books })

    }
    catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}


//================================= Get book by bookId  post/books:bookId ======================================
const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let requestbody = req.body
        if (Object.keys(requestbody).length > 0)
            return res.
                status(400).
                send({ status: false, msg: "invalid data entry inside requestbody" })

// ****************** bookId validation ***********************  
if(!bookId) return res.send({status:false,msg:"please provide bookId"})
        if (!mongoose.isValidObjectId(bookId))
            return res.
                status(400).
                send({ status: false, msg: "invalid id" })

// find book by bookId
        let books = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!books)
            return res.
                status(404).
                send({ status: false, msg: "Book is not present" })
// find review by bookId
        let review = await reviewModel.find({ bookId: bookId })
        let obj = {
            "_id": books._id,
            "title": books.title,
            "excerpt": books.excerpt,
            "userId": books.userId,
            "category": books.category,
            "subcategory": books.subcategory,
            "isDeleted": books.isDeleted,
            "reviews": books.reviews,
            "releasedAt": books.releasedAt,
            "createdAt": books.createdAt,
            "updatedAt": books.updatedAt,
            reviewsData: review
        }
        res.
            status(200).
            send({ status: true, msg: "Book List", data: obj })
    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}

//================================= exporting all the functions here ======================================
module.exports = { createBook, getBooksByQuery, getBooksById };