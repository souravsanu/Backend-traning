const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlCode: { type: String, required: true, unique: true, trim: true},
    longUrl: { type: String, required: true,trim: true },
    shortUrl: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true },{_id:0})
module.exports = mongoose.model('urls', UrlSchema)
