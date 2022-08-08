const express = require("express");
const abc = require("../introduction/intro");
const router = express.Router();
const welcome = require("../logger/logger.js");
const trim = require("../validator/formatter.js");
const second = require("../util/helper.js");
let lodash = require("lodash");

router.get("/test-me", function (req, res) {
  welcome;
  trim;
  second.printDate();
  second.getBatchInfo();

  console.log("My batch is", abc.name);
  abc.printName();
  res.send("My second ever api!");
  let array = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "octomber",
    "november",
    "december",
  ];
  let result1 = lodash.chunk(array, 3);
  console.log(result1);
  //next
  let arr2 = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
  let result2 = lodash.tail(arr2, 9);
  console.log(result2);
  //next
  let arr3 = [1, 1, 2, 2, 3];
  let result3 = lodash.union(arr3);
  console.log(result3);
  //next
  let arr4 = [
    ["horror", "TheShining"],
    ["drama", "Titanic"],
    ["fantasy", "PansLabyrinth"],
  ];
  let result4 = {};
  result4 = lodash.fromPairs(arr4, 1);
  console.log(result4);
});

router.get("/test-you", function (req, res) {
  res.send("This is the second routes implementation");
});

router.get("/give-me-students-data", function (req, res) {});
module.exports = router;
// adding this comment for no reason
