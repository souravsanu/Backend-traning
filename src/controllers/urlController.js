const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const baseURL = "http://localhost:3000";

const isValidRequest = function (object) {
  return Object.keys(object).length > 0;
};
const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}

//=====================================CREATE URL API=============================================

const createUrl = async function (req, res) {
  try {
    const data = req.body;
    let longUrl = req.body.longUrl;

    if (isValidRequest(req.query)) return res.status(400).send({ status: false, message: "Data can passes only through Body" });


   
    if (!isValidRequest(data))
      return res.status(400).send({ status: false, message: "Data required in request body it cant be empty!" });

    if (!isValid(data)) return res.status(400).send({ status: false, message: "body is empty" });

    

    if (!validUrl.isUri(longUrl)) { return res.status(400).send({ status: false, msg: "longurl is not valid" }) };



    // shortcode is generated
    const codeUrl = shortId.generate(longUrl).toLowerCase()

    // console.log(codeUrl)

    const shortUrl = baseURL + "/" + codeUrl     // shortUrl created
    //console.log(shortUrl)

    data["urlCode"] = codeUrl
    data["shortUrl"] = shortUrl
    //console.log(data)

    const createData = await urlModel.create(data);

    //console.log(createData)
    // const newData = {
    //   longUrl: createData.longUrl,
    //   urlCode: createData.urlCode,
    //   shortUrl: createData.shortUrl,
    // };
    return res.status(201).send({ status: true, message: "data create ", data: data });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




//=====================================GET URL API=================================================
const getUrl = async function (req, res) {
  try {

    let urlCode = req.params.urlCode

    let data=req.body

    if(data)return res.status(400).send({ status: false, message: "you cant provide data in get body!" });

    if (!shortId.isValid(urlCode)) return res.status(400).send({ status: false, message: `Invalid urlCode: - ${urlCode}` })

    let url = await urlModel.findOne({ urlCode: urlCode }).select({ longUrl: 1, _id: 0 })

    if (!url) return res.status(404).send({ status: false, message: `${urlCode} urlCode not found` })

    return res.status(302).send({ status: true, message: url })


  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })

  }
}

module.exports = { createUrl, getUrl }

