const authorModel = require("../models/authorModel");

const CreateAuthor = async function (req, res) {
  let authorDetails = req.body;
  let autorId = authorDetails.authorId;
};
module.exports.CreateAuthor = CreateAuthor;
