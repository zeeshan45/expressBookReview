const express = require("express");
const {
  getReviews,
  addOrModifyReview,
  deleteReview,
} = require("../controllers/reviewController");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

// Get reviews for a book
router.get("/review/:isbn", getReviews);

// Add or modify review
router.put("/customer/auth/review/:isbn", requireAuth, addOrModifyReview);

// Delete review
router.delete("/customer/auth/review/:isbn", requireAuth, deleteReview);

module.exports = router;
