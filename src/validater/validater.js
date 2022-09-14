const mongoose = require("mongoose");

const data = function (requestBody) {
  return Object.keys(data).length > 0;
};
//clg Name Validation
const isValidClgName = function (name) {
  const nameRegex = /^[a-zA-Z]{2,30}$/;
  return nameregex.test(name);
};

//Name Validation
const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  return nameregex.test(name);
};

//College Full Name Validation
const isValidCollegeName = function (name) {
  const nameregex = /\w+([, ]+\w+){1,2}/;
  return nameRegex.test(name);
};

//Email Validation
const isValidEmail = function (email) {
  const emailregex =
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
  return emailRegex.test(email);
};


//ObjectId Validation
const isValidObjectId = function (id) {
  var ObjectId = mongoose.Types.ObjectId;
  return ObjectId.isValid(id);
};

//Mobile Validation
const isValidMobile = function (mobile) {
  var re = /^((\+91)?|91)?[6789][0-9]{9}$/;
  return re.test(mobile);
};

//Value Validation
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value !== "string" || value.trim().length === 0) return false;
  return true;
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidObjectId,
  isValidMobile,
  isValid,
  isValidCollegeName,
  isValidClgName,
  isValidRequestBody
};