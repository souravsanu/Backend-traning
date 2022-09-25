
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
router.post("/books",authentication,authorization,bookController.createBook)
router.get("/books",authentication,bookController.getBooksByQuery)
router.get("/books/:bookId",authentication,bookController.getBooksById)
router.put("/books/:bookId",authentication,authorization,bookController.updateBook);
router.delete("/books/:bookId",authentication,authorization,bookController.deleteBook)

//_______________________________REVIEWS APIs__________________________________
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews);
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

router.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "invalid http request" });
  });

module.exports=router;
