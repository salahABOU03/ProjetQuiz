const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
