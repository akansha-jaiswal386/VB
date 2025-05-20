const express = require('express');
const router = express.Router();
const Rating = require('../Models/rating.js');
const authenticate = require('../Middleware/verifyToken.js');
// POST /rating - Save rating
router.post('/', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const newRating = new Rating({
      user: req.user._id,
      rating,
      comment
    });

    await newRating.save();

    res.status(201).json({
      success: true,
      message: 'Rating saved successfully',
      data: newRating
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to save rating',
      error: err.message
    });
  }
});
module.exports = router;
