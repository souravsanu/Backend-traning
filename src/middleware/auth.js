const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  console.log(req.params.userId);
  let token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "Token must be present" });
  if (!token)
    return res.send({ status: false, msg: "The token it is mandatory" });
  console.log(token);
  //validate this token
  let decodedToken = jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  if (!decodedToken) {
    return res.send({ status: false, msg: "The token is invaid" });
  }
  req.loggedInUser = decodedToken.userId;
  next();
};

const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  let requestUserId = req.params.userId;
  console.log(requestUserId);
  if (requestUserId !== req.loggedInUser) {
    return res.send({ status: false, msg: "Permission denied" });
  }
  next();
};
module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
