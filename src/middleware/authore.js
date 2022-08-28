const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
let creatingToken = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  //   let userIdd = user._id.toString();
  //   let token = jwt.sign(
  //     {
  //       userId: userIdd,
  //       batch: "PLUTONIUM",
  //       organisation: "FunctionUp",
  //     },
  //     "functionip-plutonium-very-very-secret-key"
  //   );
  // };
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Plutinum",
      organisation: "FunctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};
//tokenverifyed..........................................
let tokenverifyed = async function (req, res, next) {
  let token = req.headers["x-Auth-Token"];
  if (!token) token = req.headers["x-auth-token"];
  //if no token is present in the request header reyturn error
  console.log(token);
  if (!token) return res.send({ status: false, msg: "token must be present" });

  let decodeToken = jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  if (!decodeToken) {
    return res.send({ status: false, msg: "token is valid" });
  } else {
    next();
  }
};
module.exports.creatingToken = creatingToken;
module.exports.tokenverifyed = tokenverifyed;
