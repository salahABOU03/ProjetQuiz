const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Create a new quiz
router.post('/create', quizController.createQuiz);

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get a specific quiz by ID
router.get('/:quizId', quizController.getQuizById);

// Update a quiz by ID
router.put('/:quizId', quizController.updateQuiz);

// Delete a quiz by ID
router.delete('/:quizId', quizController.deleteQuiz);

module.exports = router;
