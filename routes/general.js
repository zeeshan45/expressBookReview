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
router.get("/books", getAllBooks);

// Get book by ISBN
router.get("/books/isbn/:isbn", getBookByISBN);

// Get books by author
router.get("/books/author/:author", getBooksByAuthor);

// Get books by title
router.get("/books/title/:title", getBooksByTitle);

// =======================================================
// Task 11: Async/Await functionality using Axios
// =======================================================

const getBooksAsync = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/books");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getBookByIsbnAsync = async (isbn) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/books/isbn/${isbn}`,
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getBookByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/books/author/${author}`,
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getBookByTitleAsync = async (title) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/books/title/${title}`,
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = router;
