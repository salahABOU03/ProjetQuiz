const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');

// Create a new attempt
router.post('/create', attemptController.createAttempt);

// Get all attempts
router.get('/', attemptController.getAllAttempts);

// Get attempts by student ID
router.get('/student/:studentId', attemptController.getAttemptsByStudent);

module.exports = router;
