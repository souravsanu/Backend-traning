const collageModel = require('../models/collageModel')
let regexValidation = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
let regexlogoLink = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const createcollage = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "plzz give some data" })

        const { name, fullName, logoLink } = data

        if (!name) return res.status(400).send({ status: false, msg: "Enter collage name" })
        if (!fullName) return res.status(400).send({ status: false, msg: "Enter collage FullName " })
        if (!logoLink) return res.status(400).send({ status: false, msg: "Enter collage logoLink" })

        if (!name.match(regexValidation)) return res.status(400).send({ status: false, msg: "please enetr a valid name" })
        if (!fullName.match(regexValidation)) return res.status(400).send({ status: false, msg: "please enetr a valid fullName" })
        if (!logoLink.match(regexlogoLink)) return res.status(400).send({ status: false, msg: "please enetr a valid logoLink" })

        let findname = await collageModel.findOne({ name: name })
        if (findname) return res.status(400).send({ status: false, msg: "name already exsits" })

        let collage = await collageModel.create(data)
        res.status(201).send({ status: true, Data: collage })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports = { createcollage }