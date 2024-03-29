const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  }],
});

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;

