const express = require('express');
// const Comment = require('../models/comment.model');
const router = express.Router();

// Add a comment
router.post('/', async (req, res) => {
  const { bookId, userId, text } = req.body;

  try {
    const comment = new Comment({ bookId, userId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: 'Error adding comment', error: err });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err });
  }
});

module.exports = router;
