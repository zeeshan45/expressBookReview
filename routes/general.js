const express = require("express");
const {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
} = require("../controllers/bookController");
const axios = require("axios");

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Get book by ISBN
router.get("/isbn/:isbn", getBookByISBN);

// Get books by author
router.get("/author/:author", getBooksByAuthor);

// Get books by title
router.get("/title/:title", getBooksByTitle);

// =======================================================
// Task 11: Async/Await functionality using Axios
// =======================================================

router.get("/server/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/");
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

router.get("/server/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`http://localhost:3000/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book details" });
  }
});

router.get("/server/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const response = await axios.get(`http://localhost:3000/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching book details by author" });
  }
});

router.get("/server/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get(`http://localhost:3000/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching book details by title" });
  }
});

module.exports = router;
