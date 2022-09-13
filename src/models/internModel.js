const mongoose = require('mongoose');
Const ObjectId=mongoose.Schema.Types.ObjectId

const internSchema=new mongoose.Schema({

name: {
        type:String,
        required:true,
},
email: {
    type:String,
    required:true,
     unique:true
},
mobile: {
    type:String,
    required:true,
    unique:true
},
collegeId: {
    type:ObjectId,
    ref:"college"
},
isDeleted: {
    type:boolean,
    default: false
}
},{timestand:true});

module.exports = mongoose.model('intern',internSchema)


