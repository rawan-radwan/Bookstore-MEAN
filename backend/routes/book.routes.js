const express  = require('express');
const Book = require('../models/book.model');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware'); // New middleware
const router = express.Router();

// Get all books
router.get('/', async (req, res, next) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    } catch(err){
        // res.status(500).json({ message: 'Error fetching books', error: err });
        next(err);
    }
});

// Get book by id
router.get('/:id', async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
          }
        res.status(200).json(book);
    } catch(err){
        // res.status(500).json({ message: 'Error fetching book', error: err });
        next(err);
    }
});

// Rate a Book
router.post('/:bookId/rate', [authMiddleware], async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  try {
      const book = await Book.findById(bookId);
      if (!book) {
          return res.status(404).json({ error: 'Book not found' });
      }

      // Check if the user has already rated this book
      const existingRating = book.ratings.find(r => r.user.toString() === req.user.id);
      if (existingRating) {
          existingRating.rating = rating; // Update rating
      } else {
          book.ratings.push({ user: req.user.id, rating }); // Add new rating
      }

      await book.save();
      return res.json(book);
  } catch (error) {
      return res.status(500).json({ error: 'Error rating the book' });
  }
});

// Comment on a book
router.post('/:bookId/comment', [authMiddleware], async (req, res) => {
  const { bookId } = req.params;
  const { comment } = req.body;

  try {
      const book = await Book.findById(bookId);
      if (!book) {
          return res.status(404).json({ error: 'Book not found' });
      }

      book.comments.push({ user: req.user.id, comment });
      await book.save();
      return res.json(book);
  } catch (error) {
      return res.status(500).json({ error: 'Error adding comment' });
  }
});
  
module.exports = router;
  