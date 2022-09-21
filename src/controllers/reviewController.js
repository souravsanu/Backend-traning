const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const { isValidRating, date, isNotEmpty, isValidName } = require("../validators/validators")
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
        if (!date(reviewedAt))
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

module.exports={createReview}