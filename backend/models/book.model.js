const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
});
const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    stock: { type: Number, required: true },
    description: {type: String},
    coverImage: {type: String},      // URL to cover image
    ratings: [RatingSchema],
    comments: [CommentSchema]
});

module.exports = mongoose.model('Book', BookSchema);