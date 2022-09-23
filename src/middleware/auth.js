// const jwt = require('jsonwebtoken')
// const bookModel = require('../models/booksModel')
// const mongoose = require('mongoose')

// //===================================== Authentication ==========================================

// const authentication = function (req, res, next) {
//     try {
//         const token = req.headers['x-api-key']
       
//         if (!token) {
//             return res.status(401).send({ status: false, message: "Authentication token is required in header" })
//         }

//         jwt.verify(token, "booksManagement10", function (err, decoded) {
//             if (err && err.message == "jwt expired")
//                 return res.
//                     send({ status: false, msg: "token is expired,please login again" })
//             if (err) {
//                 return res.
//                     status(403).send({ status: false, message: "Invalid authentication token in header" })
//             }
//             else {
//                 req.token = decoded;
//                 next();
//             }
//         })

//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }


// //===================================== Authorization ==========================================

// const authorization = async function (req, res, next) {
//     try {
//         let token = req.headers['x-api-key']
//         let bookId = req.params.bookId
//         let bodyUserId = req.body.userId
//         if (!token) {
//             return res.status(401).send({ status: false, message: "Authentication token is required in header" })
//         }

//         if (bookId) {
//             if (!mongoose.isValidObjectId(bookId)) {
//                 return res.status(400).send({ status: false, msg: "Please Enter a valid bookID" })
//             }
//         }
//         if (bodyUserId) {
//             if (!mongoose.isValidObjectId(bodyUserId)) {
//                 return res.status(400).send({ status: false, msg: "Please Enter a valid UserID" })
//             }
//         }

//         let decodedToken = jwt.verify(token, "booksManagement10")

//         let findBook = await bookModel.findById(bookId);
//         if (findBook) {
//             if (decodedToken.userId != findBook.userId) {
//                 return res.status(403).send({ status: false, msg: "User is not authorized to access this data" });
//             }
//         }

//         if (bodyUserId) {
//             if (bodyUserId !== decodedToken.userId) {
//                 return res.status(403).send({ status: false, msg: "User is not authorized to access this data" });
//             }
//         }
//         next()
//     } catch (err) {
//         res.status(500).send({ status: false, message: err.message })
//     }
// }


// module.exports = {authentication,authorization}

const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const BookModel = require("../models/booksModel")

//==========================================authentication=================================================================

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token required" })

        // console.log(token)

        jwt.verify(token, "booksManagementGroup10", (error, decodedToken) => {
            if (error) {
                return res.
                status(401).
                send({ status: false, message: "token is invalid"} );

            }
            req["decodedToken"] = decodedToken    //this line for we can access this token outside the middleware

            // console.log(decodedToken )

            next()

        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


//========================================================Authorisation==============================================================

const authorisation = async function (req, res, next) {
    try {
        let bookId = req.params.bookId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter correct bookId" })
        }
        let userLoggedIn = req.decodedToken.userId
        let bookData = await BookModel.findById(bookId)
        if (bookData === null) return res.status(404).send({ status: false, message: "bookId does not exist" })
        if (bookData.userId != userLoggedIn) {
            return res.status(403).send({ status: false, message: "You are not authorised" })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, message: "Token Problem" })
    }
}

module.exports={authentication,authorisation}