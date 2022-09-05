const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.get("/cowin/getdistrict", CowinController.getdistricts)//1
router.get("/cowin/getweather", CowinController.getweather)//2

                //  meme
router.get("/cowin/meme", CowinController.getmeme)
router.post("/cowin/postmeme", CowinController.postmeme)

            


module.exports = router;