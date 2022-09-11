const blogModel = require("../models/blogModel");
const jwt = require("jsonwebtoken");



const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            token = req.headers["x-Api-key"]
        } if (!token) return res.status(403).send({ status: false, msg: "Request Is Missing A Mandatory Header" })
        let decodedToken = jwt.verify(token, "room-no-11");
        if (!decodedToken) return res.status(403).send({ status: false, msg: "InValid Token" });
        req["x-api-key"] = decodedToken;
        next();
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}



// ===================================================================================
const Authorise = async function (req, res, next) {
    try {
        let token = req["x-api-key"];
        let iDfromParams = req.params.blogId

        if (!iDfromParams)
            return res.status(400).send({ status: false, msg: "pleas enter  ID" })
        if (iDfromParams.length > 24 || iDfromParams.length < 24)
            return res.status(400).send({ status: false, msg: "Invalid ID" })

        let data = await blogModel.findById(iDfromParams)

        if (!data)
            return res.status(400).send({ status: false, msg: "Invalid ID" })

        if (req.params.blogId) {

            let blog = await blogModel.findById(req.params.blogId).select({ authorId: 1 });



            if (blog.authorId != token.authorid)
                return res.status(401).send({ status: false, msg: "UnAuthorised" });
            next()
        };
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}


// ===================================================================================

const deleteAuthorised = async function (req, res, next) {
    try {
        let token = req["x-api-key"];
        let data = req.query
        console.log("category", data)

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "please enter data to update" })

        if (req.query.authorId) {
            if (req.query.authorId != token.authorid)
                return res.status(401).send({ status: false, msg: "UnAuthorised" });
        };
        if (Object.keys(data).length > 0) {

            const data1 = await blogModel.findOne(data)
            console.log("delete", data1)

            if (data1.authorId != token.authorid) return res.status(403).send({ status: false, msg: "UnAuthorised" })
            req.data = data1
            next()

        };


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}
module.exports = { Authorise, authenticate, deleteAuthorised }
