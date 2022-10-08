const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const baseURL = "http://localhost:3000";
const redis = require("redis");
const { promisify } = require("util");
const { json } = require("body-parser");

//________________validation function_________________________________//

const isValidRequest = function (object) {
  return Object.keys(object).length > 0;
};
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//______________________connecting to redis_________________________

const redisClient = redis.createClient(
  14556,
  "redis-14556.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("vLNXTDSdL1dHlSQSscsDwvf1WKKPgvxF", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

//=====================================CREATE URL API=============================================

const createUrl = async function (req, res) {
  try {
    const data = req.body;
    let longUrl = req.body.longUrl;

    if (isValidRequest(req.query))
      return res
        .status(400)
        .send({ status: false, message: "Data can passes only through Body" });

    //___________________________if body is empty___________________________

    if (!isValidRequest(data))
      return res
        .status(400)
        .send({
          status: false,
          message: "Data required in request body it cant be empty!",
        });

    if (!isValid(data))
      return res.status(400).send({ status: false, message: "body is empty" });

    //_______________check long url________________________________//

    if (!isValid(longUrl)) {
      return res
        .status(400)
        .send({ status: false, msg: "longurl is not valid " });
    }

    let reg =
      /^(https:\/\/www\.|http:\/\/www\.|www\.|https:\/\/|http:\/\/)[^www.,-_][a-zA-Z0-9\-_.$]+\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)$/gm;
    let regex = reg.test(longUrl);

    if (regex === false) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter a valid URL." });
    }

    let getcache = await GET_ASYNC(`${longUrl}`);

    if (getcache) {
      getcache = JSON.parse(getcache);
      return res
        .status(201)
        .send({ status: true, message: "URL is fron cache ", data: getcache });
    }
    //________________________D.B call_______________________________//
    const checklongUrl = await urlModel
      .findOne({ longUrl: longUrl })
      .select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 });

    if (checklongUrl) {
      //return res.status(400).send({ status: false, message: "URL is not present" })
      await SET_ASYNC(`${longUrl}`, JSON.stringify(checklongUrl), "EX", 60 * 2);
      return res
        .status(201)
        .send({
          status: true,
          message: "URL is already present ",
          data: checklongUrl,
        });
    }

    // _________it is used to create unique id___________//

    const codeUrl = shortId.generate(longUrl).toLowerCase();

    // console.log(codeUrl)

    const shortUrl = baseURL + "/" + codeUrl; // shortUrl created
    //console.log(shortUrl)

    data["urlCode"] = codeUrl;
    data["shortUrl"] = shortUrl;
    //console.log(data)

    const createData = await urlModel.create(data);

    //console.log(createData)
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

//=====================================GET URL API=================================================
//

//____________________REGEX for Url code_____________
const isValidUrl = function (str) {
  var pattern = new RegExp(/^[a-z0-9_-]*$/);
  if (pattern.test(str)) return true;
};

//_______________________________________________________________
const getUrl = async function (req, res) {
  try {
    let urlCode = req.params.urlCode;

    //_________it will check short url __//

    if (!shortId.isValid(urlCode) && !isValidUrl(urlCode)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Sorry! Wrong urlCode. Provide valid UrlCode",
        });
    }

    let getUrlCachedData = await GET_ASYNC(`${urlCode}`);

    //console.log(longUrl)
    if (getUrlCachedData) {
      const longUrl = JSON.parse(getUrlCachedData);
      console.log("Data from Redis");

      res.status(302).redirect(longUrl);
    } else {
      let url = await urlModel
        .findOne({ urlCode: urlCode })
        .select({ _id: 0, longUrl: 1 });
      if (!url) {
        return res
          .status(404)
          .send({ status: false, message: "No data found with this url" });
      }

      await SET_ASYNC(`${urlCode}`, JSON.stringify(url.longUrl), "EX", 60 * 2);
      console.log("Fetching Data from DB");

      res.status(302).redirect(url.longUrl);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createUrl, getUrl };
