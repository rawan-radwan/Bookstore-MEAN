const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
});


const CartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
});
  
module.exports = mongoose.model('Cart', CartSchema);;