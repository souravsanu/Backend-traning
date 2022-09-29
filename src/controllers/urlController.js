const urlModel = require("../models/urlModel");
// const validUrl = require("valid-url");
// const shortId = require("shortid");

const isValidRequest = function (object) {
    return Object.keys(object).length > 0;
  };

const createUrl = async function (req, res) {
  try {
    const data = req.body;
    let longUrl = req.body.longUrl;

    if (isValidRequest(req.query)) return res.status(400).send({ status: false, message: "Data can passes only through Body" });
    
    if (!isValidRequest(data))
      return res.status(400).send({ status: false, message: "body is empty" });

    //     if (!isValidRequestBody(data))
    //         return res.status(400).send({status: false,message: "Data required in request body it cant be empty!"});

    let checklongUrl = await urlModel
      .find({ longUrl: longUrl })
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 });

    const createData = await urlModel.create(data);

    const newData = {
      longUrl: createData.longUrl,
      urlCode: createData.urlCode,
      shortUrl: createData.shortUrl,
    };
    return res
      .status(201)
      .send({ status: true, message: "data create ", data: newData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



const getUrl = async function (req, res) {
    try {
      if (isValidRequest(req.body))
        return res
          .status(400)
          .send({
            status: false,
            message: "filters can pass only through query params",
          });
      const queryParams = req.query;
    
     
      
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  };

module.exports.createUrl = createUrl;
