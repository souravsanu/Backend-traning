const express=require('express')
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose')
const route=require("./routes/route")
const app= express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Raunak22012001:8329059512%40Ujwal@cluster0.tagnbhk.mongodb.net/group39-db", {useNewUrlParser:true})
.then(()=> console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});