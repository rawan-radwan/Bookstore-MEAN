const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Cart = require('../models/cart.model');
const Book = require('../models/book.model');
const Order = require('../models/order.model');

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
    const { bookId, quantity } = req.body;
  
    try {
      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ msg: 'Book not found' });
  
      let cart = await Cart.findOne({ user: req.user.id });
      if (!cart) {
        cart = new Cart({ user: req.user.id, items: [], totalPrice: 0 });
      }
  
      const cartItem = cart.items.find(item => item.book.toString() === bookId);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }
  
      cart.totalPrice += book.price * quantity;
      await cart.save();
  
      res.json(cart);
    } catch (err) {
      res.status(500).send('Server error');
    }
});
  
// View cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.book');
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
  
// Update item quantity
router.put('/:itemId', authMiddleware, async (req, res) => {
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const cartItem = cart.items.id(req.params.itemId);
        if (!cartItem) return res.status(404).json({ msg: 'Item not found in cart' });

        const book = await Book.findById(cartItem.book);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        cart.totalPrice -= cartItem.quantity * book.price;
        cartItem.quantity = quantity;
        cart.totalPrice += quantity * book.price;

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
  
// Remove item from cart
router.delete('/:itemId', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const cartItem = cart.items.id(req.params.itemId);
        if (!cartItem) return res.status(404).json({ msg: 'Item not found in cart' });

        const book = await Book.findById(cartItem.book);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        cart.totalPrice -= cartItem.quantity * book.price;
        cart.items.pull({_id: req.params.itemId});

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
  
// Checkout
router.post('/checkout', authMiddleware, async (req, res) => {
    const { paymentMethod, address } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.book');
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const order = new Order({
            user: req.user.id,
            items: cart.items.map(item => ({
                book: item.book._id,
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice,
            paymentMethod,
            address
        });

        await order.save();

        // Clear the cart after checkout
        await Cart.findByIdAndDelete(cart._id);

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

  
module.exports = router;