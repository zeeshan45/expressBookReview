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

if (!response.data) {

  return res.status(404).json({ message: "Book not found" });

}

return res.status(200).json(response.data);

} catch (error) {

return res.status(404).json({ message: "Book not found" });

}

});

router.get("/server/author/:author", async (req, res) => {

try {

const author = req.params.author;

const response = await axios.get(`http://localhost:3000/author/${author}`);

if (!response.data || response.data.length === 0) {

  return res

    .status(404)

    .json({ message: "No books found for this author" });

}

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

if (!response.data || response.data.length === 0) {

  return res

    .status(404)

    .json({ message: "No books found with this title" });

}

return res.status(200).json(response.data);

} catch (error) {

return res

  .status(500)

  .json({ message: "Error fetching book details by title" });

}

});

// Task 10: Get all books – Using async/await and Axios

router.get('/async-get-books', async function (req, res) {

try {

const response = await axios.get('http://localhost:3000/');

return res.status(200).json(response.data);

} catch (error) {

return res.status(500).json({message: "Error fetching books"});

}

});

// Task 11: Get book details by ISBN – Using Promises

router.get('/async-get-books/isbn/:isbn', function (req, res) {

const isbn = req.params.isbn;

axios.get(http://localhost:3000/isbn/${isbn})

.then(response => {

  return res.status(200).json(response.data);

})

.catch(error => {

  return res.status(404).json({message: "ISBN not found"});

});

});

// Task 12: Get book details by Author – Using async/await

router.get('/async-get-books/author/:author', async function (req, res) {

try {

const author = req.params.author;

const response = await axios.get(`http://localhost:3000/author/${author}`);

return res.status(200).json(response.data);

} catch (error) {

return res.status(500).json({message: "Error fetching by author"});

}

});

// Task 13: Get book details by Title – Using async/await

router.get('/async-get-books/title/:title', async function (req, res) {

try {

const title = req.params.title;

const response = await axios.get(`http://localhost:3000/title/${title}`);

return res.status(200).json(response.data);

} catch (error) {

return res.status(500).json({message: "Error fetching by title"});

}

});

module.exports = router;
