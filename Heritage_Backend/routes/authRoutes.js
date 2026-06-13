// routes/authRoutes.js
// Auth endpoint routing mapping requests to authController actions

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected endpoint
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
