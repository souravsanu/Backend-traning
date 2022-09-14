const express = require('express');
const router = express.Router();
const collagecontroller = require('../controllers/collageController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
// ===========================================================
router.post("/functionup/colleges", collagecontroller.createcollage)

module.exports = router;