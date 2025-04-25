const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../controllers/contactController');

// Submit contact form
router.post('/', submitMessage);

// Get all messages (protected route for admin)
router.get('/', getMessages);

module.exports = router;