const fs = require('fs').promises;
const path = require('path');

const booksFilePath = path.join(__dirname, '../books.json');

// Helper function to read books
async function readBooks() {
  const data = await fs.readFile(booksFilePath, 'utf8');
  return JSON.parse(data);
}

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await readBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// Get book by ISBN
const getBookByISBN = async (req, res) => {
  try {
    const books = await readBooks();
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

// Get books by author
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await readBooks();
    const filteredBooks = books.filter(b => b.author.toLowerCase().includes(req.params.author.toLowerCase()));
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// Get books by title
const getBooksByTitle = async (req, res) => {
  try {
    const books = await readBooks();
    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };