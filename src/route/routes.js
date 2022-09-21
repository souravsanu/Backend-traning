const express=require("express");
const userController=require("../controllers/userController");
const bookController=require("../controllers/booksController");
const m=require("../middleware/auth")


const router=express.Router();

router.post("/register",userController.createUser);
router.post("/login",userController.userLogin)
router.post("/books",m.authentication,m.authoization,bookController.createBook)
router.get("/books",bookController.getBooksByQuery)
module.exports=router;
