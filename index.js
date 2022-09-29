const express=require('express')
const { default: mongoose } = require('mongoose')
const route=require('./routes/route.js')
const app= express()

app.use(express.json())

mongoose.connect("mongodb+srv://anubhav0347:anubhav0347@cluster0.ndyglrb.mongodb.net/group39Database", {useNewUrlParser:true})
.then(()=> console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.listen(3000, function(){
    console.log('Express is running on port 3000')
})