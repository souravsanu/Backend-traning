const express=require("express");
const mongoose=require("mongoose");
// const router=express.Router();
const bodyParser = require('body-parser');
const route=require("./route/routes")
const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://miniblogeproject:akash1234atlas@cluster0.lz7q3.mongodb.net/booksManagementGroup10",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
app.use("/",route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
