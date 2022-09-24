//================================= Imported all the modules here ======================================
const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const {isValid,isValidString,isValidBody,  isValidDate, isValidName, isValidISBN } = require("../validators/validators");
const reviewModel = require('../models/reviewModel');


//================================= CREATE BOOK post/books ======================================

const createBook = async function (req, res) {
    try {
        let requestbody = req.body
        let requestQuery = req.query
        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                send({ status: false, message: "Data is required in Request Body" })
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, message: "Invalid entry in Request Query" })
    // Destructering

        const { title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt } = requestbody
        
        if (Object.keys(requestbody).length > 9)
            return res.
                status(400).
                send({ status: false, message: "Invalid data in request body" })

 // ****************** Title validation ***********************                 
        
        if (!title)
            return res.
                status(400).
                send({ status: false, message: "title is required" })
       if(!isValid(title))
       return res.
        status(400).
          send({status:false,message:"Title is empty"})
       
        if (!isValidString(title))
            return res.
                status(400).
                send({ status: false, message: "title is invalid" })

        let duplicateTitle = await bookModel.findOne({ title: title })
        if ( duplicateTitle)
            return res.
                status(400).
                send({ status: false, message: "This title is Allready Prasent" })

// ****************** Excerpt validation ***********************                  
        
        if (!excerpt)
            return res.
                status(400).
                send({ status: false, message: "exceprt is required" })
        if (!isValid(excerpt))
            return res.
                status(400).
                send({ status: false, message: "excerpt is empty" })
        
        if (!isValidName(excerpt))
            return res.
                status(400).
                send({ status: false, message: "excert is invalid" })

// ****************** userId validation ***********************                  
        
        if (!userId)
            return res.
                status(400).
                send({ status: false, message: "userId is required" })
       
        if (!mongoose.isValidObjectId(userId))
            return res.
                status(400).
                send({ status: false, message: "userId is Invalid" })
               
        let data = await userModel.findById({_id:userId})
        
        if (!data)
            return res.
                status(404).
                send({ status: false, message: "user is not exist" })

// ****************** ISBN validation ***********************                  
        
        if (!ISBN)
            return res.
                status(400).
                send({ status: false, message: "ISBN is required" })

        if (!isValidISBN(ISBN))
          return res.
            status(400).
              send({ status: false, message: "invalid ISBN ,please give ISBN in this [xxx(6-9)-xxxxxxxxxx] format" })
        let duplicateISBN = await bookModel.findOne({ ISBN: ISBN })
        if (duplicateISBN)
            return res.
                status(400).
                send({ status: false, message: "ISBN data is also exist" })

// ****************** Category validation *********************** 
          
        if (!category)
            return res.
                status(400).
                send({ status: false, message: "category is required" })
          
        if (!(isValid(category) ))
            return res.
                status(400).
                send({ status: false, message: " category is Invalid or empty" })
        if (!isValidName(category))
            return res.
                status(400).
                send({ status: false, message: "invalid category" })
                
 // ****************** Subcategory validation ***********************                 
        
        if (!subcategory)
            return res.
                status(400).
                send({ status: false, message: "subcategory is required" })
        if (!isValid(subcategory))
            return res.
                status(400).
                send({ status: false, message: "subcategory is Invalid or empty" })
    
        if (!isValidName(subcategory))
            return res.
                status(400).
                send({ status: false, message: "subcategory is invalid" })

// ****************** Reviews validation ***********************  
        
        if (reviews) {
            if (typeof reviews != Number || reviews == null || reviews == " ")
                return res.
                    status(400).
                    send({ status: false, message: "invalid entry inside reviews" })
        }
// ****************** isDeleted validation ***********************         
        
        if (isDeleted) {
            if (isDeleted != "false")
                return res.
                    status(400).
                    send({ status: false, message: "invalid entry inside Isdeleted" })
        }

// ****************** ReleasedAt validation ***********************          
        
        if (!releasedAt)
            return res.
                status(400).
                send({ status: false, message: "ReleasedAt is required" })
      
        if (!isValidDate(releasedAt))
            return res.
                status(400).
                send({ status: false, message: " Date is invalid" })

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
            send({ status: true, message: "Books Successfully Created", data: result })
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
        if (Object.keys(queryParams).length > 3)
            return res.
              status(400).
                send({status:false, message: "you have enter so many  query params" })
        
        //destrucuring
        const { userId, category, subcategory } = queryParams; 

        // ****************** userId validation ***********************            
        
        if (Object.keys(queryParams).some(a => a == "userId")) {
            if (!userId)
              return res.
                status(400).
                  send({ status: false, message: "provide userId" })
            if (!mongoose.Types.ObjectId.isValid(userId))
              return res.
                status(400).
                  send({ status: false, message: "userId is not valid" });
        }

