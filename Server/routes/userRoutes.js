// routes/userRoutes.js
const express = require('express');
const {generateToken,validateJwtToken} = require('../middleware/jwtmiddlewaare'); // Assuming this is your JWT middleware
const { registerUser, loginUser } = require('../controllers/userController'); // Assuming controllers for user actions

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login",loginUser);

module.exports = router;