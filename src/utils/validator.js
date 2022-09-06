const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null || value.length === 0)
    return false;
  return true;
};

const isValidTitle = function (title) {
  return ["Mr", "Mrs", "Miss", "Mast"].includes(title);
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.isValidObjectId(objectId);
};

module.exports = { isValid, isValidTitle, isValidRequestBody, isValidObjectId };