// ****************** category validation ***********************  
        
        if (Object.keys(queryParams).some(a => a == "category")) {
            if (!category)
              return res.
                status(400).
                  send({ status: false, message: "provide category" })
            if (!isValidName(category))
              return res.
                status(400).
                  send({ status: false, message: "please provide catecory in string format " });
            queryParams.category = category.toLowerCase();
        }

        // ****************** Subcategory validation ***********************          
        
        if (Object.keys(queryParams).some(a => a == "subcategory")) {
            if (!subcategory)
              return res.
                status(400).
                  send({ status: false, message: "provide subcategory" })
            if (!isValidName(subcategory))
              return res.
                status(400).
                  send({ status: false, message: "please provide subcatecory in string format " });

        }

        // ****************** find books ***********************  
        
        const books = await bookModel.find({ isDeleted: false, ...queryParams }).select({ title: 1, _id: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
        books.sort((a, b) => a.title.localeCompare(b.title))
        return res.
          status(200).
            send({ status: true, message: "Books list", data: books })

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
                send({ status: false, message: "invalid data entry inside requestbody" })

// ****************** bookId validation ***********************  
        if(!bookId)
          return res.
            status(400).
              send({status:false,message:"please provide bookId"})
          if (!mongoose.isValidObjectId(bookId))
            return res.
                status(400).
                send({ status: false, message: "invalid id" })

// find book by bookId
        let books = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!books)
            return res.
                status(404).
                send({ status: false, message: "Book is not present" })
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
            send({ status: true, message: "Book List", data: obj })
    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}


const updateBook = async function (req, res) {
    try {
      const book_id = req.params.bookId;
      const data = req.body;
      
      //Destructering
      
      const{title,ISBN, excerpt,releasedAt}=data
      if (!isValidBody(data))
        return res
          .status(400)
          .send({status:false,message: " Please enter the Book Details for Updation"});

    if(Object.keys(data).some(a=>a==="title")){
          if(!isValid(title))
          return res
          .status(400)
          .send({ status: false, message: "Title value is Empty or invalid" });
      if (!isValidString(title))
        return res
          .status(400)
          .send({ status: false, message: "Title is Invalid or empty" });
          const checkTitle = await bookModel.findOne({
            title: title,
            isDeleted: false,
          });
        if (checkTitle)
          return res.status(400).send({
            status: false,
            message: `${title} is already exists.Please add a new title.`,
          });
      }
  if(Object.keys(data).some(a=>a==="excerpt")){
      if (!isValid(excerpt))
          return res
              .status(400)
              .send({ status: false, message: "excerpt value is Empty or invalid" });
      if (!isValidString(excerpt))
        return res
          .status(400)
          .send({ status: false, message: "Excerpt value is Invalid " });
  }
  if(Object.keys(data).some(a=>a==="ISBN")){
   
        if (!isValidISBN(ISBN)) {
          return res.status(400).send({
            status: false,
            message: "Please provide a valid ISBN And it should be 10 digit)",
          });
        }
        const NewIsBN = await bookModel.findOne({
          ISBN: ISBN,
          isDeleted: false,
        });
        if (NewIsBN)
          return res.status(400).send({
            status: false,
            message: `${ISBN} ISBN is already registered`,
          });
      }
  
      if(Object.keys(data).some(a=>a==="releasedAt")){
        
      if (!isValid(releasedAt))
        return res
          .status(400)
          .send({ status: false, message: "RealeasedAt is empty" });
       
        if (!isValidDate(releasedAt)) {
          return res.status(400).send({
            status: false,
            message: "PLS provide a valid Date(YYYY-MM-DD)",
          });
        }
      }
  
      const updateBookData = await bookModel.findOneAndUpdate(
        { _id: book_id, isDeleted: false },
        {
          title: title,
          excerpt: excerpt,
          releasedAt: releasedAt,
          ISBN: ISBN,
        },
        { new: true }
      );
  
      res.status(200).send({
        status: true,
        message: "Successfully updated book details.",
        data: updateBookData,
      });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };

  //**********DELETE BOOKBY ID****** */
  
  const deleteBook = async function (req, res) {
    try {
      const book_id = req.params.bookId
      if(!book_id)
        return res.
          status(400).
            send({status:false,message:"bookId is required"});
      if(!mongoose.isValidObjectId(book_id))
        return res.
          status(400).
            send({status:false,message:"BookId is not valid"})
   
      let checkBookData = await bookModel.findOne({
        _id: book_id,
        isDeleted: false,
      });
      if (!checkBookData)
        return res
          .status(404)
          .send({ status: false, message: "Book Not Found" });
      const deletebookData = await bookModel.findOneAndUpdate(
        { _id: book_id, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
  
      res.status(200).send({
        status: true,
        message: " successfullly book deleted.",
        data: deletebookData,
      });
    } catch (err) {
      res.status(500).send({ status: false, Error: err.message });
    }
  };

//================================= exporting all the functions here ======================================

module.exports = { createBook, getBooksByQuery, getBooksById,updateBook ,deleteBook};