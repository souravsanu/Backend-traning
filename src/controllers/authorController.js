const authorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if(!data)
        return res.status(400).send({ status: false, msg:  "enter data"  })
        
        let { fname, lname, title, email, password } = data
        if (!fname) { return res.status(400).send({status:false, msg: "fname is required" }) }
        if (!lname) { return res.status(400).send({status:false, msg: "lname is required" }) }
        if (!title) { return res.status(400).send({ status:false,msg: "title is required" }) }
        if (!email) { return res.status(400).send({ status:false,msg: "email is required" }) }
        if (!password) { return res.status(400).send({status:false, msg: "password is required" }) }
       
        if (typeof fname !== "string" || fname[0]==" " || fname[fname.length-1] ==" ") {
            return res.status(400).send({ status: false, msg: "please enetr a valid firstname" })
        }
        if (typeof lname !== "string" || lname[0]==" " || lname[lname.length-1] ==" ") {
            return res.status(400).send({ status: false, msg: "please enetr a valid lastname" })
        }
        if (title !== "Mr" && title !== "Mrs" && title !== "Miss") {
            return res.status(400).send({ status: false, msg: "please enter  Mr or Mrs or Miss" })
        }
        let findEmail = await authorModel.findOne({ email: email })

        if (findEmail) {
            return res.status(400).send({status:false, msg: "email id already exsits" })
        }
         fname.trim()

        let authorCreated = await authorModel.create(data)
        res.status(201).send({status: true, data: authorCreated })
    } catch (error) {
        res.status(500).send({status: false, msg: error.message })
    }

}

module.exports.createAuthor = createAuthor





// const creatAuthor = async function(req, res) {
//     try {
//         let data = req.body
//         let { fname, lname, title, email, password } = data
//         if (!fname) { return res.status(400).send({ msg: "fname is required" }) }
//         if (!lname) { return res.status(400).send({ msg: "lname is required" }) }
//         if (!title) { return res.status(400).send({ msg: "title is required" }) }
//         if (!email) { return res.status(400).send({ msg: "email is required" }) }
//         if (!password) { return res.status(400).send({ msg: "password is required" }) }
//         //validation of corect insertionn 
//         if (typeof fname !== "string" && fname.trim().length === 0) {
//             return res.status(400).send({ status: false, msg: "please enetr a valid firstname" })
//         }
//         if (typeof lname !== "string" && fname.trim().length === 0) {
//             return res.status(400).send({ status: false, msg: "please enetr a valid lastname" })
//         }
//         if (title !== "Mr" && title !== "Mrs" && title !== "Miss") {
//             return res.status(400).send({ status: false, msg: "please enter  Mr or Mrs or Miss" })
//         }
//         let findEmail = await authorModel.findOne({ email: email })

//         if (findEmail) {
//             return res.status(400).send({ msg: "email id already exsits" })
//         }
//         let validEmail = function(mail) {
//             return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
//         }
//         if (!validEmail(email)) return res.status(400).send({ status: false, msg: "email is not valid" })
//         let authorCreated = await authorModel.create(author)
//         return res.status(201).send(authorCreated)
//     } catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }




// let checkEmail = data.email
//         let email = await authorModel.findOne({ email: checkEmail })
//         if (email) { return res.status(400).send({ status: false, msg: "Email is alredy exists" }) }