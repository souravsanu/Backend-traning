const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const route = require("./route/routes");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://ManjushaRaut:D1NNvookajCHUeKG@cluster0.3qd4bit.mongodb.net/booksManagementGroup10?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
