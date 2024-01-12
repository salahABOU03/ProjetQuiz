const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [{
    text: String,
    isCorrect: Boolean,
  }],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
