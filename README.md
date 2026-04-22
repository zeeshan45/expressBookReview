# Express Bookstore

An online bookstore application built with Express.js.

## Features

- Retrieve all books
- Search books by ISBN, author, or title
- User registration and login
- Add, update, and delete book reviews

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## API Endpoints

### Books

- GET /api/books - Get all books
- GET /api/books/isbn/:isbn - Get book by ISBN
- GET /api/books/author/:author - Get books by author
- GET /api/books/title/:title - Get books by title

### Auth

- POST /auth/register - Register user
- POST /auth/login - Login user
- POST /auth/logout - Logout user

### Reviews

- GET /api/books/:isbn/reviews - Get reviews for a book
- POST /api/books/:isbn/reviews - Add/modify review (requires login)
- DELETE /api/books/:isbn/reviews - Delete review (requires login)
