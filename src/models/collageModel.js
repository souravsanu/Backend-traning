const mongoose = require('mongoose')
const collageSchema = new mongoose.Schema({

    name: { type:String,
    required:true,
     unique:true,
 },
 
 fullName: {
    type:String,
    required:true,
    },
     
logoLink: {
    type:String,
    requie:true
   },

isDeleted: {type:boolean,default: false}

},{ timestamps:true});

module.exports = mongoose.model('collage',collageSchema)
