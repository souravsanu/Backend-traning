const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"];
        if (!token) token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status:false,msg: "token must be present in the request header" })
        let decodedToken = jwt.verify(token, 'room-no-11')
        req["token"] = decodedToken._id;
        next()

    }
    catch (error) { return res.status(500).send({status:false,msg: error.message }) }
 
}

const authorise = function (req, res, next) {
   try{ let author = req.params._id
    let authorLoggedIn = req["token"];
    if (author != authorLoggedIn) return res.status(403).send({ msg: 'User logged is not allowed to modify the requested  data' })
    next()
   }
   catch (error) { return res.status(500).send({status:false,msg: error.message }) }
}
module.exports = {authenticate,authorise}
