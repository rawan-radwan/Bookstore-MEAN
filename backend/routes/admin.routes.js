// routes/admin.routes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Book = require('../models/book.model');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware'); 

const upload = require('../config/multerConfig');

// Add a new book
router.post('/books', [authMiddleware, adminMiddleware, upload.single('coverImage')], async (req, res, next) => {
  const { title, author, price, stock, description } = req.body;
  const coverImage = req.file ? req.file.filename : null;

  try {
    const book = new Book({ title, author, price, stock, description, coverImage });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// Edit a book
router.put('/books/:id', [authMiddleware, adminMiddleware, upload.single('coverImage')], async (req, res) => {
    const { title, author, price, stock, description } = req.body;
    const coverImage = req.file ? req.file.filename : null;
  
    try {
      let book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ msg: 'Book not found' });

      book = await Book.findByIdAndUpdate(req.params.id, { title, author, price, stock, description, coverImage }, { new: true });
      res.json(book);
    } catch (err) {
      res.status(400).json({ message: 'Error updating book', error: err });
    }
});

// Delete a book
router.delete('/books/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ msg: 'Book not found' });

      await Book.findByIdAndDelete(req.params.id);
      res.status(204).json({ book: book, msg: 'Book removed' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting book', error: err });
    }
});

// Edit Offensive Comments
router.put('/comments/:commentId', [authMiddleware, adminMiddleware], async (req, res) => {
    const { comment } = req.body;
    try {
      const book = await Book.findOne({ 'comments._id': req.params.commentId });
      if (!book) return res.status(404).json({ msg: 'Comment not found' });
  
      const targetComment = book.comments.id(req.params.commentId);
      if (comment) {
        targetComment.comment = comment;
      }
      await book.save();
  
      res.json(book.comments);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

// Delete Offensive Comments
router.delete('/comments/:commentId', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
      const book = await Book.findOne({ 'comments._id': req.params.commentId });
      if (!book) return res.status(404).json({ msg: 'Comment not found' });
  
      book.comments.pull({ _id: req.params.commentId });
      await book.save();
  
      res.status(204).json(book.comments);
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
});

// Block/Unblock User from Commenting
router.put('/users/block/:userId', [authMiddleware, adminMiddleware], async (req, res) => {
    const { blocked } = req.body;
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      user.isBlocked = blocked;
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

// Change Inappropriate User Avatar
router.put('/users/avatar/:userId', [authMiddleware, adminMiddleware, upload.single('avatar')], async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      user.avatar = req.file.filename;
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


module.exports = router;
