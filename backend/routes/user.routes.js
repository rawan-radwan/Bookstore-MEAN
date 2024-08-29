const express = require('express');
const User = require('../models/user.model');
const Book = require('../models/book.model')
const Order = require('../models/order.model')
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Purchase a Book
router.post('/purchase', authMiddleware, async (req, res, next) => {
  const { bookId, quantity } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.stock < quantity) return res.status(400).json({ msg: 'Insufficient stock' });

    book.stock -= quantity;
    await book.save();

    const user = await User.findById(req.user.id);
    const purchaseIndex = user.purchaseHistory.findIndex(purchase => purchase.book.toString() === bookId);

    if (purchaseIndex !== -1) {
      // Book already in purchase history, update quantity
      user.purchaseHistory[purchaseIndex].quantity += quantity;
    } else {
      // Book not in purchase history, add new entry
      user.purchaseHistory.push({ book: bookId, quantity });
    }

    await user.save();
    res.json(user.purchaseHistory);
  } catch (err) {
    next(err);
  }
});

// Get Purchase History
router.get('/purchase-history', authMiddleware, async (req, res) => {
  try {
      const orders = await Order.find({ user: req.user.id }).populate('items.book').sort({ createdAt: -1 });
      res.json(orders);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


// Add to Favorite Books
router.post('/favorites', authMiddleware, async (req, res) => {
  const { bookId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get Favourites
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites.book');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// to post images in the request
const multerConfig = require("../config/multerConfig");
// Change Avatar
router.put('/avatar', [authMiddleware, multerConfig.single('avatar')], async (req, res) => {
  console.log('File:', req.file);
  console.log('Body:', req.body);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set the user's avatar to the uploaded file's filename
    user.avatar = req.file.filename;

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile', error: err });
  }
});

module.exports = router;
