const authorModel = require("../models/authorModel");

const CreateAuthor = async function (req, res) {
  try {
    let authorDetails = req.body;
    let authorCreated = await authorModel.create(authorDetails);
    res.status(201).send({ msg: authorCreated, status: true });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
module.exports.CreateAuthor = CreateAuthor;
