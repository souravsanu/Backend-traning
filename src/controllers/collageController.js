const collageModel = require('../models/collageModel')
const Validater = require('../validater/validater')

const createcollage = async function (req, res) {
    try {
        let data = req.body
        if(!data) return res.status(400).send({ status: false, msg:"plzz give some data"})
        const {name,fullName,logoLink} = data

        if(!isValid(name)) return res.status(400).send({ status: false, msg:"Enter collage name"})

        if(!isValid(fullName)) return res.status(400).send({ status: false, msg:"Enter collage FullName "})

        if(!isValid(logoLink)) return res.status(400).send({ status: false, msg:"Enter collage logoLink"})

        let findname = await collageModel.findOne({ name : name })
        if (findname) {
            return res.status(400).send({ status: false, msg: "name already exsits" })
        }

        let collage = await collageModel.create(data)
        res.status(201).send({ status: true, Data: collage })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports = { createcollage }