const express = require("express");
const router = express.Router();
const BookModel = require("../models/bookModel.js");
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
const BookController = require("../controllers/bookController");

router.post("/createBook", BookController.createBook);

router.get("/bookList", BookController.bookList);

router.post("/getBooksInYear", BookController.getBooksInYear);

router.post("/getParticularBooks", BookController.getParticularBooks);

router.get("/getXINRBooks", BookController.getXINRBooks);

router.get("/getRandomBooks", BookController.getRandomBooks);

// router.get("/getBooksData", BookController.getBooksData)

module.exports = router;
