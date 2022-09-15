const express = require('express');
const router = express.Router();
const collagecontroller = require('../controllers/collageController')
const interncontroller = require('../controllers/InternController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
// ===========================================================
router.post("/functionup/colleges", collagecontroller.createcollege)

router.post("/functionup/interns", interncontroller.createintern)

router.get("/functionup/collegeDetails" , collagecontroller.Getcollegedetail)

module.exports = router;