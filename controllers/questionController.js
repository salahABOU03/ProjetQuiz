const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { text, options } = req.body;
    const question = new Question({ text, options });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
