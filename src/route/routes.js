const express=require("express");
const userController=require("../controllers/userController");
const bookController=require("../controllers/booksController");
const reviewController=require("../controllers/reviewController")
const {authentication,authorization}=require("../middleware/auth")


const router=express.Router();

router.post("/register",userController.createUser);
router.post("/login",userController.userLogin)
router.post("/books",authentication,authorization,bookController.createBook)
router.get("/books",bookController.getBooksByQuery)
router.post("/books/:bookId/review",authentication,authorization,reviewController.createReview)
module.exports=router;
