const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
     bookId: {
        type: ObjectId,
        required: true,
        ref: 'Book',
        trim:true
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest',
        trim:true
    },
    reviewedAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        minlength: 1,
        maxlength: 5,
        required: true
    },
    review: {
        type: String,
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('review', reviewSchema)