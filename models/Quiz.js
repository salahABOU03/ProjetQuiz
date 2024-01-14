const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
