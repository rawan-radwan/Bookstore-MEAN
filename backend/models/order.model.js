const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
});
  
const OrderSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
items: [OrderItemSchema],
totalPrice: {
    type: Number,
    required: true
},
paymentMethod: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
},
createdAt: {
    type: Date,
    default: Date.now
}
});
  
module.exports = mongoose.model('Order', OrderSchema);