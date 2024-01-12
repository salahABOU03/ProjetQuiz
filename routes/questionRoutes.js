const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/create', questionController.createQuestion);
router.get('/get', questionController.getQuestions);

module.exports = router;
