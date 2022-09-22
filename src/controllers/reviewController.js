const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const { isValidRating, isValidDate, isNotEmpty, isValidName } = require("../validators/validators")
const reviewModel = require("../models/reviewModel")

const createReview = async function (req, res) {
    try {
        let requestbody = req.body
        let requestQuery = req.query
        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                send({ status: false, msg: "data is required inside requestbody" })
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, msg: "invalid data entry inside requestQuery" })
        const { bookId, reviewedBy, reviewedAt, rating, review, isDeleted } = requestbody
        if (!bookId)
            return res.
                status(400).
                send({ status: false, msg: "bookid is required" })
        if (!mongoose.isValidObjectId(bookId))
            return res.
                status(400).
                send({ status: false, msg: "invalid bookId" })
        if (!reviewedBy)
            return res.
                status(400).
                send({ status: false, msg: "reviewedby is required" })
        if (!isNotEmpty(reviewedBy))
            return res.
                status(400).
                send({ status: false, msg: "reviewdby is empty" })
        if (!isValidName(reviewedBy))
            return res.
                status(400).
                send({ status: false, msg: "invalid reviewedby" })
        if (!reviewedAt)
            return res.
                status(400).
                send({ status: false, msg: "reviewedAt is required" })
        if (!isValidDate(reviewedAt))
            return res.
                status(400).
                send({ status: false, msg: "it contain only YYYY-MM-DD formate" })
        if (!rating)
            return res.
                status(400).
                send({ status: false, msg: "rating is required" })

        if (!(typeof rating != Number || rating == null || rating == " "))
            return res.
                status(400).
                send({ status: false, msg: "invalid entry inside rating" })
        if (!isValidRating(rating))
        
            return res.
                status(400).
                send({ status: false, msg: "its can contains min 1 to max 5" })
                

        if (review) {
            if (!isNotEmpty(review))
                return res.
                    status(400).
                    send({ status: false, msg: "review is empty" })
            if (!isValidName(review))
                return res.
                    status(400).
                    send({ status: false, msg: "review is invalid" })
                    review=review.trim().toLowerCase()
        }
        if (isDeleted) {
            if (isDeleted != "false")
                return res.
                    status(400).
                    send({ status: false, msg: "invalid entry inside isDeleted" })
        }
        let obj = {
            bookId:bookId,
            reviewedBy: reviewedBy.trim().toLowerCase(),
            reviewedAt: reviewedAt,
            rating: rating,
            review: review,
            isDeleted: isDeleted
        }
        let result = await reviewModel.create(obj)
        res.
            status(201).
            send({ status: true, msg: "review is successfully created", data: result })

    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}
const updateReviews=async function(req,res){
    try{
    const bookParams=req.params.bookId;
    const reviewParams=req.params.reviewId;
    const reqbody=req.body;
    const{review,rating,reviewedBy}=reqbody

    if(!bookParams) return res.send({msg:"bookId is not present"});
    if(!mongoose.isValidObjectId(bookParams)) return res.send({msg:"bookId is not valid"});

    if(!reviewParams)return res.send({msg:"reviewId is not present"})
    if(!mongoose.isValidObjectId(reviewParams)) return res.send({msg:"reviewId is not valid"});

    if(!Object.keys(reqbody)) return res.send({msg:"Please provide data into the request body"});
    
    if (Object.keys(reqbody).some(a => a == "review")) {
        if (!review) return res.status(400).send({ status: false, msg: "review is required" });
        if (!isNotEmpty(review)) return res.status(400).send({ msg: "review is empty" })
        if (!isValidName(review)) return res.status(400).send({ msg: "Type of review must be string" });
     
    }

    if (Object.keys(reqbody).some(a => a == "rating")) {
        if (!rating) return res.status(400).send({ status: false, msg: "rating is required" });   
        if (!isValidRating(rating)) return res.status(400).send({ msg: "Type of rating must be string" })
        
    }
    if (Object.keys(reqbody).some(a => a == "reviewedBy")) {
        if (!reviewedBy) return res.status(400).send({ status: false, msg: "reviewedBy is required" });
        if (!isNotEmpty(reviewedBy)) return res.status(400).send({ msg: "reviewedBy is empty" })
        if (!isValidName(reviewedBy)) return res.status(400).send({ msg: "Type of reviewedBy must be string" });

    }
    const findBook=await bookModel.findOne({_id:bookParams,isDeleted:false});
    if(!findBook) return res.send({msg:"Book is not found"});

    const findReview=await reviewModel.findOne({_id:reviewParams,isDeleted:false});
    if(!findReview) return res.send("review is not present for this book");


    if(findReview.bookId!=bookParams) return res.send({msg:"There is no review for this book"});


 const updateReviewDetails = await reviewModel.
 findOneAndUpdate({ _id: reviewParams },
     {$set:{ review: review, rating: rating, reviewedBy: reviewedBy }},
      { new: true }).select({createdAt:0,updatedAt:0,__v:0})

      let upadtedBook = findBook.toObject();
      upadtedBook['reviewsData'] = [updateReviewDetails];
      return res.status(200).send({ status: true, message: "Successfully updated the review of the book.", data: upadtedBook })


    }
    catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }

}

module.exports={createReview,updateReviews}