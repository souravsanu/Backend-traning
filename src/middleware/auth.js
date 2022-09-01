const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  try {
    console.log(req.params.userId);
    let token = req.headers["x-auth-token"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, msg: "Token must be present" });
    //validate this token
    let decodedToken = jwt.verify(
      token,
      "functionup-plutonium-very-very-secret-key"
    );
    if (!decodedToken) {
      return res
        .status(401)
        .send({ status: false, msg: "The token is invaid" });
    }
    req.loggedInUser = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const authorise = function (req, res, next) {
  try {
    // comapre the logged in user's id and the id in request
    let requestUserId = req.params.userId;
    console.log(requestUserId);
    if (requestUserId !== req.loggedInUser) {
      return res.status(403).send({ status: false, msg: "Permission denied" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
