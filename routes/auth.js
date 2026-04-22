const express = require("express");
const { register, login, logout } = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/customer/login", login);

// Logout
router.post("/customer/logout", logout);

module.exports = router;
