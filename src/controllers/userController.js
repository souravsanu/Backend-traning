const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
//_________________________________ CREATE USER ___________________________________________________

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
//_____________________________________LOGIN USER ________________________________________________

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not corerct",
      });

    //________________________________ CREATE TOKEN _______________________________________________

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "plutonium",
        organisation: "FUnctionUp",
      },
      "functionup-plutonium-very-very-secret-key"
    );
    res.status(201).send({ status: true, data: token });
  } catch {
    res.status(500).send({ error: err.message });
  }
};
//__________________ COLLECTING USER DATA _______________________________________________

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res
        .status(404)
        .send({ status: false, msg: "No such user exists" });
    res.status(201).send({ status: true, data: userDetails });
  } catch {
    res.status(500).send({ error: err.message });
  }
};
//_______________ ONLY SAME USER CAN UPDATE __________________________________________________

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(404).send("No such user exists");
    }
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(201).send({ status: updatedUser, data: updatedUser });
  } catch {
    res.status(500).send({ error: err.message });
  }
};
//__________________ USER DELETED ______________________________________________________________
const DeleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //return the error if user not given id exists in the db
    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "no such user exists" });
    }
    let updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true }
    );
    res.status(201).send({ status: true, data: updatedUser });
  } catch {
    res.status(500).send({ error: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.DeleteUser = DeleteUser;
