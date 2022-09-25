const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const BookModel = require("../models/booksModel")

//==========================================authentication=================================================================

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.
                status(400).
                    send({ status: false, message: "Token required" })

    // Token verification and expiry checking
        
        jwt.verify(token, "booksManagementGroup10", (error, decodedToken) => {
            if (error) {
                return res.
                status(401).
                send({ status: false, message: "token is invalid"} );

            }
            //this line for we can access this token outside the middleware
            req["decodedToken"] = decodedToken    

            next()

        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


//========================================================Authorisation==============================================================

const authorization = async function (req, res, next) {
    try {
       const bookId = req.params.bookId;
       const  loggedInUserId = req.decodedToken.userId;
       const data=req.body;
       if(bookId){
        if (!mongoose.Types.ObjectId.isValid(bookId)) 
              return res.
                status(400).
                    send({ status: false, message: "Please enter correct bookId" })
              let bookData = await BookModel.findById(bookId)

              if (!bookData)
                return res.
                    status(404).
                        send({ status: false, message: "bookId does not exist" })
             
        // Authorization checking
              
            if(bookData.userId!=loggedInUserId)
                return res.
                    status(403).
                        send({ status: false, message: "You are not authorised" })
       }else{
           if (!data.userId)
               return res.
                   status(400).
                   send({ status: false, message: "userId is required" });
           if (!mongoose.isValidObjectId(data.userId))
               return res.
                   status(400).
                   send({ status: flase, message: "userId is Invalid" });

        
        if (data.userId != loggedInUserId) {
            return res.status(403).send({ status: false, message: "You are not authorised" })
        }
    }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, message: "Token Problem" })
    }
}

module.exports={authentication,authorization}