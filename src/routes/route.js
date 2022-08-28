const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthController = require("../middleware/authore");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createusers", userController.createUser);

router.post(
  "/loginUser",
  userController.loginUser,
  AuthController.creatingToken
);

//The userId is sent by front end
router.get(
  "/getUserData/:userId",
  AuthController.tokenverifyed,
  userController.getUserData
);

router.put("/updateusers/:userId", userController.updateUser);

router.delete("/deleteUser/:userId", userController.deleteUser);

module.exports = router;
