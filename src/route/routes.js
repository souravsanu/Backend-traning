
//================================= Imported all the modules here ======================================
const express=require("express");
const userController=require("../controllers/userController");
const bookController=require("../controllers/booksController");
const reviewController=require("../controllers/reviewController")
const {authentication,authorization}=require("../middleware/auth")
const router=express.Router();

//_______________________________ USER APIs _________________________________
router.post("/register",userController.createUser);
router.post("/login",userController.userLogin)

//_______________________________BOOKS APIs__________________________________
router.post("/books",bookController.createBook)
router.get("/books",bookController.getBooksByQuery)
router.get("/books/:bookId",bookController.getBooksById)

//_______________________________REVIEWS APIs__________________________________
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews);


module.exports=router;
