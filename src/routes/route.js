const express = require("express");
const router = express.Router();

const controller = require("../controllers/urlController");

router.post("/url/shorten", controller.createUrl);
router.get("/:urlCode", controller.getUrl);

router.all("/*", async function (req, res) {
  return res.status(400).send({ status: false, message: "plz check url" });
});

module.exports = router;
