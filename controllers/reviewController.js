const fs = require("fs").promises;
const path = require("path");

const booksFilePath = path.join(__dirname, "../books.json");

// Helper to read books
async function readBooks() {
  const data = await fs.readFile(booksFilePath, "utf8");
  return JSON.parse(data);
}

// Helper to write books
async function writeBooks(books) {
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
}

// Get reviews for a book
const getReviews = async (req, res) => {
  try {
    const books = await readBooks();
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (book) {
      if (!book.reviews || book.reviews.length === 0) {
        res.json({ message: "No reviews found for this book." });
      } else {
        res.json(book.reviews);
      }
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve reviews" });
  }
};

// Add or modify review
const addOrModifyReview = async (req, res) => {
  try {
    const { review } = req.body;
    if (!review) {
      return res.status(400).json({ error: "Review required" });
    }
    const books = await readBooks();
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    // For simplicity, add new review, or update if exists for user
    const existingReviewIndex = book.reviews.findIndex(
      (r) => r.userId === req.session.userId,
    );
    if (existingReviewIndex !== -1) {
      book.reviews[existingReviewIndex].review = review;
    } else {
      book.reviews.push({ userId: req.session.userId, review });
    }
    await writeBooks(books);
    res.json({
      message: `The review for the book with ISBN ${req.params.isbn} has been added/updated successfully.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const books = await readBooks();
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    const reviewIndex = book.reviews.findIndex(
      (r) => r.userId === req.session.userId,
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }
    book.reviews.splice(reviewIndex, 1);
    await writeBooks(books);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = { getReviews, addOrModifyReview, deleteReview };
