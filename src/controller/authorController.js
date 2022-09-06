const authorModel = require("../models/authorModel");
const validator = require("../utils/validator");
//Creating Author documents by validating the details.
const createAuthor = async function (req, res) {
  try {
<<<<<<< HEAD
    let authorDetails = req.body;
    let authorCreated = await authorModel.create(authorDetails);
    res.status(201).send({ msg: authorCreated, status: true });
  } catch (err) {
    res.status(500).send({ msg: err.message });
=======
    // Request body verifying
    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide author Detaills",
      });
    }

    //Extract body params
    const { fname, lname, title, email, password } = requestBody;

    // Validation started & detecting here the falsy values .
    if (!validator.isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    }
    if (!validator.isValid(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Last name is required" });
    }
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }
    if (!validator.isValidTitle(title)) {
      return res.status(400).send({
        status: false,
        message: `Title should be among Mr, Mrs, Miss and Mast`,
      });
    }
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }

    //Email validation whether it is entered perfectly or not.
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
      return;
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Password is required` });
    }
    const isEmailAlredyUsed = await authorModel.findOne({ email });
    if (isEmailAlredyUsed) {
      return res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
    }
    //validation Ends

    const newAuthor = await authorModel.create(requestBody);
    res.status(201).send({
      status: true,
      message: `Author created successfully`,
      data: newAuthor,
    });
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
>>>>>>> b4cd64a0223c6d39a6c07e8878eba67a720aaa1e
  }
};

module.exports = { createAuthor };
