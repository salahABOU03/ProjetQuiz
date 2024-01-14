const mongoose = require('mongoose');
const Option = require('./Option');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [Option.schema],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
