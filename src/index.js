const express=require("express");
const mongoose=require("mongoose");

const bodyParser = require('body-parser');
const route=require("./route/routes")
const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://book_management:book1234@cluster0.3qd4bit.mongodb.net/booksManagementGroup10",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
app.use("/",route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
