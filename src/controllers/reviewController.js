//================================= Imported all the modules here ======================================
const mongoose = require('mongoose');
const bookModel = require("../models/booksModel")
const { isValidString,isValidRating,isValid, isValidName } = require("../validators/validators")
const reviewModel = require("../models/reviewModel")

//================================= CREATE REVIEW post/books/:bookId/review ======================================


const createReview = async function (req, res) {
    try {
        let requestbody = req.body
        let requestQuery = req.query
        let BookId = req.params.bookId
        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                send({ status: false, message: "data is required inside requestbody" })
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, message: "invalid data entry inside requestQuery" });
                
        if (!mongoose.isValidObjectId(BookId))
            return res.
                status(400).
                send({ status: false, message: "Id is not valid" })
        let data = await bookModel.find({ _id: BookId, isDeleted: false })
        if (!data)
            return res.
                status(404).
                send({ status: false, message: "Book is not present" })
        
        // Destructreing
        
        const { reviewedBy, rating, review } = requestbody
        if(reviewedBy){
        if (!reviewedBy)
            return res.
                status(400).
                send({ status: false, message: "reviewedby is required" })
       
                
        if (!isValidName(reviewedBy))
            return res.
                status(400).
                send({ status: false, message: "invalid reviewedby" })
                requestbody.reviewedBy=reviewedBy.trim().toLowerCase()
        }
        
        if (!rating)
            return res.
                status(400).
                send({ status: false, message: "rating is required" })

        if (!(typeof rating != Number || rating == null || rating == " "))
            return res.
                status(400).
                send({ status: false, message: "invalid entry inside rating" })
        if (!isValidRating(rating))

            return res.
                status(400).
                send({ status: false, message: "its can contains min 1 to max 5" })
        if (!review)
            return res.
                status(400).
                send({ status: false, message: "review is required" })
        if (!isValid(review))
            return res.
                status(400).
                send({ status: false, message: "review is empty" })
        if (!isValidString(review))
            return res.
                status(400).
                send({ status: false, message: "review is not valid" })
           

        let obj = {

            bookId: BookId,
            reviewedBy: reviewedBy,
            reviewedAt: Date.now(),
            rating: rating,
            review: review
        }
        let b = await bookModel.findByIdAndUpdate({ _id: BookId }, { $inc: { reviews: 1 } })
        let result = await reviewModel.create(obj)

        res.
            status(201).
            send({ status: true, message: "review is successfully created", data: {reviewsData:result} })

    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}


//================================= UPDATE REVIEWs put/books/:bookId/review/:reviewId ======================================

const updateReviews=async function(req,res){
    try{
        const bookParams=req.params.bookId;
        const reviewParams=req.params.reviewId;
        const reqbody=req.body;
    
    //destructuring
    
        const{review,rating,reviewedBy}=reqbody 

// ****************** bookId validation ***********************  
    
        if(!bookParams)
            return res.
                status(400).
                    send({ status: false,message:"bookId is not present"});
        if(!mongoose.isValidObjectId(bookParams))
            return res.
                status(400).
                    send({ status: false,message:"bookId is not valid"});
// find book by bookId
        const findBook=await bookModel.findOne({_id:bookParams,isDeleted:false});
        if(!findBook)
            return res.
                status(404).
                    send({ status: false,message:"No Book found for given bookId"});

// ****************** reviewId validation ***********************  
    
        if(!reviewParams)
            return res.
                status(400).
                    send({ status: false,message:"reviewId is not present"})
        if(!mongoose.isValidObjectId(reviewParams))
            return res.
                status(400).
                    send({ status: false,message:"reviewId is not valid"});
// find review by reviewId

        const findReview=await reviewModel.findOne({_id:reviewParams,isDeleted:false});
        if(!findReview)
            return res.
                status(400).
                    send({ status: false,message:"reviewId is not present in the reviewModel"});
        if(findReview.bookId!=bookParams)
            return res.
                status(400).
                    send({status:false,message:"There is no review present for this book"})

        if(!Object.keys(reqbody))
            return res.
                status(400).
                    send({status:false,message:"Please provide data into the request body"});

// ****************** review validation ***********************     
        
        if (Object.keys(reqbody).some(a => a == "review")) {
            if (!review)
                return res.
                    status(400).
                        send({ status: false, message: "review is required" });
            if (!isValid(review))
                return res.
                    status(400).
                        send({  status: false,message: "review is empty" })
            if (!isValidString(review))
                return res.
                    status(400).
                        send({ status: false, message: "Type of review must be string" });
     
    }
// ****************** Rating validation ***********************  
        
        if (Object.keys(reqbody).some(a => a == "rating")) {
            if (!rating)
                return res.
                    status(400).
                        send({ status: false, message: "rating is required" });   
            if (!isValidRating(rating))
                return res.
                    status(400).
                        send({ status: false, message: "Type of rating must be string" })
        
    }
// ****************** reviewedBy validation ***********************  
    
        if (Object.keys(reqbody).some(a => a == "reviewedBy")) {
            if (!reviewedBy)
                return res.
                    status(400).
                        send({ status: false, message: "reviewedBy is required" });
            if (!isValid(reviewedBy))
                return res.
                    status(400).
                        send({ status: false, message: "reviewedBy is empty" })
            if (!isValidName(reviewedBy))
                return res.
                    status(400).
                        send({ status: false, message: "Type of reviewedBy must be string" });

    }

// upadte reviewModel details
        const updateReviewDetails = await reviewModel.
            findOneAndUpdate({ _id: reviewParams },
            {$set:{ review: review, rating: rating, reviewedBy: reviewedBy }},
            { new: true }).select({createdAt:0,updatedAt:0,__v:0})
      
// upadte book
        let upadtedBook = findBook.toObject();
            upadtedBook['reviewsData'] = [updateReviewDetails];
            return res.
                status(200).
                    send({ status: true, message: "Successfully updated the review of the book.", data: upadtedBook })


    }
    catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }

}

const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        
        if(!bookId)
            return res.
                status(400).send({status:false, message:"bookId is not present"});

        if (!mongoose.isValidObjectId(bookId)) {
            return res.
                status(400).
                    send({ status: false, message: "Please enter a valid bookId in params" })
        }
        

        if(!reviewId)
            return res.
                status(400).
                    send({status:false, message:"reviewId is not present"});
        
        if (!mongoose.isValidObjectId(reviewId)) {
            return res.
                status(400).
                    send({ status: false, message: "Please enter a valid reviewId in params" })
        }

        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
       
        if (!book) {
            return res.
                status(404).
                    send({ status: false, message: "Book not exist" })
        }

        let review = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
      
        if (!review) {
            return res.
                status(404).
                    send({ status: false, message: "Review not exist" })
        }

      const reviewUpdate=  await reviewModel.findByIdAndUpdate({ _id: reviewId, bookId: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
      const bookUpdate=  await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })
        return res.
            status(200).
                send({ status: true, message: "Review Deleted Successfully" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports={createReview,updateReviews,deleteReview}