const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const baseURL = "http://localhost:3000";
const redis = require("redis")
const { promisify } = require("util")

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



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

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

    const checklongUrl = await urlModel.findOne({ longUrl: longUrl }).select({ createdAt: 0, updatedAt: 0, _v: 0, _id: 0 })

    if (checklongUrl) {
      return res.status(200).send({ status: false, message: "URL is already present ", data: checklongUrl })
    }

    else {



      // shortcode is generated
      const codeUrl = shortId.generate(longUrl).toLowerCase()

      // console.log(codeUrl)

      const shortUrl = baseURL + "/" + codeUrl     // shortUrl created
      //console.log(shortUrl)

      data["urlCode"] = codeUrl
      data["shortUrl"] = shortUrl
      //console.log(data)

      const createData = await urlModel.create(data);
      await SET_ASYNC(`${longUrl}`, JSON.stringify(createData))


      //console.log(createData)
      const newData = {
        longUrl: createData.longUrl,
        urlCode: createData.urlCode,
        shortUrl: createData.shortUrl,
      };
      return res.status(201).send({ status: true, message: "data create ", data: newData });
    }

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




//=====================================GET URL API=================================================
// 
const getUrl = async function (req, res) {
  try {

    const urlcode =  await GET_ASYNC(`${req.params.urlCode}`)

    if (urlcode) {
      return res.status(200).send(urlcode)
     } 
     else {


       const getUrlList = await urlModel.findOne({ urlCode: urlcode }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
       if (getUrlList) {
        await SET_ASYNC(`${req.params.urlCode}`, getUrlList.longUrl)
        return res.status(302).redirect(getUrlList.longUrl)
      }
      else{
        return res.status(404).send({status:false,msg:"No Url Found"})
      }
       
   }
  } catch (err) {
     res.status(500).send({ status: false, message: "Server Error", error: err.message })
   }
}; 
  

//

// const getUrl = async function (req, res) {
//   let cachedUrlData = await GET_ASYNC(`${req.params.urlCode}`)
//   if(cachedUrlData) {
//     res.status(200).send(cachedUrlData)
//   } else {
//     let urlData = await urlModel.findOne({urlCode:req.params.urlCode});
//     if(urlData) {await SET_ASYNC(`${req.params.urlCode}`,urlData.longUrl)
//     return res.redirect( urlData.longUrl );
  
//   }
//   else{
//     return res.status(404).send({status:false,msg:"No Url Found"})
//   }
// }
// }
module.exports = { createUrl, getUrl }

