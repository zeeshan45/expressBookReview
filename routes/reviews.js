const express = require('express');
const { getReviews, addOrModifyReview, deleteReview } = require('../controllers/reviewController');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// Get reviews for a book
router.get('/books/:isbn/reviews', getReviews);

// Add or modify review
router.post('/books/:isbn/reviews', requireAuth, addOrModifyReview);

// Delete review
router.delete('/books/:isbn/reviews', requireAuth, deleteReview);

module.exports = router;
