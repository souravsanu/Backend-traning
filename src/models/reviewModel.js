{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
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
        required: 'This field is Required'
    },
    rating: {
        type: Number,
        minlength: 1,
        maxlength: 5,
        required: 'Rating is Required'
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