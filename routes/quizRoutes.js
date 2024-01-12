const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/create', quizController.createQuiz);
router.get('/get/:id', quizController.getQuiz);

module.exports = router;
